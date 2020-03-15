import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";
import GERMAN_WORDS from "../constants/germanWords";
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

function AssistList() {
  const [lettersInHand, setLettersInHand] = useState("");
  const [lettersInTargetWord, setLettersInTargetWord] = useState("");
  const [words, setWords] = useState(ENGLISH_WORDS);

  function setLanguage(e: React.ChangeEvent<HTMLSelectElement>): void {
    const languages = {
      english: ENGLISH_WORDS,
      german: GERMAN_WORDS
    };
    type WORD_SET = keyof typeof languages;
    const words = e.target.value as WORD_SET;

    setWords(languages[words]);
  }

  return (
    <Container>
      <Title>Scrabble Assist</Title>
      <Header>
        <InputGroup>
          <Label>Language:</Label>
          <select onChange={e => setLanguage(e)}>
            <option value="english">English</option>
            <option value="german">German</option>
          </select>
        </InputGroup>
        <InputGroup>
          <Label>Letters in hand (optional):</Label>
          <Input
            placeholder="xyz"
            onChange={e => setLettersInHand(e.target.value.toLowerCase())}
          />
        </InputGroup>
        <InputGroup>
          <Label>Desired word format:</Label>
          <Input
            placeholder="sc**h&"
            onChange={e => setLettersInTargetWord(e.target.value.toLowerCase())}
          />
        </InputGroup>
      </Header>
      <List>
        {scrabbleAssist({
          lettersInHand,
          lettersInTargetWord,
          words
        }).join("\r\n")}
      </List>
    </Container>
  );
}

export default AssistList;
