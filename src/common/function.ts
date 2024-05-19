const SHA256 = require("crypto-js/sha256");

/**
 * Mã hóa dữ liệu
 * @param value Giá trị cần mã hóa
 * @param pass Mật khẩu mã hóa
 * @returns
 */
function encrypt(value: string, pass: string): string {
  const CryptoJS = require("crypto-js");
  let salt = CryptoJS.lib.WordArray.random(128 / 8);

  let key = CryptoJS.PBKDF2(pass, salt, {
    keySize: 256 / 32,
    iterations: 100,
  });

  let iv = CryptoJS.lib.WordArray.random(128 / 8);

  let encrypted = CryptoJS.AES.encrypt(value, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  let transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return transitmessage;
}

/**
 * Giải mã dữ liệu
 * @param value Giá trị mã hóa
 * @param pass Mật khẩu giải ma
 * @returns
 */
function decrypt(value: string, pass: string): string {
  const CryptoJS = require("crypto-js");
  let salt = CryptoJS.enc.Hex.parse(value.substr(0, 32));
  let iv = CryptoJS.enc.Hex.parse(value.substr(32, 32));
  let encrypted = value.substring(64);

  let key = CryptoJS.PBKDF2(pass, salt, {
    keySize: 256 / 32,
    iterations: 100,
  });

  let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 * Lưu trữ localStorage đã được mã hóa.
 */
const HRMStorage = {
  get: (key: string): string => {
    try {
      //const Util = require("../utils/util");
      //const SHA256 = require("crypto-js/sha256");
      const keySave = SHA256(key).toString();
      const value = localStorage.getItem(keySave);
      if (value !== "" && value !== null) {
        let data = decrypt(value, keySave);
        return data;
      }
      return "";
    } catch (error) {
      console.log("ERROR:", error);
      return "";
    }
  },
  set: (key: string, value?: string): boolean => {
    try {
      // const Util = require("../utils/util");
      //const SHA256 = require("crypto-js/sha256");
      const keySave = SHA256(key).toString();
      let saveData = "";
      if (value !== undefined && value !== "") {
        saveData = encrypt(value, keySave);
      }
      localStorage.setItem(keySave, saveData);
      return true;
    } catch (error) {
      console.log("ERROR:", error);
      return false;
    }
  },
  remove: (key: string): boolean => {
    try {
      //const SHA256 = require("crypto-js/sha256");
      const keySave = SHA256(key).toString();
      localStorage.removeItem(keySave);
      return true;
    } catch (error) {
      console.log("ERROR:", error);
      return false;
    }
  },
  clear: () => {
    localStorage.clear();
  },
};

export default HRMStorage;
export { HRMStorage, decrypt, encrypt };

interface Group {
  id: number;
  name: string;
  type: string | null;
  code: string;
  parentDeptId: number | null;
  createdDate: string;
  modifiedDate: string;
  createdBy: string | null;
  modifiedBy: string | null;
  groups: Group[] | null;
}

export interface FlatGroup {
  id: number;
  name: string;
  type: string | null;
  code: string;
  parentDeptId: number | null;
  createdDate: string;
  modifiedDate: string;
  createdBy: string | null;
  modifiedBy: string | null;
  groups: any[]; // Empty array as per requirement
}

export function flattenGroups(data: Group[]): FlatGroup[] {
  const result: FlatGroup[] = [];

  function flatten(group: Group): void {
    const { groups, ...rest } = group;
    result.push({ ...rest, groups: [] });

    if (groups) {
      groups.forEach(flatten);
    }
  }

  data.forEach(flatten);

  return result;
}
