import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [btnColour, setBtnColour] = useState("red");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const newBtnColour = btnColour === "red" ? "blue" : "red";
  return (
    <div>
      <button style={{ "backgroundColor": btnColour }} disabled={disabledBtn}  onClick={()=> setBtnColour(newBtnColour)}>
        Change to {newBtnColour}
      </button>
      <input type="checkbox" onChange={(e)=>setDisabledBtn(e.target.checked)}/>
    </div>
  );
}

export default App;
