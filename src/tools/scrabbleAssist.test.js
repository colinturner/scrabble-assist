import scrabbleAssist, {
  generateRegExp,
  filterByLettersInHand
} from "./scrabbleAssist";

const words = [
  "adjacent",
  "ant",
  "barrel",
  "bee",
  "bean",
  "been",
  "bear",
  "beneficial",
  "cork",
  "corkage",
  "corn",
  "ear",
  "grey",
  "ha",
  "he",
  "heiko",
  "hi",
  "hum",
  "humming",
  "lambda",
  "laura",
  "lean",
  "llama",
  "tan",
  "tangent",
  "you",
  "youth",
  "yurt",
  "zebra"
];

describe("scrabbleAssist", () => {
  // No input
  it("should take an empty string as input and return no words", () => {
    const lettersInTargetWord = "";
    const expectedResult = [];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  // Just letters
  it("should take a letter as input and return all words with that letter", () => {
    const lettersInTargetWord = "y";
    const expectedResult = ["grey", "you", "youth", "yurt"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  // Letters and ampersands
  it("should take a letter followed by an ampersand, and return all words starting with that letter", () => {
    const lettersInTargetWord = "y&";
    const expectedResult = ["you", "youth", "yurt"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take an ampersand followed by a letter, and return all words ending with that letter", () => {
    const lettersInTargetWord = "&y";
    const expectedResult = ["grey"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letterA-ampersand-letterB input, and return all words starting with letterA and ending with letterB", () => {
    const lettersInTargetWord = "y&h";
    const expectedResult = ["youth"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letterA-ampersand-letterB-ampersand input, and return all words starting with letterA and containing letterB somewhere in the middle", () => {
    const lettersInTargetWord = "t&g&";
    const expectedResult = ["tangent"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take an ampersand-letterA-ampersand-letterB input, and return all words containing letterA in the middle, followed by a separation of more letter(s) and then letterB at the end", () => {
    const lettersInTargetWord = "&e&t";
    const expectedResult = ["adjacent", "tangent"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letterA-ampersand-letterB-ampersand-letterC input, and return all words matching that pattern", () => {
    const lettersInTargetWord = "b&e&l";
    const expectedResult = ["barrel", "beneficial"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letters-ampersand input, and return all words where ampersand represents any letter(s)", () => {
    const lettersInTargetWord = "yo&";
    const expectedResult = ["you", "youth"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letter-ampersand-letter input, and return all words where ampersand represents any letter(s)", () => {
    const lettersInTargetWord = "l&a";
    const expectedResult = ["laura", "lambda", "llama"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letters-ampersand-letter input, and return all words where ampersand represents any letter(s)", () => {
    const lettersInTargetWord = "la&a";
    const expectedResult = ["laura", "lambda"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  // Letters and asterisks
  it("should take a letter-star(s) input, and return all words where star(s) represent extra letter(s)", () => {
    const lettersInTargetWord = "b***";
    const expectedResult = ["bean", "bear", "been"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letter-star(s)-letter input, and return all words where star(s) represent extra letter(s)", () => {
    const lettersInTargetWord = "c**k";
    const expectedResult = ["cork"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a star(s)-letter-star(s) input, and return all words where star(s) represent extra letter(s)", () => {
    const lettersInTargetWord = "*a*";
    const expectedResult = ["ear", "tan"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should be case insensitive", () => {
    const lettersInTargetWord = "*A*";
    const expectedResult = ["ear", "tan"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  //Letters in hand
  it("should take a single lettersInHand, and return the correct words", () => {
    const lettersInHand = "i";
    const lettersInTargetWord = "h*";
    const expectedResult = ["hi"];
    expect(
      scrabbleAssist({ lettersInHand, lettersInTargetWord, words }).sort()
    ).toEqual(expectedResult.sort());
  });

  it("should take multiple lettersInHand, and return the correct words", () => {
    const lettersInHand = "nbr";
    const lettersInTargetWord = "*ea*";
    const expectedResult = ["bean", "bear"];
    expect(
      scrabbleAssist({ lettersInHand, lettersInTargetWord, words }).sort()
    ).toEqual(expectedResult.sort());
  });

  it("should take multiple lettersInHand, and return the correct words", () => {
    const lettersInHand = "aen";
    const lettersInTargetWord = "be&";
    const expectedResult = ["bee", "bean", "been"];
    expect(
      scrabbleAssist({ lettersInHand, lettersInTargetWord, words }).sort()
    ).toEqual(expectedResult.sort());
  });
});

describe("generateRegExp", () => {
  it("should take a string containing a single letter, and return the correct RegExp", () => {
    const lettersInTargetWord = "b";
    const expectedResult = new RegExp("b", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });

  it("should take a string with format letter-ampersand, and return a new RegExp in correct format", () => {
    const lettersInTargetWord = "b&";
    const expectedResult = new RegExp("^b.*", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });

  it("should take a string with format ampersand-letter, and return a new RegExp in correct format", () => {
    const lettersInTargetWord = "&y";
    const expectedResult = new RegExp(".*y$", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });

  it("should take a string with format letter-ampersand-letter-ampersand, and return a new RegExp in correct format", () => {
    const lettersInTargetWord = "b&f&";
    const expectedResult = new RegExp("^b.*f.*", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });

  it("should take a string with format letter-asterisk(s), and return a new RegExp in correct format", () => {
    const lettersInTargetWord = "b***";
    const expectedResult = new RegExp("^b...$", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });

  it("should take a string with format letter-asterisks-letter, and return a new RegExp in correct format", () => {
    const lettersInTargetWord = "c**k";
    const expectedResult = new RegExp("^c..k$", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });

  it("should take a string with format letter-asterisk-letter, and return a new RegExp in correct format", () => {
    const lettersInTargetWord = "*a*";
    const expectedResult = new RegExp("^.a.$", "g");
    expect(generateRegExp(lettersInTargetWord)).toEqual(expectedResult);
  });
});

describe("filterByLettersInHand", () => {
  it("should take a list of filteredWords, lettersInHand, lettersInTargetWord, and then return only the words that can be created using the lettersInHand and lettersInTargetWord", () => {
    const lettersInHand = "aener";
    const lettersInTargetWord = "b&";
    const filteredWords = [
      "barrel",
      "bay",
      "bee",
      "bean",
      "been",
      "bear",
      "beneficial"
    ];
    const expectedResult = ["bee", "been", "bean", "bear"];
    expect(
      filterByLettersInHand({
        lettersInHand,
        lettersInTargetWord,
        filteredWords
      }).sort()
    ).toEqual(expectedResult.sort());
  });

  it("should only return words that are at most as long as the combined letters in lettersInHand and lettersInTargetWord", () => {
    const lettersInHand = "ei";
    const lettersInTargetWord = "h*";
    const filteredWords = ["ha", "he", "hi"];
    const expectedResult = ["he", "hi"];

    expect(
      filterByLettersInHand({
        lettersInHand,
        lettersInTargetWord,
        filteredWords
      }).sort()
    ).toEqual(expectedResult.sort());
  });

  it("should only return words that are at most as long as the combined letters in lettersInHand and lettersInTargetWord", () => {
    const lettersInHand = "umt";
    const lettersInTargetWord = "h&";
    const filteredWords = ["hum", "humming"];
    const expectedResult = ["hum"];
    expect(
      filterByLettersInHand({
        lettersInHand,
        lettersInTargetWord,
        filteredWords
      }).sort()
    ).toEqual(expectedResult.sort());
  });

  it("should accept a * in lettersInHand and allow any letter for that space", () => {
    const lettersInHand = "enxefici*l";
    const lettersInTargetWord = "b&";
    const filteredWords = ["beneficial", "bee", "bears"];
    const expectedResult = ["bee", "beneficial"];
    expect(
      filterByLettersInHand({
        lettersInHand,
        lettersInTargetWord,
        filteredWords
      }).sort()
    ).toEqual(expectedResult.sort());
  });

  it("should accept multiple * characters in lettersInHand and allow any letter for those spaces", () => {
    const lettersInHand = "as*ti*m";
    const lettersInTargetWord = "b*n*a*";
    const filteredWords = ["bantam", "bengal", "bonsai"];
    const expectedResult = ["bantam", "bonsai"];
    expect(
      filterByLettersInHand({
        lettersInHand,
        lettersInTargetWord,
        filteredWords
      }).sort()
    ).toEqual(expectedResult.sort());
  });
});
