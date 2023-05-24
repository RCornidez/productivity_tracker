import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import './timer.css'



export default function Timer () {
	const [toggle, setToggle] = useState(false);
	const [view, setView] = useState(true);

	const [color, setColor] = useState();	

	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);
	const [previousValues, setPreviousValues] = useState([]);
	const intervalRef = useRef(null);	

	//Stats Values
	const lastTime = previousValues[previousValues.length - 1];
	const largestTime = Math.max(...previousValues);
	const averageTime = [...previousValues].reduce((acc, curr) => acc + curr, 0) / previousValues.length;

	
	//set Color
  function checkNumber(num) {
  	switch (true) {
    	case num < largestTime / 2:
      	setColor('red');
      	break;
    	case num > largestTime / 2 && num < largestTime:
      	setColor('orange');
      	break;
    	case num > largestTime:
      	setColor('green');
      	break;
    	default:
    	  break;
  	}
	}



	//return OO:OO:OO if previousValues null

	const checkEmpty = (t) => {
		if (previousValues.length === 0) {
			return formatTime(0);
		} else {
			return formatTime(t);
		}
	};


	useEffect(() => {
		const previousTimes = localStorage.getItem('previousTimes');

		if (previousTimes) {
			setPreviousValues(JSON.parse(previousTimes));
		}
	
	}, []);

	//update page title to show timer
  useEffect(() => {
    document.title = `${formatTime(time)}`;
		checkNumber(time);
  }, [time]);

  useEffect(() => {
    localStorage.setItem('previousTimes', JSON.stringify(previousValues));
  }, [previousValues]);


	//Adjust visibility of timer / historic data
	const showData = () => {
		setView(false)
	}

	const showTimer = () => {
		setView(true)
	}

	// Stopwatch Functionality
	const start = () => {
		if (!running) {
      setRunning(true);
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => prevTime + 1)
			}, 10);
		}
	};

  const stop = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
			setPreviousValues((previousValues) => [...previousValues, time]);
			setTime(0);
    }
  };

	//format time
  const padTime = (timeValue) => {
    return timeValue.toString().padStart(2, '0');
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  };

	//Adjust visibility of start/stop buttons
	const setToggleTrue = () => {
		setToggle(true);
		start();
	}

	const setToggleFalse = () => {
		setToggle(false);
		stop();
	}

return (
	<div className="timer">
	{ view ? (
		<div className="clock">
			<div className="watch-face">
				<p style={{color: color}} >{formatTime(time)}</p>
				<p>Last: {checkEmpty(lastTime)}</p>
			</div>
			{ toggle ? (	
				<button className="stop" onClick={setToggleFalse}>Stop</button>
				) : (
				<button className="start" onClick={setToggleTrue}>Start</button>
			)}	
			<button className="show-stats" onClick={showData}>Stats</button>
		</div>
		) : (
		<div className="data">
			<button className="show-timer" onClick={showTimer}>Timer</button>
			<div className="records">
				<p>Last: {checkEmpty(lastTime)}</p>
				<p>Best: {checkEmpty(largestTime)}</p>
				<p>Average: {checkEmpty(averageTime)}</p>
			</div>
			<ul className="data-list">
				{[...previousValues].reverse().map((value, index)=>(
					<li key={index}>{formatTime(value)}</li>
				))}
			</ul>
		</div>
		)}
	</div>
)

}
