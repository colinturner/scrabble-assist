import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";

const AssistList = () => {
  const [letters, setLetters] = useState("");
  return (
    <>
      <input
        placeholder="which letters do you have?"
        onChange={e => setLetters(e.target.value)}
      />
      {scrabbleAssist({ letters: letters.split(""), words: ENGLISH_WORDS }).map(
        word => (
          <ul>{word}</ul>
        )
      )}
    </>
  );
};

export default AssistList;
