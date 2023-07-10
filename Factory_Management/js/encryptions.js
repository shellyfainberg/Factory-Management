const { AES, enc } = window.CryptoJS;

//encrypting and decrypting objects
window.encryptObject = (obj, key) => {
  const jsonString = JSON.stringify(obj);
  const encryptedValue = AES.encrypt(jsonString, key).toString();
  return encryptedValue;
};

window.decryptObject = (encryptedValue, key) => {
  const decryptedBytes = AES.decrypt(encryptedValue, key);
  const decryptedString = decryptedBytes.toString(enc.Utf8);
  const decryptedObject = JSON.parse(decryptedString);
  return decryptedObject;
};
