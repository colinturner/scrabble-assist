interface Props {
  lettersInTargetWord: string;
  words: string[];
}

interface LettersAlreadyReviewed {
  [key: string]: boolean;
}

type LetterPositions = {
  [key in number | string]: string;
};

export default function scrabbleAssist(props: Props) {
  let { words, lettersInTargetWord } = props;
  /**
   * 1. Return nothing if no input given for letters in target word
   */
  if (!lettersInTargetWord) {
    return [];
  }
  /**
   * 2. Break down letter groups in target word
   */
  return words.filter(word => {
    let pattern = generateRegExp(lettersInTargetWord);
    return pattern.test(word);
  });
  /**
   * 3. Filter for words that have at least the provided letters
   */
}

export function generateRegExp(lettersInTargetWord: string): RegExp {
  let pattern = lettersInTargetWord;
  if (hasAmpersand(pattern) && beginsWithALetter(pattern)) {
    pattern = "^" + pattern;
  }

  if (hasAmpersand(pattern) && endsWithALetter(pattern)) {
    pattern = pattern + "$";
  }

  pattern = pattern.replace(/&/g, ".*");
  return new RegExp(pattern, "g");
}

function hasAmpersand(pattern: string): boolean {
  return pattern.includes("&");
}

function hasAsterix(pattern: string): boolean {
  return pattern.includes("*");
}

function beginsWithALetter(pattern: string): boolean {
  return !["*", "&"].includes(pattern.charAt(0));
}

function endsWithALetter(pattern: string): boolean {
  return !["*", "&"].includes(pattern.charAt(pattern.length - 1));
}
