import { useState } from 'react'
import './timer.css'



export default function Timer () {
	const [toggle, setToggle] = useState(false);
	const [view, setView] = useState(false);
	

	//Adjust visibility of start/stop buttons
	const setToggleTrue = () => {
		setToggle(true)
	}

	const setToggleFalse = () => {
		setToggle(false)
	}

	//Adjust visibility of timer / historic data
	const showData = () => {
		setView(false)
	}

	const showTimer = () => {
		setView(true)
	}

return (
	<div className="timer">
	{ view ? (
		<div className="clock">
			<div className="watch-face">
				<p>00:00:00</p>
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
				<p>Last: 00:10:03</p>
				<p>Best: 00:10:03</p>
				<p>Average: 00:10:03</p>
			</div>
			<div className="data-list">
				<p>00:10:03</p>
				<p>00:10:03</p>
				<p>00:10:03</p>
				<p>00:10:03</p>
			</div>
		</div>
		)}
	</div>
)

}
