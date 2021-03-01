const crypto = require("crypto");

module.exports = {
  encrypt: function (text, masterkey) {
    const iv = crypto.randomBytes(12);
    // const salt = crypto.randomBytes(16);

    // const key = crypto.pbkdf2Sync(masterkey, salt, 100000, 32, "sha256");
    // console.log("key:", key);

    const cipher = crypto.createCipheriv("aes-256-gcm", masterkey.key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([masterkey.salt, iv, tag, encrypted]).toString(
      "base64"
    );
  },

  decrypt: function (encdata, masterkey) {
    if (encdata === undefined) {
      return;
    }
    console.log(encdata);
    const bData = Buffer.from(encdata, "base64");

    const salt = bData.slice(0, 16);
    const iv = bData.slice(16, 28);
    const tag = bData.slice(28, 44);
    const text = bData.slice(44);

    const key = crypto.pbkdf2Sync(masterkey.key, salt, 100000, 32, "sha256");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);

    const decrypted =
      decipher.update(text, "binary", "hex") + decipher.final("hex");

    return decrypted;
  },
};
