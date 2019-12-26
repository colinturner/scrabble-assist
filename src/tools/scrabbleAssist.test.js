// const scrabbleAssist = require("./scrabbleAssist");
import scrabbleAssist from "./scrabbleAssist";

const words = [
  "ant",
  "bee",
  "been",
  "bear",
  "cork",
  "llama",
  "you",
  "youth",
  "yurt",
  "zebra"
];

describe("scrabbleAssist", () => {
  it("should take a letter as input and return all words with that letter", () => {
    const letters = ["y"];
    const expectedResult = ["you", "youth", "yurt"];
    expect(scrabbleAssist(letters, words).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take several letters as input and return all words with those letters", () => {
    const letters = ["y", "h"];
    const expectedResult = ["youth"];
    expect(scrabbleAssist(letters, words).sort()).toEqual(
      expectedResult.sort()
    );
  });

  it("should take several letters as input and return all words with those letters in the right amounts", () => {
    const letters = ["b", "e", "e"];
    const expectedResult = ["bee", "been"];
    expect(scrabbleAssist(letters, words).sort()).toEqual(
      expectedResult.sort()
    );

    const letters1 = ["e", "b", "e"];
    const expectedResult1 = ["bee", "been"];
    expect(scrabbleAssist(letters1, words).sort()).toEqual(
      expectedResult1.sort()
    );
  });
});
