const crypto = require("crypto");

export const masterKey = (masterkey) => {
  const salt = crypto.randomBytes(16);
  const key = crypto.pbkdf2Sync(masterkey, salt, 100000, 32, "sha256");
  console.log('key', key)
  return {key, salt};
};
