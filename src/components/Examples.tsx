import React, { ReactElement } from "react";
import styled from "styled-components";
import { Collapse, Typography } from "antd";

const { Text } = Typography;
const { Panel } = Collapse;

const Example = styled.div`
  font-weight: bold;
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
        l<AsteriskStyles>e</AsteriskStyles>g<AmpersandStyles>s</AmpersandStyles>
      </li>
      <li>
        l<AsteriskStyles>e</AsteriskStyles>g
        <AmpersandStyles>acy</AmpersandStyles>
      </li>
      <li>
        l<AsteriskStyles>u</AsteriskStyles>g
        <AmpersandStyles>gage</AmpersandStyles>
      </li>
      <li>etc...</li>
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
        final letter:
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
        <li>etc...</li>
      </ul>
    </>
  );
};

export default function Examples(): ReactElement {
  return (
    <Collapse accordion>
      <Panel header="Example 1" key="1">
        <Example1 />
      </Panel>
      <Panel header="Example 2" key="2">
        <Example2 />
      </Panel>
      <Panel header="Example 3" key="3">
        <Example3 />
      </Panel>
    </Collapse>
  );
}
