import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

export function replaceCamelCaseWithSpace(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1')
}

function App() {
  const [btnColour, setBtnColour] = useState("MediumVioletRed");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const newBtnColour = btnColour === "MediumVioletRed" ? "MidnightBlue" : "MediumVioletRed";
  return (
    <div>
      <button style={{ backgroundColor: disabledBtn ? 'grey' :btnColour }} disabled={disabledBtn}  onClick={()=> setBtnColour(newBtnColour)}>
        Change to {replaceCamelCaseWithSpace(newBtnColour)}
      </button>
      <input id='disable-button-checkbox' type="checkbox" onChange={(e)=>setDisabledBtn(e.target.checked)}/>
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
