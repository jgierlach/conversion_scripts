// object to store the different parts of our floating point values
const floatingPointValue = {
  signBit: '',
  exponent: '',
  mantissa: ''
}

// looks at the first character of user input to see if it is negative
const isNegative = input => {
  return input[0] == '-'
}

// check user input to see if decimal point exists
const hasDecimal = input => {
  return input.includes('.')
}

// assuming a decimal point exists split at the decimal point
const splitAtDecimalPoint = input => {
  return input.split('.')
}

// For values greater than one this will convert from decimal to binary
const convertValsGreaterThanOneToBinary = input => {
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

// Get the values after the decimal point
const getValsAfterDecimal = int => {
  return parseFloat(int - Math.floor(int)).toFixed(2)
}

// Get the values before a decimal point
const getValsBeforeDecimal = int => {
  return Math.floor(int)
}

// depending on how big the first part of our mantissa is that dictates how many of the 23 spaces alotted for our mantissa we can solve for
let numberOfPlacesWeNeedToSolveFor = 0

// converts all values less than one to binary up to 23 spaces
const convertValsLessThanOneToBinary = input => {
  //  let int = parseInt(input, 10)
  let int = input * 2
  let valsOfDecimal = []
  let i = 0
  // this is the place where we have to dynamically figure out how many places we have to go
  while (i < numberOfPlacesWeNeedToSolveFor) {
    console.log(int)
    if (int < 1) {
      valsOfDecimal.push(0)
    } else {
      valsOfDecimal.push(1)
    }
    int = getValsAfterDecimal(int) * 2
    // console.log(int)
    i++
  }
  return valsOfDecimal.join('')
}

// will return the value of the decimal point
const findExponent = input => {
  return input.length - 1
}

const floatingPoint = input => {
  // based on whether input is negative or positive make the sign bit 1 or 0
  if (isNegative(input)) {
    floatingPointValue.signBit = '1'
    input = input.slice(1, input.length)
  } else {
    floatingPointValue.signBit = '0'
  }

  // split our input at the decimal point into two inputs
  const inputs = splitAtDecimalPoint(input)
  // assign 0th index to the value of greater than one
  const greaterThanOne = inputs[0]
  // assign 1st index to the value of less than one
  const lessThanOne = '.' + inputs[1]

  // convert vals greater than 1 to binary (ie before decimal point)
  const binaryValsGreaterThanOne = convertValsGreaterThanOneToBinary(
    greaterThanOne
  )

  // from here let figure out our exponent
  const exponent = findExponent(binaryValsGreaterThanOne)

  // we caluclate our normalized exponent that will take up 8 bits
  const normalizedExponent = convertValsGreaterThanOneToBinary(exponent + 127)

  // lets caluclate the first part of our mantissa
  const firstPartOfMantissa = binaryValsGreaterThanOne.slice(
    1,
    binaryValsGreaterThanOne.length
  )

  // we need to subtract this value from 23 to calculate how many times the convertValsLessThanOneToBinary function should run so we have 32 bits total
  numberOfPlacesWeNeedToSolveFor = 23 - exponent

  // lets convertValsLessThanOneToBinary
  const binaryValsLessThanOne = convertValsLessThanOneToBinary(lessThanOne)

  // let's show the conversion so far
  const conversionSoFar = binaryValsGreaterThanOne + '.' + binaryValsLessThanOne
  console.log('conversion so far', conversionSoFar)

  // This is the final mantissa
  const mantissa = firstPartOfMantissa + binaryValsLessThanOne

  // lets update our floatingPoint object with the values we've calculated
  floatingPointValue.exponent = normalizedExponent
  floatingPointValue.mantissa = mantissa

  return (
    floatingPointValue.signBit +
    floatingPointValue.exponent +
    floatingPointValue.mantissa
  )
}
