// const scrabbleAssist = require("./scrabbleAssist");
import scrabbleAssist from "./scrabbleAssist";

const words = [
  "ant",
  "bee",
  "been",
  "bear",
  "cork",
  "llama",
  "tan",
  "tangent",
  "you",
  "youth",
  "yurt",
  "zebra"
];

describe("scrabbleAssist", () => {
  it("should take a letter as input and return all words with that letter", () => {
    const letters = ["y"];
    const expectedResult = ["you", "youth", "yurt"];
    expect(scrabbleAssist({ letters, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take several letters as input and return all words with those letters", () => {
    const letters = ["y", "h"];
    const expectedResult = ["youth"];
    expect(scrabbleAssist({ letters, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should be case insensitive", () => {
    const letters = ["y", "H"];
    const expectedResult = ["youth"];
    expect(scrabbleAssist({ letters, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take several letters as input and return all words with those letters in the right amounts", () => {
    const letters = ["b", "e", "e"];
    const expectedResult = ["bee", "been"];
    expect(scrabbleAssist({ letters, words }).sort()).toEqual(
      expectedResult.sort()
    );

    const letters1 = ["e", "b", "e"];
    const expectedResult1 = ["bee", "been"];
    expect(scrabbleAssist({ letters: letters1, words }).sort()).toEqual(
      expectedResult1.sort()
    );
  });

  it("should return no words when none possible", () => {
    const letters = ["x", "y", "z", "a", "a", "a", "a"];
    const expectedResult = [];
    expect(scrabbleAssist({ letters, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should return no words when no letters provided", () => {
    const letters = [];
    const expectedResult = [];
    expect(scrabbleAssist({ letters, words }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should return only words whose length is equal to the number of input letters when 'anagram' is set to true", () => {
    const letters = ["n", "a", "t"];
    const expectedResult = ["ant", "tan"];
    const anagram = true;
    expect(scrabbleAssist({ letters, words, anagram }).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should not return the word that the input letters spell if 'anagram' option is checked", () => {
    const letters = ["a", "n", "t"];
    const expectedResult = ["tan"];
    const anagram = true;
    expect(scrabbleAssist({ letters, words, anagram }).sort()).toEqual(
      expectedResult.sort()
    );
  });
});
