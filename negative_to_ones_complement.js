// evaluates whether the input is negative or positive
const isNegative = input => {
  return input[0] == '-'
}

// For values greater than one this will convert from decimal to binary
const convertToBinary = input => {
  // convert input to an int
  let int = parseInt(input, 10)
  // create an array to hold the binary values of our division
  const binaryValues = []
  while (int != 0) {
    binaryValues.unshift(int % 2)
    int = Math.floor(int / 2)
  }
  return binaryValues.join('')
}

// appends the amount of 0's necessary to reach 8 bits
const appendZeroes = (str, num) => {
  while (num != 0) {
    str = '0' + str
    num--
  }
  return str
}

// removes the negative sign
const removeNegativeSign = input => {
  return input.slice(1, input.length)
}

// Swaps the 1's and 0's
const swapOnesAndZeros = binaryString => {
  const convertedValues = []
  for (let i = 0; i < binaryString.length; i++) {
    // simple enough wherever we see a 1 replace it with a 0 and vice versa
    if (binaryString[i] == '1') {
      convertedValues.push('0')
    } else {
      convertedValues.push('1')
    }
  }
  return convertedValues
}

const onesComplementConversion = input => {
  // We'll store the our converted values here
  let convertedValues = []
  // Check that the input is negative
  if (isNegative(input)) {
    // We know we have a negative number so let's remove that negative sign
    input = removeNegativeSign(input)
    // convert the input to normal binary
    let binaryString = convertToBinary(input)
    // if the length of this value is less than our allotted 8 bits we will have to append 0's until it is
    if (binaryString.length < 8) {
      // We determine the number of values we must append by subtracting the length of the string form 8
      let numValuesToAppend = 8 - binaryString.length
      binaryString = appendZeroes(binaryString, numValuesToAppend)
    }
    // For the one's onesComplementConversion perform the swap of 1's and swapOnesAndZeros
    convertedValues = swapOnesAndZeros(binaryString)
    // return converted array values as a string
    return convertedValues.join('')
  } else {
    return (
      'The value you entered was not negative so it was just converted to normal binary ' +
      convertToBinary(input)
    )
  }
}
