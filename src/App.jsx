import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberalloewd, setNumberAlloewd] = useState();
  const [characterallowed, setCharacterAlloewd] = useState();
  const [password, setPassword] = useState();
  const passwordref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvuwxyz";
    if (numberalloewd) str += "0123456789";
    if (characterallowed) str += "~!@#$%^&(){}[]:;<>?/_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberalloewd, characterallowed, setPassword]);

  const copypassword = () => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwordgenerator();
  }, [length, numberalloewd, characterallowed, setPassword]);

  return (
    <>
      <form style={{ color: "white" }} className="form-container">
        <h1 className="title">Password Generator</h1>
        <div className="mb-3 password-container">
          <input
            type="text"
            className="password-box"
            readOnly
            value={password}
            placeholder="Password"
            ref={passwordref}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={copypassword}
          >
            Copy
          </button>
        </div>
        <div className="range-container">
          <label for="customRange2" className="form-label">
            Length:&nbsp;{length}
          </label>
          <input
            type="range"
            className="form-range"
            min="8"
            max="20"
            id="customRange2"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>

        <div className="characteristic-container">
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              defaultChecked={numberalloewd}
              onChange={() => {
                setNumberAlloewd((prev) => !prev);
              }}
            />
            <label className="form-check-label" for="exampleCheck1">
              Numbers
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              defaultChecked={characterallowed}
              onChange={() => {
                setCharacterAlloewd((prev) => !prev);
              }}
            />
            <label className="form-check-label" for="exampleCheck1">
              Special Characters
            </label>
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
