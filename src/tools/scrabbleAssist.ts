interface Props {
  letters: string[];
  words: string[];
  lettersLonger: number;
}

interface LettersAlreadyReviewed {
  [key: string]: boolean;
}

const scrabbleAssist = (props: Props) => {
  const { letters, words, lettersLonger } = props;
  /**
   * 1. Check for letters provided
   */
  if (!letters.length) {
    return [];
  }
  /**
   * 2. Filter for words that have at least the provided letters
   */
  return words.filter(word => {
    /**
     * A. Check for lettersLonger option
     */
    if (lettersLonger || lettersLonger === 0) {
      if (
        word.length !== letters.length + lettersLonger ||
        word === letters.join("")
      ) {
        return false;
      }
    }
    const lettersAlreadyReviewed: LettersAlreadyReviewed = {};
    return letters.every(letter => {
      if (lettersAlreadyReviewed[letter]) {
        return true;
      } else {
        lettersAlreadyReviewed[letter] = true;
      }

      const letterUnderReview = letter;
      const numberOfOccurrencesOfLetterInLetters = letters.filter(
        (letter: string) => letter === letterUnderReview
      ).length;
      const letterRegExp = new RegExp(letter, "gi");
      const numberOfOccurrencesOfLetterInWord = (word.match(letterRegExp) || [])
        .length;
      return (
        numberOfOccurrencesOfLetterInWord >=
        numberOfOccurrencesOfLetterInLetters
      );
    });
  });
};

export default scrabbleAssist;
