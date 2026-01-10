import React, { useEffect, useState } from 'react'

const MAX = 100;
const styles = {
  container: {
    width: "350px",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    margin: "40px auto",
    fontFamily: "Arial",
  },
  textarea: {
    width: "100%",
    height: "100px",
    fontSize: "16px",
    padding: "10px",
    marginTop: "10px",
    resize: "none",
  },
  progress: {
    height: "8px",
    background: "#ddd",
    borderRadius: "5px",
    margin: "10px 0",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    transition: "width 0.2s",
  },
  button: {
    width: "100%",
    padding: "8px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
};


const CharacterCounterApp = () => {
    const [text, setText] = useState("")
    const [count, setCount] = useState(0);

    // Load from localstorage
    useEffect(() => {
        const savedText = localStorage.getItem("userText");
        if (savedText) {
            setText(savedText);
            setCount(savedText.length);
        }

    }, []);

    // save to localstorage
    useEffect(() => {
        localStorage.setItem("userText", text);
    }, [text]);

    const handleChange = (e) => {
        const value = e.target.value.slice(0, MAX);
        setText(value);
        setCount(value.length);
    }

    const clearText = () => {
        setText("");
        setCount(0);
        localStorage.removeItem("userText");
    }

    const remaining = MAX - count;
    const progress = (count / MAX) * 100;

    const getColor = () => {
        if (count < 90) return "green";
        if (count < MAX) return "orange";
        return "red";
    }

  return (
    <div style={styles.container}>
          <h2>
              Remaining Characters:{" "}
              <span style={{color:getColor()}}>{ remaining}</span>
          </h2>
          
          <textarea
              value={text}
              onChange={handleChange}
              placeholder='Start typing...'
              style={styles.textarea}
          />

          <div style={styles.progress}>
        <div
          style={{
            ...styles.bar,
            width: `${progress}%`,
            background: getColor(),
          }}
        ></div>
      </div>

      {count === MAX && (
        <p style={{ color: "red" }}>Character limit reached!</p>
      )}

      <button onClick={clearText} style={styles.button}>
        Clear
      </button>
    </div>
  )
}

export default CharacterCounterApp
