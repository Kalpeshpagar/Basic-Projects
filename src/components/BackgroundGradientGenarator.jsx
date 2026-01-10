import React, { useEffect, useState } from 'react'

const BackgroundGradientGenarator = () => {
   const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [direction, setDirection] = useState("to right");
  const [text, setText] = useState('Copy CSS');
  // Build gradient string
  const gradient = `linear-gradient(${direction}, ${color1}, ${color2})`;

  // Apply gradient + save to localStorage
  useEffect(() => {
    document.body.style.background = gradient;
    localStorage.setItem("gradient", gradient);
  }, [gradient]);

  // Load gradient on page refresh
  useEffect(() => {
    const savedGradient = localStorage.getItem("gradient");
    if (savedGradient) {
      document.body.style.background = savedGradient;
    }
  }, []);

  // Copy CSS
  const copyCSS = () => {
  navigator.clipboard.writeText(`background: ${gradient};`);
  setText("Copied");

  const timer = setTimeout(() => {
    setText("Copy CSS");
  }, 1000);

  return () => clearTimeout(timer);
};


  return (
    <div style={styles.container}>
      <h2>Gradient Generator</h2>

      <div style={styles.controls}>
        <input
          type="color"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />
        <input
          type="color"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
        >
          <option value="to right">Left → Right</option>
          <option value="to left">Right → Left</option>
          <option value="to bottom">Top → Bottom</option>
          <option value="to top">Bottom → Top</option>
          <option value="45deg">45°</option>
        </select>
      </div>

      <p style={styles.code}>background: {gradient};</p>

      <button onClick={copyCSS} style={styles.button}>
        {text}
      </button>
    </div>
  );
};

export default BackgroundGradientGenarator

const styles = {
  container: {
    width: "320px",
    padding: "20px",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "8px",
    textAlign: "center",
    margin: "40px auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
  },
  code: {
    background: "#f4f4f4",
    padding: "10px",
    fontSize: "14px",
    wordBreak: "break-all",
  },
  button: {
    width: "100%",
    padding: "8px",
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
