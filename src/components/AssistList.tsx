import React, { useState, ReactElement } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";
import GERMAN_WORDS from "../constants/germanWords";
import styled from "styled-components";
import { Select, Input, Popover, Typography } from "antd";
import Lightbulb from "../assets/lightbulb.svg";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Examples from "./Examples";

const { Option } = Select;
const { Text } = Typography;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 35px;
`;

const Subtitle = styled.div`
  font-size: 15px;
  padding-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  :not(:last-child) {
    padding-bottom: 20px;
  }
`;

const QuestionMark = styled.img`
  cursor: pointer;
  height: 32px;
  padding-left: 10px;
`;

const AutoSizerWrapper = styled.div`
  flex: 1 1 auto;
  height: 100vh;
  background-color: #fafafa;
  padding: 0px 10px;
`;

const BoardLetterContent = styled.div`
  max-width: 400px;
`;

const hand_letter_title = "Instructions";
const hand_letter_content = (
  <>
    <div>
      Write down the letters you have in your hand. Substitute{" "}
      <Text code>*</Text> when you have a blank tile.
    </div>
    <br />
    <div>
      If you leave this field blank, we'll just pretend you have infinite blank
      tiles in your hand.
    </div>
  </>
);

const board_letter_title = "Instructions";

const board_letter_content = (
  <BoardLetterContent>
    <div>
      Write down the known letters of the word you want to complete. There are
      two special characters you can use:
    </div>
    <br />
    <ul>
      <li>
        Substitute <Text code>*</Text> for a missing letter.
      </li>
      <li>
        Substitute <Text code>&</Text> for "0 or more" missing letters. This
        character is especially useful for adding a prefix or a suffix on either
        end of your target word.
      </li>
    </ul>
    <br />
    <Examples />
  </BoardLetterContent>
);

const language_title = "Instructions";
const language_content = (
  <div>Select the language you're playing Scrabble in.</div>
);

export default function AssistList() {
  const [lettersInHand, setLettersInHand] = useState("");
  const [lettersInTargetWord, setLettersInTargetWord] = useState("");
  const [words, setWords] = useState(ENGLISH_WORDS);
  const wordList = scrabbleAssist({
    lettersInHand,
    lettersInTargetWord,
    words,
  });

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
      <Header>
        <Title>Scrabble Assist</Title>
        <Subtitle>Click the lightbulbs for instructions</Subtitle>
        <ChooseLanguage setLanguage={setLanguage} />
        <SetHandLetters setLettersInHand={setLettersInHand} />
        <SetTargetWordLetters setLettersInTargetWord={setLettersInTargetWord} />
      </Header>
      <WordMatches wordList={wordList} />
    </Container>
  );
}

function ChooseLanguage({
  setLanguage,
}: {
  setLanguage: Function;
}): ReactElement {
  return (
    <InputGroup>
      <Select
        defaultValue="english"
        style={{ width: 120 }}
        onChange={(e) => setLanguage(e)}
      >
        <Option value="english">English</Option>
        <Option value="german">German</Option>
      </Select>
      <Popover
        title={language_title}
        content={language_content}
        placement="right"
      >
        <QuestionMark src={Lightbulb} />
      </Popover>
    </InputGroup>
  );
}

function SetHandLetters({
  setLettersInHand,
}: {
  setLettersInHand: Function;
}): ReactElement {
  return (
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
        <QuestionMark src={Lightbulb} />
      </Popover>
    </InputGroup>
  );
}

function SetTargetWordLetters({
  setLettersInTargetWord,
}: {
  setLettersInTargetWord: Function;
}): ReactElement {
  return (
    <InputGroup>
      <Input
        placeholder="l*g&"
        addonBefore="Target word"
        onChange={(e) => setLettersInTargetWord(e.target.value.toLowerCase())}
      />
      <Popover
        title={board_letter_title}
        content={board_letter_content}
        placement="right"
      >
        <QuestionMark src={Lightbulb} />
      </Popover>
    </InputGroup>
  );
}

function WordMatches({ wordList }: { wordList: string[] }): ReactElement {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>{wordList[index]}</div>
  );

  return (
    <AutoSizerWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={wordList.length}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </AutoSizerWrapper>
  );
}
