import { allCities } from "./all-cities";

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isValidCity(city: string) {
  return Boolean(
    allCities.find((cityName) => cityName.toLowerCase() === city.toLowerCase())
  );
}

export function checkOnlyLettersOrSpacesMinLengthTwo(str: string) {
  return /^[\p{Letter}\s]{2,}$/u.test(str);
}

export function validatePhone(phoneNumberStrArr: string[]) {
  return /^\d{7}$/.test(phoneNumberStrArr.join(""));
}

export const filterCharacters = (str: string, regEx: RegExp) => {
  return str
    .split("")
    .filter((c) => regEx.test(c))
    .join("");
};
