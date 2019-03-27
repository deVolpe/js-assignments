/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist
 * in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account
 * that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it
 * into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */

const digits = {
  '   \n  |\n  |': 1,
  ' _ \n _|\n|_ ': 2,
  ' _ \n _|\n _|': 3,
  '   \n|_|\n  |': 4,
  ' _ \n|_ \n _|': 5,
  ' _ \n|_ \n|_|': 6,
  ' _ \n  |\n  |': 7,
  ' _ \n|_|\n|_|': 8,
  ' _ \n|_|\n _|': 9,
  ' _ \n| |\n|_|': 0
};

function parseBankAccount(bankAccount) {
  const strings = bankAccount.split('\n').slice(0, -1);
  const accountNumber = [];
  for (let i = 0; i < strings[0].length / 3; i++) {
    const str = `${strings[0].slice(i * 3, i * 3 + 3)}\n` +
      `${strings[1].slice(i * 3, i * 3 + 3)}\n` +
      `${strings[2].slice(i * 3, i * 3 + 3)}`;

    accountNumber.push(digits[str]);

    while (accountNumber[0] === 0) {
      accountNumber.shift();
    }
  }
  return +accountNumber.join('');
}

/**
 * Returns the string, but with line breaks inserted at just the right places to make
 * sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>
 *      'The String global object',
 *      'is a constructor for',
 *      'strings, or a sequence of',
 *      'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>
 *      'The String',
 *      'global',
 *      'object is a',
 *      'constructor',
 *      'for strings,',
 *      'or a',
 *      'sequence of',
 *      'characters.'
 */
function* wrapText(text, columns) {
  let start = 0,
    end;

  while (start <= text.length) {
    let current = start;

    while (true) {
      current = text.indexOf(' ', current + 1);

      if (current === -1) {
        current = text.length;

        if (current - start < columns) {
          end = text.length;
          break;
        }
      }

      if (current - start - 1 >= columns) break;

      end = current;
    }

    yield text.substring(start, end);
    start = ++end;
  }
}

/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0
};

function getPokerHandRank(hand) {
  const transformHand = hand.map(card => {
    const rank = +card[0],
      suit = card[1];

    if (rank) {
      return {
        rank,
        suit
      };
    } else {
      switch (card[0]) {
      case 'J':
        return {
          rank: 11,
          suit
        };
      case 'Q':
        return {
          rank: 12,
          suit
        };
      case 'K':
        return {
          rank: 13,
          suit
        };
      }
    }
  });

  const isEqualSuit = hand => {
    return hand.every((card, i, arr) => card.suit === arr[0].suit);
  };

  const isSequenceRight = hand => {
    return hand.every((card, i, arr) => {
    });
  };
  
  
}

/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +,
 * vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+        '+------------+\n'+
 *    '|            |\n'+        '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+   =>   '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+        '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'         '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
  const rect = (b, h) => {
    let result = '';
    const m = b - 2;
    const line = s => s.repeat(m);
    result += `+${line('-')}+\n`;
    result += `|${line(' ')}|\n`.repeat(h - 2);
    result += `+${line('-')}+\n`;
    return result;
  };

  const lines = figure.split('\n');

  while (lines.length > 2) {
    const line = lines.shift();
    const high = line.lastIndexOf('+');
    let n2 = 0;
    while (n2 < high) {
      let n1 = -1;
      do {
        n1 = line.indexOf('+', n2);
        const subN1 = lines[0][n1];
        const notStop = (subN1 !== '+') && (subN1 !== '|');
        n2 = n1 + 1;
      } while (notStop);
      if (n1 === -1) break;


      let n = n1;


      do {
        n2 = line.indexOf('+', n + 1);
        const subN2 = lines[0][n2];
        const notStop = (subN2 !== '+') && (subN2 !== '|');
        n = n2;
      } while (notStop && (n2 !== -1));

      if (n2 === -1) break;

      const b = n2 - n1 + 1;
      const h = lines.findIndex(x => x[n1] === '+' && x[n2] === '+') + 2;



      yield rect(b, h);
    }
  }
}

module.exports = {
  parseBankAccount: parseBankAccount,
  wrapText: wrapText,
  PokerRank: PokerRank,
  getPokerHandRank: getPokerHandRank,
  getFigureRectangles: getFigureRectangles
};
