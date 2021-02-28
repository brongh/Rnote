// const { useAuthState } = require("../context/context");
const { encrypt, decrypt } = require("./crypt");

export const encryptData = (data, password) => {
  const title = encrypt(data.title, password);
  const content = encrypt(data.content, password);

  return { title, content };
};

export const decryptData = (data, password) => {
  const title = decrypt(data.title, password);
  const content = decrypt(data.content, password);

  return { title, content };
};
