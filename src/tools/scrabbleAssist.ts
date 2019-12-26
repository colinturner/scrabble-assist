interface Props {
  letters: string[];
  words: string[];
}

interface LettersAlreadyReviewed {
  [key: string]: boolean;
}

const scrabbleAssist = (props: Props) => {
  const { letters, words } = props;
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
