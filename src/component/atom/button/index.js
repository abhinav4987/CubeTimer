import React from 'react';
import './style.css';

function Button({stop,onClick,time}) {
    return (
        <div>
            <button className="button-main" onClick={onClick}>{
                stop ? 
                    <span className="button-command">Start</span> 
                    : <span className="button-command">Stop</span>
                }
            </button>
        </div>
    )
}

export default Button
