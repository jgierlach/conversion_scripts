// evaluates whether the input is negative or positive
const isNegative = (input) => {
  return input[0] == '-'
}

// For values greater than one this will convert from decimal to binary
const convertToBinary = (input) => {
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
  while(num != 0) { 
    str = '0' + str
    num--
  }
  return str
}

// removes the negative sign
const removeNegativeSign = (input) => {
  return input.slice(1, input.length)
}

// Swaps the 1's and 0's
const swapOnesAndZeros = (binaryString) => {
  const convertedValues = []
  for(let i = 0; i < binaryString.length; i++) {
      // simple enough wherever we see a 1 replace it with a 0 and vice versa
      if(binaryString[i] == '1') {
        convertedValues.push('0')
      } else {
        convertedValues.push('1')
      }
    }
 return convertedValues
}


// return true if the input lengths are equal false if they're not
const isEqualLength = (input1, input2) => {
  return input1.length == input2.length
}

// finds the longer input value
const theLongerValue = (input1, input2) => {
  if(input1.length > input2.length) {
    return input1 
  }
  return input2
}

// finds the shorter input value
const theShorterValue = (input1, input2) => {
  if(input1.length < input2.length) {
    return input1
  }
  return input2
}

// finds the difference in length between two input values
const differenceInLength = (input1, input2) => {
  const longest = theLongerValue(input1, input2)
  const shortest = theShorterValue(input1, input2)
  return longest.length - shortest.length
}

// appends zeroes accordingly to the input value that is shorter
const appendZeros = (input1, input2) => {
  let lengthDifference = differenceInLength(input1, input2)
  let shortest = theShorterValue(input1, input2)
  for(let i = 0; i < lengthDifference; i++) {
    shortest = '0' + shortest
  }
  return shortest
}

const addInputs = (num1, num2) => {
  // counts the amount of 0s
    let zeroCount = 0
    // counts the amount of 1s
    let oneCount = 0
    // keeps track of operations as they happen
    let cue = []
    // holds result of operations
    let result = []

    // addition happens from right to left silly goose
    num1 = [...num1].reverse()
    num2 = [...num2].reverse()

    for (let i = 0; i <= num1.length; i++) {
      // push num1s value to the cue
      cue.push(num1[i])
      // push num2s value to the cue
      cue.push(num2[i])
      // the amount of 1s and 0's in the cue are counted
      cue.forEach(i => {
        i == '1' ? oneCount++ : zeroCount++
      })
     // the conditionals for the cue length being 2  
      if(cue.length == 2) {
        if(oneCount == 2) {
          result.push('0')
          // reset the cue
          cue = []
          cue.push('1')
        } else if(oneCount == 1) {
          result.push('1')
          cue = []
        } else if(zeroCount == 2) {
          result.push('0')
          cue = []
        }
        // reset one and zero counts
        oneCount = 0
        zeroCount = 0

        // the conditonals for the cue having 3 items in it  
      } else if(cue.length == 3) {
        if(zeroCount == 2) {
          result.push('1')
          // reset the cue
          cue = []
        } else if(oneCount == 2) {
          result.push('0')
          // reset the cue
          cue = []
          // in this instance we will carry a 1
          cue.push('1')
        } else if(oneCount == 3) {
          result.push('1')
          // reset the cue
          cue = []
          // in this case we will carry a 1
          cue.push('1')
        }
        // reset one and zero counts
        oneCount = 0
        zeroCount = 0
      }
    }
    return result.reverse().join('')
}

// This is where the magic happens and we add that shit
const binaryAddition = (input1, input2) => {
   // We need to check if the lengths of the strings we are adding are equal or not
  // if they're unequal we will have to apply some additional logic to make them equal
  if(isEqualLength(input1, input2)) {

    return addInputs(input1, input2)

  } else {
    // This takes the shorter value and append 0's until it's length is equal to the bigger strings
    let num1 = appendZeros(input1, input2)
    // This just assigns the value that is longer to a variable
    let num2 = theLongerValue(input1, input2)

    return addInputs(num1, num2)
  }
}

const onesComplementConversion = (input) => {
  // We'll store the our converted values here
  let convertedValues = []
  // Check that the input is negative
  if(isNegative(input)) {
    // We know we have a negative number so let's remove that negative sign
    input = removeNegativeSign(input)
    let binaryString = convertToBinary(input)
    // if the length of this value is less than our allotted 8 bits we will have to append 0's until it is
    if(binaryString.length < 8) {
      // We determine the number of values we must append by subtracting the length of the string form 8
      let numValuesToAppend = 8 - binaryString.length
      binaryString = appendZeroes(binaryString, numValuesToAppend)
    }
    // For the one's onesComplementConversion perform the swap of 1's and swapOnesAndZeros
    convertedValues = swapOnesAndZeros(binaryString)
    // return converted array values as a string
    return convertedValues.join('')
  } else {
    return 'The value you entered was not negative so it was just converted to normal binary ' + convertToBinary(input)
  }
}

const twosComplementConversion = (input) => {
  let onesComplement = onesComplementConversion(input)
  return binaryAddition(onesComplement, '1')
}


twosComplementConversion('-45') // should be 11010011




