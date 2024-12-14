import * as React from "react";
import { useState } from "react";
import "./app.css";

const App = ({}) => {
  const [count, setCount] = useState(5);
  const [dsl, setDsl] = useState(`{
  "type": "button",
  "properties": {
    "color": "blue",
    "width": 100,
    "height": 40
  }
}`);

  const create = () => {
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count: count } },
      "*"
    );
  };

  const cancel = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };

  const onchange = (e) => {
    const target = e.target;
    if (!target) return;
    setCount(Number(target.value));
  };

  const createComponent = () => {
    parent.postMessage({ pluginMessage: { type: "create-component" } }, "*");
  };

  const createFromDSL = () => {
    parent.postMessage(
      { pluginMessage: { type: "create-from-dsl", dsl: dsl } },
      "*"
    );
  };

  return (
    <div className="main-wrapper">
      <h2>Component Creator</h2>
      <textarea
        value={dsl}
        onChange={(e) => setDsl(e.target.value)}
        placeholder="Enter DSL here"
      />
      <div className="operate">
        <button onClick={create}>Create</button>
        <button onClick={cancel}>Cancel</button>
        <button onClick={createComponent}>Create Component</button>
        <button onClick={createFromDSL}>Create from DSL</button>
      </div>
    </div>
  );
};

export default App;
