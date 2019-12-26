const scrabbleAssist = (letters: string[], words: string[]) => {
  return words.filter(word => {
    return letters.every(letter => {
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
