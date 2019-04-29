const letterNumberMapping = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15
}

const hexToDecimalConversion = input => {
  let finalValue = 0
  // Will hold all the binary values in an array so we can iterate over it
  let hexInArray = [...input].reverse()
  // iterate over the array and if the index == 1 then do the power of 2 to i
  for (let i = 0; i < hexInArray.length; i++) {
    if (
      Object.keys(letterNumberMapping).includes(hexInArray[i].toUpperCase())
    ) {
      finalValue +=
        letterNumberMapping[hexInArray[i].toUpperCase()] * Math.pow(16, i)
    } else {
      finalValue += parseInt(hexInArray[i], 10) * Math.pow(16, i)
    }
  }
  return finalValue
}
