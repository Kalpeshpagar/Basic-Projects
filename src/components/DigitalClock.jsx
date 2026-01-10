import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
        const [time, setTime] = useState("");
        const [date, setDate] = useState("");
        const [format, setFormat] = useState(
        localStorage.getItem('timeFormat') || '12');
    
    useEffect(() => {
        const updatedClock = () => {
            let now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            let ampm = "";
            if (format === '12') {
                ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
            }

            const formatNum = (num) => num.toString().padStart(2, 0);

            const newTime = format === '12' ?
                `${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)} ${ampm}` :
                `${formatNum(hours)}:${formatNum(minutes)}:${formatNum(seconds)}`

            setTime(newTime);

           const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      setDate(now.toLocaleDateString(undefined, options));
        
        }
        updatedClock();
        let interval = setInterval(updatedClock, 1000);
        return () => clearInterval(interval);
    }, [format]);

    const toggleFormat = () => {
        const newFormat = format === '12' ? '24' : '12';
        setFormat(newFormat);
        localStorage.setItem('timeFormat',newFormat);
    }


  return (
    <div style={styles.container}>
          <h1 style={styles.time}>{time}</h1>
          <p style={styles.date}>{date}</p>
          <button onClick={toggleFormat} style={styles.button}>
              Switch to {format === '12' ? '24' : '12'} hour
          </button>
    </div>
  )
}

const styles = {
  container: {
    width: "340px",
    padding: "25px",
    background: "#1e1e1e",
    color: "#fff",
    textAlign: "center",
    borderRadius: "10px",
    margin: "50px auto",
    fontFamily: "Arial",
    boxShadow: "0 0 15px rgba(0,0,0,0.5)",
  },
  time: {
    fontSize: "42px",
    margin: "0",
  },
  date: {
    fontSize: "16px",
    margin: "10px 0 20px",
    color: "#ccc",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    background: "#ff9800",
    color: "#000",
  },
};


export default DigitalClock
