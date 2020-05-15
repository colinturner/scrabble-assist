import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";
import GERMAN_WORDS from "../constants/germanWords";
import styled from "styled-components";
import { Select, Input, Popover, Typography } from "antd";
import Question from "../assets/question-mark.svg";

const { Option } = Select;
const { Text } = Typography;

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

const List = styled.div`
  white-space: pre-line;
  line-height: 30px;
`;

const QuestionMark = styled.img`
  cursor: pointer;
  height: 32px;
`;

const Example = styled.div`
  font-weight: bold;
`;

const Explanation = styled.div`
  max-width: 50px;
`;

const BoardLetterContent = styled.div`
  max-width: 400px;
`;

export default function AssistList() {
  const [lettersInHand, setLettersInHand] = useState("");
  const [lettersInTargetWord, setLettersInTargetWord] = useState("");
  const [words, setWords] = useState(ENGLISH_WORDS);
  const hand_letter_title = "Instructions";
  const hand_letter_content = (
    <>
      <div>
        Write down the letters you have in your hand. Substitute{" "}
        <Text code>*</Text> when you have a blank tile.
      </div>
      <br />
      <div>
        If you leave this field blank, we'll pretend you just have infinite
        blank tiles in your hand.
      </div>
    </>
  );
  const board_letter_title = "Instructions";
  const board_letter_content = (
    <BoardLetterContent>
      <div>Write down the known letters of the word you want to complete.</div>
      <div>
        Substitute <Text code>*</Text> for 1 missing letter.
      </div>
      <div>
        Substitute <Text code>&</Text> for 0 or more missing letters.
      </div>
      <br />
      <Example>Example</Example>
      <div>
        Entering <Text code>l*g&</Text> could yield the following words
        depending on the letters in your hand:
      </div>
      <ul>
        <li>leg</li>
        <li>legs</li>
        <li>lug</li>
        <li>lugs</li>
        <li>luggage</li>
      </ul>
      <div>
        We indicated that we are looking for a word that starts with an{" "}
        <Text code>l</Text>, then has a single empty letter spot (
        <Text code>*</Text>
        ), followed by a <Text code>g</Text>, and then either stops there or
        continues with more letters (<Text code>&</Text>).
      </div>
    </BoardLetterContent>
  );
  function setLanguage(value: string): void {
    const languages = {
      english: ENGLISH_WORDS,
      german: GERMAN_WORDS,
    };
    type WORD_SET = keyof typeof languages;
    const words = value as WORD_SET;

    setWords(languages[words]);
  }

  return (
    <Container>
      <Title>Scrabble Assist</Title>
      <Header>
        <InputGroup>
          <Select
            defaultValue="english"
            style={{ width: 120 }}
            onChange={(e) => setLanguage(e)}
          >
            <Option value="english">English</Option>
            <Option value="german">German</Option>
          </Select>
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="xy*z"
            addonBefore="Letters in hand"
            onChange={(e) => setLettersInHand(e.target.value.toLowerCase())}
          />
          <Popover
            title={hand_letter_title}
            content={hand_letter_content}
            placement="right"
          >
            <QuestionMark src={Question} />
          </Popover>
        </InputGroup>
        <InputGroup>
          <Input
            placeholder="l*g&"
            addonBefore="Letters on board"
            onChange={(e) =>
              setLettersInTargetWord(e.target.value.toLowerCase())
            }
          />
          <Popover
            title={board_letter_title}
            content={board_letter_content}
            placement="right"
          >
            <QuestionMark src={Question} />
          </Popover>
        </InputGroup>
      </Header>
      <List>
        {scrabbleAssist({
          lettersInHand,
          lettersInTargetWord,
          words,
        }).join("\r\n")}
      </List>
    </Container>
  );
}
