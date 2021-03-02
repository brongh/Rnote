const crypto = require("crypto");

module.exports = {
  encrypt: function (text, masterkey) {
    const iv = crypto.randomBytes(12);
    // const salt = crypto.randomBytes(16);

    // const key = crypto.pbkdf2Sync(masterkey, salt, 100000, 32, "sha256");
    // console.log("key:", key);
    const key = Buffer.from(masterkey.key.data);
    const salt = Buffer.from(masterkey.salt.data);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    const tag = cipher.getAuthTag();

    return Buffer.concat([salt, iv, tag, encrypted]).toString("base64");
  },

  decrypt: function (encdata, masterkey) {
    const mk = Buffer.from(masterkey.key.data);
    if (encdata === undefined) {
      return;
    }
    const bData = Buffer.from(encdata, "base64");

    // const salt = bData.slice(0, 16);
    const iv = bData.slice(16, 28);
    const tag = bData.slice(28, 44);
    const text = bData.slice(44);

    // const key = crypto.pbkdf2Sync(mk, salt, 100000, 32, "sha256");

    const decipher = crypto.createDecipheriv("aes-256-gcm", mk, iv);
    decipher.setAuthTag(tag);

    const decrypted =
      decipher.update(text, "binary", "utf8") + decipher.final("utf8");

    return decrypted;
  },
};
