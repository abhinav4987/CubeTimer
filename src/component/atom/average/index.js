import React from 'react';
import { convert2TimeFormat } from '../../../functions/convert2TimeFormat';
import './style.css';






function Average({best,ten,five}) {
    
    

    return (
        <div className="info">
            <div className="best">
                <span className="headin">Best Time</span>
                <div className="timeScores">
                    <span className="digits">
                        {best ? convert2TimeFormat(best) : "--:--:--"}
                    </span>
                </div>
            </div>

            <div className="five">
                <span className="headin">Average of Top 5</span>
                <div className="timeScores">
                <span className="digits">
                    {five ? convert2TimeFormat(five) : "--:--:--"}
                </span>
                </div>
            </div>

            <div className="ten">
                <span className="headin">Average of Top 10</span>
                <div className="timeScores">
                <span className="digits">
                    {ten ? convert2TimeFormat(ten) : "--:--:--"}
                </span>
                </div>
            </div>

        </div>
    )
}

export default Average
