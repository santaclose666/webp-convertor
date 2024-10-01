export const handleImageName = (name: string) => {
  let fileName = "";
  const nameStr = name.split(`.`);

  nameStr.forEach((char, idx) => {
    if (idx !== nameStr.length - 1) {
      fileName += char;
    }
  });

  return fileName;
};
