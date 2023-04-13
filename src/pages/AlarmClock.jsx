import { useState, useEffect, useRef } from "react";
import { alarmSound } from ".";

function AlarmClock() {
  const [hourInput, setHourInput] = useState("00");
  const [minuteInput, setMinuteInput] = useState("00");
  const [alarmsArray, setAlarmsArray] = useState([]);
  const [alarmIndex, setAlarmIndex] = useState(0);

  const timerRef = useRef(null);
  const activeAlarmsRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const now = new Date();
      const hours = appendZero(now.getHours());
      const minutes = appendZero(now.getMinutes());
      const seconds = appendZero(now.getSeconds());
      const timeString = `${hours}:${minutes}:${seconds}`;
      timerRef.current = document.querySelector(".timer");
      timerRef.current.innertext = timeString;

      alarmsArray.forEach((alarm) => {
        const { alarmHour, alarmMinute, isActive, isPlaying } = alarm;
        if (isActive && !isPlaying && timeString === `${alarmHour}:${alarmMinute}:00`) {
          alarm.sound.play();
          alarm.isPlaying = true;
        }
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [alarmsArray]);

  const inputCheck = (value) => (value < 10 ? `0${value}` : value);

  const createAlarm = (alarm) => {
    const alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm");
    alarmDiv.setAttribute("data-id", alarm.id);
    alarmDiv.innerHTML = `<span>${alarm.alarmHour}:${alarm.alarmMinute}</span>`;
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = alarm.isActive;
    checkbox.addEventListener("click", () => {
      alarm.isActive = !alarm.isActive;
      if (alarm.isActive) {
        startAlarm(alarm);
      } else {
        stopAlarm(alarm);
      }
    });
    alarmDiv.appendChild(checkbox);
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", () => deleteAlarm(alarm));
    alarmDiv.appendChild(deleteButton);
    activeAlarmsRef.current.appendChild(alarmDiv);
    alarm.sound = new Audio(alarmSound);
    alarm.sound.loop = true;
    alarm.isPlaying = false;
  };

  const startAlarm = (alarm) => {
    alarm.isPlaying = true;
  };

  const stopAlarm = (alarm) => {
    if (alarm.isPlaying) {
      alarm.sound.pause();
      alarm.sound.currentTime = 0;
      alarm.isPlaying = false;
    }
  };

  const deleteAlarm = (alarm) => {
    const index = alarmsArray.indexOf(alarm);
    if (index !== -1) {
      alarmsArray.splice(index, 1);
      activeAlarmsRef.current.querySelector(`[data-id="${alarm.id}"]`).remove();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const alarmHour = parseInt(hourInput);
    const alarmMinute = parseInt(minuteInput);
    const alarmExists = alarmsArray.some(
      (alarm) => alarm.alarmHour === alarmHour && alarm.alarmMinute === alarmMinute
    );
    if (alarmExists) {
      alert("Alarm already exists!");
    } else {
      const id = `${alarmIndex}_${hourInput}_${minuteInput}`;
      const alarm = {
        id,
        alarmHour,
        alarmMinute,
        isActive: true,
        isPlaying: false,
      };

      const alarms = [...alarmsArray, alarm];
      setAlarmsArray(alarms);
      createAlarm(alarm);
      setAlarmIndex(alarmIndex + 1);
      setHourInput("00");
      setMinuteInput("00");
    }
  };

  const appendZero = (value) => (value < 10 ? `0${value}` : value);

  return (
    <div className="alarmClock">
      <h1>Alarm Clock</h1>
      <div className="timer" ref={timerRef}></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="hourInput">Hour:</label>
        <input
          type="number"
          id="hourInput"
          value={hourInput}
          min="0"
          max="23"
          onChange={(e) => setHourInput(inputCheck(e.target.value))}
        />
        <label htmlFor="minuteInput">Minute:</label>
        <input
          type="number"
          id="minuteInput"
          value={minuteInput}
          min="0"
          max="59"
          onChange={(e) => setMinuteInput(inputCheck(e.target.value))}
        />
        <button type="submit">Set Alarm</button>
      </form>
      <div className="activeAlarms" ref={activeAlarmsRef}></div>
    </div>
  );
}

export default AlarmClock;
