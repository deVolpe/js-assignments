/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
function distinctLettersString(value1, value2) {
  return Object.values(Array.from(new Set(`${value1}${value2}`
    .split('')))).sort().join('');
}


/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

function lowerLetters(value) {
  const letters = value.split(/[A-Z0-9,\s\W]/).join('');
  const obj = {};

  const matches = letter => {
    let counter = 1;
    for (const i of letters) {
      if (i === letter) counter++;
    }
    return counter - 1;
  };

  for (const i of Array.from(new Set(letters))) {
    Object.defineProperty(obj, i, {
      configurable: true,
      enumerable: true,
      value: matches(i)
    });
  }
  return obj;
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash of KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

function titleCaseConvert(title, minorWords) {
  // eslint-disable-next-line max-len
  const toTitleCase = str => (`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`);

  const str = title.toLowerCase().split(' '),
    minors = minorWords ? minorWords.toLowerCase().split(' ') : '';
  for (let i = 0; i < str.length; i++) {
    if (i === 0 || !minors.includes(str[i].toLowerCase())) {
      str[i] = toTitleCase(str[i]);
    } else {
      str[i] = str[i].toLowerCase();
    }
  }
  return str.join(' ');
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

function calcRPN(expr) {

  if (!expr) return 0;

  const numbers = expr.split(' '),
    stack = [];

  for (const number of numbers) {
    if (/[+\-/*]/.test(number)) {
      const operand1 = stack.pop();
      const operand2 = stack.pop();
      stack.push(eval(`${operand2}${number}${operand1}`));
    } else {
      stack.push(number);
    }
  }
  return stack[stack.length - 1];
}

module.exports = {
  distinctLettersString,
  lowerLetters,
  titleCaseConvert,
  calcRPN
};
