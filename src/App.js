import react, { useEffect, useState } from "react";
import './App.css'

const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const TWELVE_HOURS = 12;
const DEGREES_IN_CIRCLE = 360;

function ratioToDeg(val, max) {
  return (val / max) * DEGREES_IN_CIRCLE;
}

function getCurrentDate(timezone) {
  return timezone ?
    new Date(new Date().toLocaleString('en-US', { timeZone: timezone })) : new Date();
}

function getSeconds(timezone) {
  return getCurrentDate(timezone).getSeconds();
}

function getMinutes(timezone) {
  return getCurrentDate(timezone).getMinutes();
}

function getHours(timezone) {
  return getCurrentDate(timezone).getHours();
}

const useInterval = (callback) => {
    useEffect(() => {
    const timer = setInterval(callback, 1000);
    return () => clearTimeout(timer);
  }, []);
}

const SecondHand = ({ timezone }) => {
  const [seconds, setSeconds] = useState(getSeconds());
  useInterval(() => setSeconds(getSeconds(timezone)));
  const angle = ratioToDeg(seconds, SECONDS_IN_A_MINUTE);

  return (
    <div class="hand seconds" style={{ transform: `rotate(${angle}deg)` }}>
    </div>
  );
}

const MinuteHand = ({ timezone }) => {
  const [minutes, setMinutes] = useState(getMinutes());
  useInterval(() => setMinutes(getMinutes(timezone)));
  const angle = ratioToDeg(minutes, MINUTES_IN_AN_HOUR);

  return (
    <div class="hand minutes" style={{ transform: `rotate(${angle}deg)` }}>
    </div>
  );
}

const HourHand = ({ timezone }) => {
  const [hours, setHours] = useState(getHours());
  useInterval(() => setHours(getHours(timezone)));
  const angle = ratioToDeg(hours % TWELVE_HOURS, TWELVE_HOURS);

  return (
    <div class="hand hours" style={{ transform: `rotate(${angle}deg)` }}>
    </div>
  );
}

const ClockNumbers = () => new Array(TWELVE_HOURS).fill().map((_, i) => {
  const angle = Math.floor((DEGREES_IN_CIRCLE / TWELVE_HOURS) * i);
  return (
    <div className="number-container" style={{ transform: `rotate(${angle}deg)` }}>
      <div style={{ transform: `rotate(-${angle}deg)` }}>
        {i}
      </div>
    </div>
  );
});

const Clock = ({ timezone, showNumbers }) => {
  return (
    <div className="clock">
      {showNumbers && <ClockNumbers />}
      <HourHand timezone={timezone} />
      <MinuteHand timezone={timezone} />
      <SecondHand timezone={timezone} />
    </div>
  );
};

function App() {

  return (
    <div>
      <Clock showNumbers />
      <Clock showNumbers timezone="America/New_York" />
      <Clock showNumbers timezone="UTC" />
    </div>
  );
};



export default App;
