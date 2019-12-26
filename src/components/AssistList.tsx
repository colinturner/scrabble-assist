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
      <div style={{ whiteSpace: "pre-line", lineHeight: "30px" }}>
        {scrabbleAssist({
          letters: letters.split(""),
          words: ENGLISH_WORDS
        }).join("\r\n")}
      </div>
    </>
  );
};

export default AssistList;
