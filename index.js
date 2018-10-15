
// require assert for testing
const assert = require('assert');

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//create a function called `map`, it should take 2 parameters `array` and `iteratee`
//`array` must be an array
//`iteratee` must be a function that takes one parameter and returns a bool
//The point of the javascript map function is to take an array and return different array with the exact same number of items in it
//The items will be whatever the function `iteratee` creates
//in the map function create a new empty array and store in a variable named whatever you want (myNewArray)
//loop array and extract the single item from the array per loop and store it in a variable
//on each loop call iteratee() passing in the item from the current loop into the call to iteratee()
//iteratee is a function that must return something, capture whatever it returns in a variable
//add the returned value from iteratee tp myNewArray
//after looping, return  myNewArray
function map(array, iteratee){
  // new array to be returned
  const returnArr = [];
  // loop over every item in array
  for (let i=0; i<array.length; i++) {
    // if callback parameter is provided
    if (iteratee) {
      // push the new mutated value to the return array
      returnArr.push(iteratee(array[i]));
    }
  }
  // return new array
  return returnArr;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//create a function called `filter`, it should take 2 parameters `array` and `iteratee`
//`array` must be an array
//`iteratee` must be a function that takes one parameter and returns a bool
//in the map function create a new empty array and store in a variable named whatever you want (myNewArray)
//loop `array` and call iteratee for each thing in the array, 
//     passing in the item from the current loop
//iteratee will return true or false, if true add the item to myNewArray else do not
//after looping, return myNewArray
function filter(array, iteratee){
  // new array to be returned
  const returnArr = [];
  // loop over every item in array
  for (let i=0; i<array.length; i++) {
    // if callback parameter is provided
    if (iteratee) {
      // check to see if the current array item returned from callback fn is the same as current array item
      const callbackReturn = iteratee(array[i]);
      // if callbackReturn is true, then push current item to returnArr
      if ( callbackReturn ) {
        returnArr.push(array[i]);
      }
    }
  }
  // return new array
  return returnArr;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
//create a function called `find`, it should take 2 parameters `theArray` and `fnc`
//loop theArray and call the fnc for each thing in the array, 
//     passing in the item from the current loop
//fnc will return true or false, if true return the item 
//after looping, return null
function find(theArray, fnc){
  // loop over every item in array
  for (let i=0; i<theArray.length; i++) {
    // if callback parameter is provided
    if (fnc) {
      // call the callback and store the result
      const didFind = fnc(theArray[i]);
      // if didFind = true, return theArray[i]
      if (didFind) {
        return theArray[i];
      }
    }
  }
  // if did not find item in array, return null
  return null;
}

//return the last item in theArray
function findLast(theArray){
  return theArray[theArray.length-1];
}

//return the first element of the array
function head(theArray){
  return theArray[0];
}

//create a new array
//loop theArray in reverse order
//add the item from each loop to the new array
//return the new array
function reverse(theArray){
  // array to be returned
  const returnArr = [];
  // loop over theArray in reverse order, and push items into returnArr
  for (let i=theArray.length-1; i>=0; i--) {
    returnArr.push(theArray[i]);
  }
  return returnArr;
}

//create a new array
//loop theArray
//add the item from each loop to the new array except the first item
//return the new array
function tail(theArray){
  // return array
  const returnArr = [];
  // loop over theArray starting at index 1, and push values to returnArr
  for (let i=1; i<theArray.length; i++) {
    returnArr.push(theArray[i]);
  }
  return returnArr;
}

// BUBBLE SORT

//implement the most basic sorting algorithm there is
//assume the array will always have numbers
//use a while loop to constantly loop theArray until it is sorted
//use a for loop to loop theArray
//look at the current item and the next item, compare them
//if the items are out of order, swap them
//initialize a variable that indicates if a swap had to be done, set it to false
//if a swap is done set it to true
//after each for loop check the variable, if true, continue the while loop
//if false return theArray
function sort(theArray){
  let isSorted; // set this to true when array is sorted
  do {
    isSorted = false;
    // loop over theArray
    for (let i=0; i<theArray.length; i++) {
      // this is for readability
      const leftSide = theArray[i];
      const rightSide = theArray[i+1];
      // check to see if left and right side need to be swapped
      if (rightSide < leftSide) {
        const temp = leftSide;  // temp var to facilitate swap
        theArray[i] = theArray[i+1]; // assign leftside value = rightside
        theArray[i+1] = temp; // assign rightside value = leftside (stored in temp value)

        isSorted = true; // set isSorted = true because a swap occurred
      }
    }
    // check isSorted == true, if true, continue while loop
    // if isSorted == false, return  theArray
    if (!isSorted) return theArray;

  } while(isSorted);
}

exports.map = map;
exports.filter = filter;
exports.find = find;
exports.head = head;
exports.reverse = reverse;
exports.tail = tail;
exports.sort = sort;
exports.findLast = findLast;


// unit tests
if (typeof describe === 'function') {

  describe('#map()', () => {
    const arr = [1, 2, 3];
    const mapped = map(arr, (num) => {
      return num * num;
    });
    it('should return new array with mapped items', () => {
      assert.deepEqual(mapped, [1, 4, 9]);
    });
    it('should not affect the original array', () => {
      assert.deepEqual(arr, [1, 2, 3]);
    })
  });

  describe('#filter()', () => {
    it('should return an array of items that pass the predicate test', () => {
      const filtered = filter([1, 2, 3], (num) => {
        return num % 2 === 0;
      });
      assert.deepEqual(filtered, [2]);
    });
  });

  describe('#findLast()', () => {
    it('should return the last item of an array', () => {
      const last = findLast([1, 9, 3]);
      assert.equal(last, 3);
    });
    it('should return the last item of an array, even if theres only 1 element', () => {
      const last = findLast([7]);
      assert.equal(last, 7);
    });
  });

  describe('#head()', () => {
    it('should return the first item of an array', () => {
      const first = head([2, 1, 7]);
      assert.equal(first, 2);
    });
    it('should return the first item of an array, even if theres only 1 element', () => {
      const first = head([9]);
      assert.equal(first, 9);
    });
  });

  describe('#reverse()', () => {
    it('should return the input array in reverse', () => {
      const reverseArr = reverse([1, 2, 3, 4, 5, 6]);
      assert.deepEqual(reverseArr, [6, 5, 4, 3, 2, 1]);
    });
  });

  describe('#tail()', () => {
    it('should return all values of the original array except for the first index', () => {
      const tailArr = tail([1, 2, 3, 4, 5, 6]);
      assert.deepEqual(tailArr, [2, 3, 4, 5, 6]);
    });
  });

  describe('#sort()', () => {
    it('should return an array numerically sorted using bubble sort technique', () => {
      const sortArr = sort([2, 1, 8, 3, 0, -1]);
      assert.deepEqual(sortArr, [-1, 0, 1, 2, 3, 8]);
    });
  });

  describe('#find()', () => {
    it('should find and return the first element in an array if value is in array', () => {
      const array1 = [5, 12, 8, 130, 44];

      const found = array1.find((element) => {
        return element > 10;
      });

      assert.equal(found, 12);
    });
    it('should return null if value is in not array', () => {
      const array1 = [5, 12, 8, 130, 44];

      const found = array1.find((element) => {
        return element === 10;
      });

      assert.equal(found, null);
    });
  });

}