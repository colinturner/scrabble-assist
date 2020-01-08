import scrabbleAssist, { generateRegExp } from "./scrabbleAssist";

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
  "corn",
  "ear",
  "grey",
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
  it("should take an empty string as input and return no words", () => {
    const lettersInTargetWord = "";
    const expectedResult = [];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letter as input and return all words with that letter", () => {
    const lettersInTargetWord = "y";
    const expectedResult = ["grey", "you", "youth", "yurt"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

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

  it("should take a letters-ampersand-letter input, and return all words where ampersand represents any letter(s)", () => {
    const lettersInTargetWord = "la&a";
    const expectedResult = ["laura", "lamda"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take a letters-ampersand-letter input, and return all words where ampersand represents any letter(s)", () => {
    const lettersInTargetWord = "l&a";
    const expectedResult = ["laura", "lamda", "llama"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

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

  xit("should take several letters as input and return all words with those letters in the right amounts", () => {
    const lettersInTargetWord = { unordered: "ebe" };
    const expectedResult = ["bee", "been", "beneficial"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  xit("should take several letters as input and return all words with those letters in the right amounts", () => {
    const lettersInTargetWord = { unordered: "ebe" };
    const expectedResult = ["bee", "been", "beneficial"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  xit("should take several letters as input and return all words with those letters in the right amounts", () => {
    const lettersInTargetWord = { 4: "e", unordered: "be" };
    const expectedResult = ["beneficial"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  xit("should return no words when none possible", () => {
    const lettersInTargetWord = { unordered: "xyzaaaal" };
    const expectedResult = [];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  xit("should return no words when no letters provided", () => {
    const lettersInTargetWord = {};
    const expectedResult = [];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  xit("should uppercase letters that are not included in the scrabble hand", () => {
    const lettersInTargetWord = { unordered: "nat" };
    const expectedResult = ["ant", "tan", "tanGENT"];
    expect(scrabbleAssist({ lettersInTargetWord, words }).sort()).toEqual(
      expectedResult.sort()
    );
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
});
