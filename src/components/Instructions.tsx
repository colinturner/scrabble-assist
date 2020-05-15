import React, { useState } from "react";
import { Button } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

function handleClick(open: boolean): void {
  console.log("hello");
}

export default function Instructions() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(!open)}>
        Click me for instructions 💡
      </Button>
      {open && (
        <>
          <h3>Let's find you a winning word</h3>
          <p>
            Substitute <Text code>&</Text> for "any amount of letters"{" "}
          </p>
          <p>
            Substitute <Text code>*</Text> for "one single letter"{" "}
          </p>
        </>
      )}
    </>
  );
}
