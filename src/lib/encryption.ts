import CryptoJS from 'crypto-js';

export const encryptData = (data: string, masterKey: string): string => {
  return CryptoJS.AES.encrypt(data, masterKey).toString();
};

export const decryptData = (encryptedData: string, masterKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, masterKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};