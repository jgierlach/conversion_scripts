const binaryToDecimal = input => {
  // We will add values to this number
  let finalValue = 0
  // Will hold all the binary values in an array so we can iterate over it
  let binaryInArray = [...input].reverse()
  // iterate over the array and if the index == 1 then do the power of 2 to i
  for (let i = 0; i < binaryInArray.length; i++) {
    if (binaryInArray[i] == '1') {
      finalValue += Math.pow(2, i)
    }
  }
  return finalValue
}
