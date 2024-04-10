import { KeyValue } from "constants/GlobalConstant";

export const toString = (data: any) => {
  return `${data}`;
};

export const storageAction = (
  action: "get" | "set" | "clear",
  key: string,
  value?: any
) => {
  const storage = localStorage;

  switch (action) {
    case "get":
      return storage.getItem(key);
    case "set":
      storage.setItem(key, value);
      break;
    case "clear":
      storage.removeItem(key);
      break;
    default:
      throw new Error("Invalid action provided");
  }
};

export function latinToRoman(num: number) {
  if (typeof num !== "number" || num < 1 || num > 3999) {
    return "Số không hợp lệ";
  }

  var romanNumeral: string = "";
  var romanNumerals: any = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  for (var key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      romanNumeral += key;
      num -= romanNumerals[key];
    }
  }

  return romanNumeral;
}
