import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";

const AssistList = () => {
  const [letters, setLetters] = useState("");
  const [anagram, setAnagram] = useState(false);
  return (
    <>
      <div>
        <input
          placeholder="Which letters do you have?"
          onChange={e => setLetters(e.target.value)}
        />
        <label>Anagram</label>
        <input type="checkbox" onChange={() => setAnagram(!anagram)} />
      </div>
      <div style={{ whiteSpace: "pre-line", lineHeight: "30px" }}>
        {scrabbleAssist({
          letters: letters.split(""),
          words: ENGLISH_WORDS,
          anagram
        }).join("\r\n")}
      </div>
    </>
  );
};

export default AssistList;
