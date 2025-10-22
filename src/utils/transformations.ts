export const capitalize = (str: string): string => {
  return str
    .split("")
    .map((letter, index) =>
      index === 0 ? letter.toUpperCase() : letter.toLowerCase()
    )
    .join("");
};

export const formatPhoneNumber = (str: string): string => {
  return str
    .split("")
    .map((num, index) => (index > 0 && index % 2 == 0 ? "-" + num : num))
    .join("");
};
