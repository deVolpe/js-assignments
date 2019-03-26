/* eslint-disable max-len */

/** ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function() {
  return this.width * this.height;
};


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and
 * pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and
 * implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear
 * and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify() =>
 *    '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify() =>
 *    'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify() =>
 *      'div#main.container.draggable + table#data ~ tr:nth-of-type(even) td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

function CssSelector() {
  this.selectors = [];
  this.validSort = [];
}

CssSelector.prototype = {
  sortSelectors: ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement'],

  element(value) {
    this.validate('element');
    this.tryPush([value, 'element']);
    return this;
  },

  id(value) {
    this.validate('id');
    this.tryPush([value, 'id']);
    return this;
  },

  class(value) {
    this.validate('class');
    this.selectors.push([value, 'class']);
    return this;
  },

  attr(value) {
    this.validate('attr');
    this.selectors.push([value, 'attr']);
    return this;
  },

  pseudoClass(value) {
    this.validate('pseudoClass');
    this.selectors.push([value, 'pseudoClass']);
    return this;
  },

  pseudoElement(value) {
    this.validate('pseudoElement');
    this.tryPush([value, 'pseudoElement']);
    return this;
  },

  combine(selector1, combinator, selector2) {
    this.tryPush([
      [selector1, combinator, selector2], 'combine'
    ]);
    return this;
  },

  include(value, array) {
    for (const cur of array) {
      if (cur[1] === value[1]) {
        return true;
      }
    }
    return false;
  },

  tryPush(value) {
    if (this.include(value, this.selectors)) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    } else {
      this.selectors.push(value);
    }
  },

  validate(value) {
    if (!this.validSort.length) {
      for (const cur of this.selectors) {
        this.validSort.push(cur[1]);
      }
    }
    this.validSort.map(val => {
      if (this.sortSelectors.indexOf(val) > this.sortSelectors.indexOf(value)) {
        throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
      }
    });
  },

  stringify() {
    return this.selectors.reduce((acc, cur) => {
      let str = '';
      const value = cur[0],
        type = cur[1];
      switch (type) {
      case 'element':
        str = value;
        break;
      case 'id':
        str = '#' + value;
        break;
      case 'class':
        str = '.' + value;
        break;
      case 'attr':
        str = '[' + value + ']';
        break;
      case 'pseudoClass':
        str = ':' + value;
        break;
      case 'pseudoElement':
        str = '::' + value;
        break;
      case 'combine':
        str = value[0].stringify() + ' ' + value[1] + ' ' + value[2].stringify();
        break;
      }
      return acc + str;
    }, '');
  }
};

const cssSelectorBuilder = {

  element(value) {
    return new CssSelector().element(value);
  },

  id(value) {
    return new CssSelector().id(value);
  },

  class(value) {
    return new CssSelector().class(value);
  },

  attr(value) {
    return new CssSelector().attr(value);
  },

  pseudoClass(value) {
    return new CssSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CssSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CssSelector().combine(selector1, combinator, selector2);
  }
};

module.exports = {
  Rectangle: Rectangle,
  getJSON: getJSON,
  fromJSON: fromJSON,
  cssSelectorBuilder: cssSelectorBuilder
};
