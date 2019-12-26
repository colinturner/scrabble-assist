import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";
import styled from "styled-components";

const Inputs = styled.div`
  display: flex;
  background: red;
`;

const AssistList = () => {
  const [letters, setLetters] = useState("");
  const [lettersLonger, setLettersLonger] = useState(NaN);
  return (
    <>
      <Inputs>
        <label>Letters in your hand:</label>
        <input placeholder="xyz" onChange={e => setLetters(e.target.value)} />
        <label>Words with this many extra letters:</label>
        <input
          type="number"
          onChange={e => setLettersLonger(parseInt(e.target.value))}
        />
      </Inputs>
      <div style={{ whiteSpace: "pre-line", lineHeight: "30px" }}>
        {scrabbleAssist({
          letters: letters.split(""),
          words: ENGLISH_WORDS,
          lettersLonger
        }).join("\r\n")}
      </div>
    </>
  );
};

export default AssistList;
