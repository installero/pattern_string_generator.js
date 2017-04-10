class PatternRandomizer {
  constructor(pattern) {
    this.pattern = pattern;
  }

  toString() {
    let stack = [];
    let stackDepth = 0;

    this.pattern.match(/\{|\}|\||[^\{\}\|]+/g).forEach((token) => {
      switch(token) {
        case '{':
          stackDepth += 1;
          stack.push('{');
          break;
        case '|':
          stack.push('|');
          break;
        case '}':
          stackDepth -= 1;

          if (stackDepth < 0) throw "Unbalanced brakets";

          this.closeBracket(stack);
          break;
        default:
          stack.push(token);
      }
    });

    return stack.join('');
  }

  closeBracket(stack) {
    let word = stack.pop();
    let words = [''];

    while (word != '{') {
      if (word == '|') {
        words.push('');
      } else {
        words[words.length - 1] = word + words[words.length - 1];
      }

      word = stack.pop();
    }

    stack.push(words[Math.floor(Math.random() * words.length)]);
  }
}

String.prototype.asPattern = function() {
  return new PatternRandomizer(this);
}
