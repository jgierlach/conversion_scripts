// return true if the input lengths are equal false if they're not
const isEqualLength = (input1, input2) => {
  return input1.length == input2.length
}

// finds the longer input value
const theLongerValue = (input1, input2) => {
  if (input1.length > input2.length) {
    return input1
  }
  return input2
}

// finds the shorter input value
const theShorterValue = (input1, input2) => {
  if (input1.length < input2.length) {
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
  for (let i = 0; i < lengthDifference; i++) {
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

  // addition happens from right to left
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
    if (cue.length == 2) {
      if (oneCount == 2) {
        result.unshift('0')
        cue = []
        cue.push('1')
      } else if (oneCount == 1) {
        result.unshift('1')
        cue = []
      } else if (zeroCount == 2 && i != num1.length) {
        result.unshift('0')
        cue = []
      }
      // reset one and zero counts
      oneCount = 0
      zeroCount = 0

      // the conditonals for the cue having 3 items in it
    } else if (cue.length == 3) {
      if (zeroCount == 2) {
        result.unshift('1')
        cue = []
      } else if (oneCount == 2) {
        result.unshift('0')
        cue = []
        // in this instance we will carry a 1
        cue.push('1')
      } else if (oneCount == 3) {
        result.unshift('1')
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
  return result.join('')
}

// This is where the magic happens and we do our adding
const binaryAddition = (input1, input2) => {
  // We need to check if the lengths of the strings we are adding are equal or not
  // if they're unequal we will have to apply some additional logic to make them equal
  if (isEqualLength(input1, input2)) {
    // the inputs are equal in length so we can just add them as is
    return addInputs(input1, input2)
  } else {
    // This just assigns the value that is longer to a variable
    let num1 = theLongerValue(input1, input2)
    // This takes the shorter value and append 0's until it's length is equal to the bigger input
    let num2 = appendZeros(input1, input2)
    // return the results of the addition as the final answser
    return addInputs(num1, num2)
  }
}
