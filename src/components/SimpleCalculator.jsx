import React, { useState } from 'react';

const SimpleCalculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [op, setOp] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculator = () => {
    setError(""); // reset error

    if (!num1 || !num2 || !op) {
      setError("Please enter both numbers and select an operator");
      return;
    }

    const n1 = Number(num1);
    const n2 = Number(num2);

    if (op === "/" && n2 === 0) {
      setError("Cannot divide by zero");
      return;
    }

    let res;
    switch (op) {
      case "+": res = n1 + n2; break;
      case "-": res = n1 - n2; break;
      case "*": res = n1 * n2; break;
      case "/": res = n1 / n2; break;
      default: setError("Invalid operator"); return;
    }
    setResult(res);
  };

  const clearCal = () => {
    setNum1("");
    setNum2("");
    setOp("");
    setResult(null);
    setError("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Simple Calculator</h1>
        <div>
          <p style={styles.result}>Result: {result !== null ? result : "--"}</p>
          <button style={styles.button} onClick={clearCal}>Clear</button>
        </div>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
          style={styles.input}
        />
        <select value={op} onChange={(e) => setOp(e.target.value)} style={styles.input}>
          <option value="">Select operator</option>
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
          style={styles.input}
        />
        <div>
          <button style={styles.button} onClick={calculator}>Calculate</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #74ebd5, #9face6)",
  },
  container: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    width: "320px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1rem",
    color: "#333",
  },
  input: {
    width: "80%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 16px",
    margin: "10px 5px",
    border: "none",
    borderRadius: "6px",
    background: "#6c63ff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  },
  result: {
    fontWeight: "bold",
    color: "#2d3436",
  },
  error: {
    color: "#e74c3c",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};



export default SimpleCalculator;