function hexToRGB(hexString) {
  const regHex = /((#?)[0-9a-fA-F]{2})/gm;
  let convertHexValues = hexString.match(regHex);
  convertHexValues[0] = convertHexValues[0].replace("#", "");
  let result = {
    red: parseInt(convertHexValues[0], 16),
    green: parseInt(convertHexValues[1], 16),
    blue: parseInt(convertHexValues[2], 16),
  };
  result.css = `rgb(${result.red}, ${result.green}, ${result.blue})`;
  return result;
}
console.log(hexToRGB("#1a3a9d"));
