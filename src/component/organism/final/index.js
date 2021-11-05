import React ,{useState, useEffect} from 'react';
import Clock from '../../atom/clock';
import Button  from './../../atom/button';
import Info from './../../molecule/info';
import useSound from 'use-sound';
import startSound from './../../../sounds/zapsplat_bells_bell_small_hand_ring_ping_single_soft_002_67991.mp3'
import './style.css';




function Final() {

    const [stopped, setStopped] = useState(true);
    const [countingDown,setCountingDown] = useState(false); 
    const [countDown, setCountDown] = useState(10);
    const [countDownTime,setCountDownTime] = useState(10);
    const [time,setTime] = useState(0);
    const [newTime,setNewTime] = useState(-1);
    const [play] = useSound(startSound);
    useEffect(() => {
        let timeOut = null;

        if(countDown > 0 && countingDown  === true) {
            timeOut = setInterval(() => {
                if(countDown > 0) {
                    setCountDown((countDown) => countDown -1)
                }
            },1000);
        } else if (countDown < 1 && countingDown === true) {    
            play();
            setCountingDown(false);
            setStopped(false);  
            clearInterval(timeOut);
        }

        return () => clearTimeout(timeOut);
    },[countingDown,countDown]);

    useEffect(() => {
        let interval = null;

        if (stopped === false && countingDown === false) {
            
            interval = setInterval(() => {
            setTime((time) => time + 1000);
            }, 1000);

        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    },[stopped,countingDown]);


    const changeCountDownTime = (CountDowntime) => {
        setCountDown(CountDowntime);
        setCountDownTime(CountDowntime);
    }
    
    const start = () => {
        setTime(0);
        setCountingDown(true);
        setStopped(false);
    }

    const stop = () => { 
        setNewTime(time);
        setCountDown(countDownTime);
        setCountingDown(false);
        setStopped(true);
    }

    const handleClick = () => {

        if(stopped === false) {
            stop();
        } else {
            start();
        }
        
    }
    
    return (
        <div className="final-main">
            <Clock time={
                countingDown? countDown : time
                }
                countingDown = {countingDown}
            />
            
            <div className="final-control-and-info">
                
                <div className="final-button">
                    <Button onClick={handleClick}
                        stop = {stopped} 
                    />
                </div>

                <div className="final-info">
                    <Info aditionalTime={countDown} newTime={newTime} changeCountDownTime={changeCountDownTime} />
                </div>
            </div>

        </div>
    )
}

export default Final


// clock display
// control button
// info bar