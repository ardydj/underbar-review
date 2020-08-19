
(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // if n is undefined return the last element
    // create an alias variable to store index of last element
    var lastElement = array[array.length - 1];
    if (n === undefined) {
      return lastElement;
    }
    // create alias variable for last index of arr
    var lastIndex = array.length;
    // create variable for start point (last index - n);
    var startPoint = lastIndex - n;
    // return a slice of the array from the start point (alias variable) to the length of arr
    return n > array.length ? array.slice(-n) : array.slice(startPoint);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // if collection is array
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // create accumulator array
    var accumulator = [];
    // iterate over collection
    // create iterator function
    var testingFunction = function (element) {
      if (test(element)) {
        accumulator.push(element);
      }
    };
    _.each(collection, testingFunction);

    return accumulator;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    var accumulator = [];
    // create call back function test to take in the collection
    // if !test(element)
    // push element into accumulator array
    var testFunc = (function(collection) {
      _.each(collection, function(element) {
        if (!test(element)) {
          accumulator.push(element);
        }
      });
    })(collection);
    return accumulator;

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // create a uniq array variable
    // create a other array with return  value of iterator
    var otherArray = [];
    var uniqArray = [];

    // keep track of elements in input array that have a uniq return value from iterator func
    // if sorted && itertor

    if (isSorted && iterator) {
      // if index of iterator iterator(element) === -1
      // push it into other array
      // push element into uniq array
      _.each(array, function(element) {
        if (_.indexOf(otherArray, iterator(element)) === -1 ) {
          uniqArray.push(element);
          otherArray.push(iterator(element));
        }
      });
    } else {
      // iterate over array
      _.each(array, function(element) {
        // if indexOf the current element -1
        // push the element to uniq array
        if (_.indexOf(uniqArray, element) === -1) {
          uniqArray.push(element);
        }
      });
    }


    // return uniq array
    return uniqArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var mappedArray = [];

    // var mappedFunc = function(element) {
    //   mappedArray.push(iterator(element));
    // };
    _.each(collection, function(element) {
      mappedArray.push(iterator(element));
    });
    // run iterator on each eleemnt and keep results

    return mappedArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    // if there is no accumulator
    // assign accumulator to the  starting value
    // iteratge over the collection  at the second element
    // reassign accumulator to the result of each invocation
    if (accumulator === undefined) {
      accumulator = collection[0];
      var copyArray = collection.slice(1);
      _.each(copyArray, function(element) {
        accumulator = iterator(accumulator, element);
      });
    } else {
      _.each(collection, function(element) {
        accumulator = iterator(accumulator, element);
      });
    }

    return accumulator;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // iterate over collection

    // return true or false weather every element passes a test
    return _.reduce(collection, function(acc, element) {
      // if  the accumulatore is  ever false  return  false
      if (acc === false) {
        return false;
      }

      //  if no  iterator is passed
      // assign accumulator to the truthyness of the element
      if (iterator === undefined) {
        return acc = !!element;
      }

      // return the  truthyness of the result of  invoking the iterator test on the element
      return acc = !!iterator(element);
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    // if no iterator is passed
    if (iterator === undefined) {
      //create an iterator function
      //  if the result of iterator invoked on the elements of the  collection is ever true
      return _.reduce(collection, function(acc, element) {
        if (acc) {
          return true;
        }
        return acc = !!element;
      }, false);
    }
    return _.reduce(collection, function(acc, element) {
      if (acc) {
        return true;
      }
      return acc = !!iterator(element);
    }, false);

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // create an array that stores all the args passed first arg
    var argumentArray = Array.prototype.slice.call(arguments);
    // iterate over the arguments arr
    _.each(argumentArray, function(element) {
      // iterate over each obj element
      _.each(element, function(value, key) {
        // create new prop in obj using key/value pair
        obj[key] = value;
      });
    });

    // return obj;
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var argumentArray = Array.prototype.slice.call(arguments);
    // iterate over the arguments arr
    _.each(argumentArray, function(element) {
      // iterate over each obj element
      _.each(element, function(value, key) {
        // create new prop in obj using key/value pair
        if (obj[key] === undefined) {
          obj[key] = value;
        }
      });
    });

    // return obj;
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // create a cache
    var cache = {};
    // return function

    return function () {
      // if result of func(arguments) is in cache
      if (cache[func.toString()] !== undefined) {
        return cache[func.toString()];
      } else {
        //   create a value assigned to result of function call on arguments list
        var value = func.apply(this, arguments);
        cache[func.toString()] = value;
        return value;
      }
    };
    //   return value

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
