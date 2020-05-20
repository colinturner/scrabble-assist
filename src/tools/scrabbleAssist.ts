interface Props {
  lettersInHand?: string;
  lettersInTargetWord: string;
  words: string[];
}

interface filterByLettersInTargetWordProps {
  words: string[];
  lettersInTargetWord: string;
}

interface filterByLettersInHandProps {
  filteredWords: string[];
  lettersInHand: string;
  lettersInTargetWord: string;
}

export default function scrabbleAssist(props: Props): string[] {
  let { words, lettersInHand, lettersInTargetWord } = props;
  /**
   * 1. Return nothing if no input given for letters in target word
   */
  if (!lettersInTargetWord) {
    return words;
  }
  /**
   * 2. Filter words list based on a RegExp
   */
  let filteredWords = filterByLettersInTargetWord({
    words,
    lettersInTargetWord,
  });

  if (!lettersInHand) {
    return filteredWords;
  }

  return filterByLettersInHand({
    filteredWords,
    lettersInHand,
    lettersInTargetWord,
  });
}

export function generateRegExp(lettersInTargetWord: string): RegExp {
  let pattern = lettersInTargetWord;
  if (hasAmpersand(pattern) && beginsWithALetter(pattern)) {
    pattern = "^" + pattern;
  }

  if (hasAmpersand(pattern) && endsWithALetter(pattern)) {
    pattern = pattern + "$";
  }

  if (hasAsterisk(pattern) && beginsWithALetter(pattern)) {
    pattern = "^" + pattern;
  }

  if (hasAsterisk(pattern) && endsWithALetter(pattern)) {
    pattern = pattern + "$";
  }

  if (beginsWithAsterisk(pattern)) {
    pattern = "^" + pattern;
  }

  if (endsWithAsterisk(pattern)) {
    pattern = pattern + "$";
  }

  pattern = replaceAsteriskAndAmpersand(pattern);
  return new RegExp(pattern, "g");
}

// Tools
function hasAmpersand(pattern: string): boolean {
  return pattern.includes("&");
}

function hasAsterisk(pattern: string): boolean {
  return pattern.includes("*");
}

function beginsWithALetter(pattern: string): boolean {
  return !["*", "&"].includes(pattern.charAt(0));
}

function endsWithALetter(pattern: string): boolean {
  return !["*", "&"].includes(pattern.charAt(pattern.length - 1));
}

function beginsWithAsterisk(pattern: string): boolean {
  return pattern.charAt(0) === "*";
}

function endsWithAsterisk(pattern: string): boolean {
  return pattern.charAt(pattern.length - 1) === "*";
}

function replaceAsteriskAndAmpersand(pattern: string): string {
  return pattern.replace(/\*/g, ".").replace(/&/g, ".*");
}

function filterByLettersInTargetWord(
  props: filterByLettersInTargetWordProps
): string[] {
  let { words, lettersInTargetWord } = props;
  return words.filter((word) => {
    let pattern = generateRegExp(lettersInTargetWord.toLowerCase());
    return pattern.test(word);
  });
}

function eliminateAsterisksAndAmpersands(letters: string): string {
  return letters.replace(/\*|&/g, "");
}

function moveAsterisksToTheEnd(letters: string): string {
  const numberOfAsterisks = (letters.match(/\*/g) || []).length;
  return letters.replace(/\*/g, "") + "*".repeat(numberOfAsterisks);
}

export function filterByLettersInHand(
  props: filterByLettersInHandProps
): string[] {
  let { filteredWords, lettersInHand, lettersInTargetWord } = props;
  const letters =
    eliminateAsterisksAndAmpersands(lettersInTargetWord) +
    moveAsterisksToTheEnd(lettersInHand);
  return filteredWords.filter((word) => {
    let lettersLeftInWord = word;
    /**
     * Check that you have at least as many letters as are needed for the word
     */
    if (letters.length < word.length) {
      return false;
    }

    /**
     * Iterate through your available letters, removing each letter from the word
     * you're trying to build.
     * If the word's length runs down to zero, you know that your letters can build the word.
     */
    for (let i = 0; i < letters.split("").length; i++) {
      lettersLeftInWord = lettersLeftInWord.replace(letters[i], "");

      /**
       * If you've gone through all the letters in 'letters' and are down to the stars,
       * then remove the first letter from lettersLeftInWord if you have a star
       */
      if (letters[i] === "*") {
        lettersLeftInWord = lettersLeftInWord.substring(1);
      }

      if (!lettersLeftInWord) {
        return true;
      }
    }

    return false;
  });
}
