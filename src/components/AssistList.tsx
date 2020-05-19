import React, { useState, ReactElement } from "react";
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

const Example1 = (): ReactElement => (
  <>
    <Example>Example 1</Example>
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
  </>
);

const Example2 = (): ReactElement => (
  <>
    <Example>Example 2</Example>
    <div>
      Entering{" "}
      <Text code>
        vo<AsteriskStyles>*</AsteriskStyles>
        <AsteriskStyles>*</AsteriskStyles>
      </Text>{" "}
      can only yield 4-letter words that start with "vo":
    </div>
    <ul>
      <li>
        vo<AsteriskStyles>i</AsteriskStyles>
        <AsteriskStyles>d</AsteriskStyles>
      </li>
      <li>
        vo<AsteriskStyles>l</AsteriskStyles>
        <AsteriskStyles>e</AsteriskStyles>
      </li>
      <li>
        vo<AsteriskStyles>l</AsteriskStyles>
        <AsteriskStyles>t</AsteriskStyles>
      </li>
      <li>
        vo<AsteriskStyles>t</AsteriskStyles>
        <AsteriskStyles>e</AsteriskStyles>
      </li>
      <li>
        vo<AsteriskStyles>w</AsteriskStyles>
        <AsteriskStyles>s</AsteriskStyles>
      </li>
    </ul>
    <div>
      whereas entering{" "}
      <Text code>
        vo<AmpersandStyles>&</AmpersandStyles>
      </Text>{" "}
      could yield words of any length, so long as they begin with the letters
      "vo":
    </div>
    <ul>
      <li>
        vo<AmpersandStyles>c</AmpersandStyles>
        <AmpersandStyles>a</AmpersandStyles>
        <AmpersandStyles>b</AmpersandStyles>
        <AmpersandStyles>u</AmpersandStyles>
        <AmpersandStyles>l</AmpersandStyles>
        <AmpersandStyles>a</AmpersandStyles>
        <AmpersandStyles>r</AmpersandStyles>
        <AmpersandStyles>y</AmpersandStyles>
      </li>
      <li>
        vo<AmpersandStyles>c</AmpersandStyles>
        <AmpersandStyles>a</AmpersandStyles>
        <AmpersandStyles>t</AmpersandStyles>
        <AmpersandStyles>i</AmpersandStyles>
        <AmpersandStyles>o</AmpersandStyles>
        <AmpersandStyles>n</AmpersandStyles>
      </li>
      <li>
        vo<AmpersandStyles>l</AmpersandStyles>
        <AmpersandStyles>t</AmpersandStyles>
      </li>
      <li>etc...</li>
    </ul>
  </>
);

const Example3 = (): ReactElement => {
  return (
    <>
      <Example>Example 3</Example>
      <div>
        Entering{" "}
        <Text code>
          <AmpersandStyles>&</AmpersandStyles>
          gil
          <AsteriskStyles>*</AsteriskStyles>
        </Text>{" "}
        can yield words of any length, so long as they end with "gil" plus one
        extra letter after:
      </div>
      <ul>
        <li>
          <AmpersandStyles>a</AmpersandStyles>gil
          <AsteriskStyles>e</AsteriskStyles>
        </li>
        <li>
          <AmpersandStyles>fra</AmpersandStyles>gil
          <AsteriskStyles>e</AsteriskStyles>
        </li>
        <li>
          <AmpersandStyles>grog</AmpersandStyles>gil
          <AsteriskStyles>y</AsteriskStyles>
        </li>
        <li>etc</li>
      </ul>
    </>
  );
};

const board_letter_content = (
  <BoardLetterContent>
    <div>
      Write down the known letters of the word you want to complete. There are
      two special characters you can use:
    </div>
    <br />
    <div>
      Substitute <Text code>*</Text> for each missing letter.
    </div>
    <div>
      Substitute <Text code>&</Text> for "0 or more" missing letters. This
      character is especially useful for adding a prefix or a suffix on either
      end of your target word.
    </div>
    <br />
    <Example1 />
    <br />
    <Example2 />
    <br />
    <Example3 />
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
        <QuestionMark src={Question} />
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
        <QuestionMark src={Question} />
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
        <QuestionMark src={Question} />
      </Popover>
    </InputGroup>
  );
}

function WordMatches({ wordList }: { wordList: string[] }): ReactElement {
  const Row = ({ index, style }: { index: number; style: any }) => (
    <div style={style}>{wordList[index]}</div>
  );

  return (
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
  );
}
