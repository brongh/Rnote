// const { useAuthState } = require("../context/context");
const { encrypt, decrypt } = require("./crypt");

export const encryptData = (data, password) => {
  const title = encrypt(data.title, password);
  const content = encrypt(data.content, password);

  return { title, content };
};

export const decryptData = async (data, password) => {
  const title = await decrypt(data.title, password);
  const content = await decrypt(data.content, password);

  return { title, content };
};
