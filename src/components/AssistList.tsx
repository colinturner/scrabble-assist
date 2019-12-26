import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  width: fit-content;
`;

const Title = styled.div`
  font-size: 35px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
`;

const InputGroup = styled.div`
  display: flex;
  :not(:last-child) {
    padding-bottom: 20px;
  }
`;

const Label = styled.div`
  background: aliceblue;
  padding: 10px;
  margin-right: 10px;
  border-radius: 3px;
`;

const Input = styled.input`
  font-size: 20px;
  border-radius: 3px;
`;

const List = styled.div`
  white-space: pre-line;
  line-height: 30px;
`;

const AssistList = () => {
  const [letters, setLetters] = useState("");
  const [lettersLonger, setLettersLonger] = useState(NaN);
  return (
    <Container>
      <Title>Scrabble Assist</Title>
      <Header>
        <InputGroup>
          <Label>Letters in your hand:</Label>
          <Input placeholder="xyz" onChange={e => setLetters(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <Label>Find words with this many extra letters:</Label>
          <Input
            type="number"
            onChange={e => setLettersLonger(parseInt(e.target.value))}
          />
        </InputGroup>
      </Header>
      <List>
        {scrabbleAssist({
          letters: letters.split(""),
          words: ENGLISH_WORDS,
          lettersLonger
        }).join("\r\n")}
      </List>
    </Container>
  );
};

export default AssistList;
