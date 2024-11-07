import { useState } from 'react';
import './App.css';  // Importing CSS for styling

function App() {
 // for blue tokens
  const [blueTokens, setBlueTokens] = useState(0);
  const [bluePrefix, setBluePrefix] = useState('');
  const [bluePerRow, setBluePerRow] = useState(1);

  // for red tokens
  const [redTokens, setRedTokens] = useState(0);
  const [redPrefix, setRedPrefix] = useState('');
  const [redPerRow, setRedPerRow] = useState(1);

  // for generated tokens
  const [generatedBlueTokens, setGeneratedBlueTokens] = useState([]);
  const [generatedRedTokens, setGeneratedRedTokens] = useState([]);

  // to generate tokens
  const generateTokens = () => {
    const blueTokenArray = [];
    const redTokenArray = [];

    // generating blue tokens
    for (let i = 1; i <= blueTokens; i++) {
      blueTokenArray.push(`${bluePrefix}${i}`);
    }

    // gen red tokens
    for (let i = 1; i <= redTokens; i++) {
      redTokenArray.push(`${redPrefix}${i}`);
    }

    // Update the state with generated tokens
    setGeneratedBlueTokens(blueTokenArray);
    setGeneratedRedTokens(redTokenArray);
  };

  // to clear inputs and generated tokens
  const clearFields = () => {
    setBlueTokens(0);
    setBluePrefix('');
    setBluePerRow(1);
    setRedTokens(0);
    setRedPrefix('');
    setRedPerRow(1);
    setGeneratedBlueTokens([]);
    setGeneratedRedTokens([]);
  };

  // Function to render tokens in rows
  const renderTokens = (tokens, perRow, color) => {
    let rows = [];
    // Split tokens into rows based on the perRow value
    for (let i = 0; i < tokens.length; i += perRow) {
      rows.push(tokens.slice(i, i + perRow));
    }

    // Render each row of tokens
    return rows.map((row, rowIndex) => (
      <div className="token-row" key={rowIndex}>
        {row.map((token, tokenIndex) => (
          <div key={tokenIndex} className={`token-box ${color}`}>
            {token}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="token-generator-container">
      <h1>Token Generator</h1>

      {/* Inputs for the blue tookens */}
      <div className="input-container">
        <label>Number of Blue Tokens</label>
        <input
          type="number"
          value={blueTokens}
          onChange={(e) => setBlueTokens(parseInt(e.target.value) || 0)}
          min={0}
        />
        <label>Blue Token Prefix</label>
        <input
          type="text"
          value={bluePrefix}
          onChange={(e) => setBluePrefix(e.target.value)}
        />
        <label>Blue Tokens per Row</label>
        <input
          type="number"
          value={bluePerRow}
          onChange={(e) => setBluePerRow(parseInt(e.target.value) || 1)}
          min={1}
        />
      </div>

      {/* Inputs for the red tokens*/}
      <div className="input-container">
        <label>Number of Red Tokens</label>
        <input
          type="number"
          value={redTokens}
          onChange={(e) => setRedTokens(parseInt(e.target.value) || 0)}
          min={0}
        />
        <label>Red Token Prefix</label>
        <input
          type="text"
          value={redPrefix}
          onChange={(e) => setRedPrefix(e.target.value)}
        />
        <label>Red Tokens per Row</label>
        <input
          type="number"
          value={redPerRow}
          onChange={(e) => setRedPerRow(parseInt(e.target.value) || 1)}
          min={1}
        />
      </div>

      {/* Generate and Clear Buttons */}
      <div className="button-container">
        <button className="generate-button" onClick={generateTokens}>
          Generate
        </button>
        <button className="clear-button" onClick={clearFields}>
          Clear
        </button>
      </div>

      {/*for displaying the generated tokens */}
      {generatedBlueTokens.length > 0 && (
        <div className="token-section">
          <h2>Blue Tokens</h2>
          {renderTokens(generatedBlueTokens, bluePerRow, 'blue')}
        </div>
      )}

      {generatedRedTokens.length > 0 && (
        <div className="token-section">
          <h2>Red Tokens</h2>
          {renderTokens(generatedRedTokens, redPerRow, 'red')}
        </div>
      )}
    </div>
  );
}

export default App;

