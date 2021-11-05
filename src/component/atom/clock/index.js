import React from 'react'
import {convert2TimeFormat} from '../../../functions/convert2TimeFormat';
import './style.css';

function Clock({time, countingDown}) {
    var classaname;
    if(countingDown === true) {
        classaname = "clock-main red";
    } else {
        classaname = "clock-main";
    }

    

    return (
        <div className={classaname}>
            <h1 className="clock-time">{convert2TimeFormat(time)}</h1>
        </div>
    )
}

export default Clock;

