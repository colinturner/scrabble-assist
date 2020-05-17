import React, { useState } from "react";
import scrabbleAssist from "../tools/scrabbleAssist";
import ENGLISH_WORDS from "../constants/englishWords";
import GERMAN_WORDS from "../constants/germanWords";
import styled from "styled-components";
import { Select, Input, Popover, Typography } from "antd";
import Question from "../assets/question-mark.svg";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const { Option } = Select;
const { Text } = Typography;

const Container = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  padding: 20px;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 35px;
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
`;

const Example = styled.div`
  font-weight: bold;
`;

const BoardLetterContent = styled.div`
  max-width: 400px;
`;

const illuminating_emerald = "#00916e";
const madder_lake = "#cc2936";

const AsteriskStyles = styled.span`
  color: ${madder_lake};
  font-weight: bold;
`;

const AmpersandStyles = styled.span`
  color: ${illuminating_emerald};
  font-weight: bold;
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
      Entering{" "}
      <Text code>
        l<AsteriskStyles>*</AsteriskStyles>g<AmpersandStyles>&</AmpersandStyles>
      </Text>{" "}
      could yield the following playable words depending on the letters in your
      hand:
    </div>
    <ul>
      <li>
        l<AsteriskStyles>e</AsteriskStyles>g
      </li>
      <li>
        l<AsteriskStyles>u</AsteriskStyles>g
      </li>
      <li>
        l<AsteriskStyles>e</AsteriskStyles>g<AmpersandStyles>s</AmpersandStyles>
      </li>
      <li>
        l<AsteriskStyles>u</AsteriskStyles>g<AmpersandStyles>s</AmpersandStyles>
      </li>
      <li>
        l<AsteriskStyles>u</AsteriskStyles>g
        <AmpersandStyles>gage</AmpersandStyles>
      </li>
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

  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>{wordList[index]}</div>
  );

  return (
    <Container>
      <Header>
        <Title>Scrabble Assist</Title>
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
            <QuestionMark src={Question} />
          </Popover>
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
      <div style={{ flex: "1 1 auto", height: "100vh" }}>
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
      </div>
    </Container>
  );
}
