/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left,
 * right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
  const puzzleArr = puzzle.map(el => el.split(''));

  for (let i = 0; i < puzzleArr.length; i++) {
    for (let j = 0; j < puzzleArr[0].length; j++) {
      const arr = Array.from(puzzleArr),
        columns = arr[0].length - 1,
        rows = arr.length - 1;

      let m = 0,
        row = i,
        col = j;

      if (arr[i][j] !== searchStr[m])  continue;
      arr[row][col] = null;
      m++;

      while (m !== searchStr.length) {

        if (row - 1 >= 0) {
          if (arr[row - 1][col] === searchStr[m]) {
            row--;
            arr[row][col] = null;
            m++;
            continue;
          }
        }

        if (col - 1 >= 0) {
          if (arr[row][col - 1] === searchStr[m]) {
            col--;
            arr[row][col] = null;
            m++;
            continue;
          }
        }

        if (col + 1 <= columns) {
          if (arr[row][col + 1] === searchStr[m]) {
            col++;
            arr[row][col] = null;
            m++;
            continue;
          }
        }

        if (row + 1 <= rows) {
          if (arr[row + 1][col] === searchStr[m]) {
            row++;
            arr[row][col] = null;
            m++;
            continue;
          }
        }
        break;
      }

      if (m === searchStr.length) return true;

    }
  }

  return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from
 *    the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
  if (chars.length < 2) {
    return yield chars;
  }
  const combinations = [];

  for (let i = 0; i < chars.length; i++) {
    const remainStr = [...chars.slice(0, i), ...chars.slice(i + 1)];

    for (const subPermutation of getPermutations(remainStr)) {
      combinations.push(`${chars[i]}${subPermutation}`);
    }
  }

  for (const combination of combinations) {
    yield combination;
  }   
}



/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units
 * you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence
 * of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
  return quotes.reduce((acc, quote, i, arr) => {
    return acc + (Math.max(...arr.slice(i)) - quote);
  }, 0);
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *   var urlShortener = new UrlShortener();
 *   var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *   var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
function UrlShortener() {
  this.urlAllowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    "0123456789-_.~!*'();:@&=+$,/?#[]";
}

function segment() {
  this.left = 0;
  this.right = 0;
}

UrlShortener.prototype = {
  encode(url) {
    throw new Error('Not implemented');
  },

  decode(code) {
    throw new Error('Not implemented');
  },

  defineSegment() {

  }
};

module.exports = {
  findStringInSnakingPuzzle: findStringInSnakingPuzzle,
  getPermutations: getPermutations,
  getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
  UrlShortener: UrlShortener
};
