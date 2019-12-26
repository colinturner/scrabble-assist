interface LettersAlreadyReviewed {
  [key: string]: boolean;
}

const scrabbleAssist = (letters: string[], words: string[]) => {
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
      const letterRegExp = new RegExp(letter, "g");
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
