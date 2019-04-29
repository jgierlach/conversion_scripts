const convertValsGreaterThanOneToBinary = input => {
  // Convert input to an int
  let int = parseInt(input, 10)
  // Create an array to hold all the binary values
  const binaryValues = []
  while (int != 0) {
    // We know the modulus of int will either be 1 or 0
    // We will take that value and unshift it to binaryValues
    binaryValues.unshift(int % 2)
    // Lets divide int by 2 to get the next value we will perform modulus 2 on
    // in case the result of int / 2 is not even we will need to perform math.floor so we get a whole number
    int = Math.floor(int / 2)
  }
  // lastly return our array and join it to a string
  return binaryValues.join('')
}
