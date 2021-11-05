import React, {useState, useEffect} from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {convert2TimeFormat} from '../../../functions/convert2TimeFormat';
import Average from './../../atom/average'
import './style.css';


const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: 3,
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      borderRadius: 3,
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });



function Info({newTime,aditionalTime, changeCountDownTime}) {

    const classes = useStyles();
    const [list10, setList10] = useState([
        
    ]);
    const [best , setBest] = useState(list10.length > 1 ? list10[0]     : 0);
    const [five , setFive] = useState(list10.length > 4 ? (list10[0]+list10[1]+list10[2]+list10[3]+list10[4])/5 : 0);
    const [ten , setTen] = useState(list10.length > 9 ? (list10[0]+list10[1]+list10[2]+list10[3]+list10[4]+
                                    list10[6]+list10[7]+list10[8]+list10[9])/10 : 0);

    useEffect(() => {
        if(newTime > 0) {

            list10.push(newTime);
            list10.sort(function(a, b){return a - b});
            if(list10.length > 10) {
                setList10((list10) => list10.slice(0,10));
            }
            setBest(list10[0]);

            if(list10.length > 4) {
                
                setFive((list10[0]+list10[1]+list10[2]+list10[3]+list10[4])/5);
            }
            if(list10.length > 9) {
                setTen((list10[0]+list10[1]+list10[2]+list10[3]+list10[4]+
                    list10[6]+list10[7]+list10[8]+list10[9])/10);
            } 
        }

    },[newTime])

    const handleRemove = (id) => {
        const newList = [];
        list10.map((val,idx) => {
            if(idx !== id) {
                newList.push(val);
            }
        })
        var length = newList.length;
        if(length > 0) {
            setBest(newList[0]);
        } else {
            setBest(0);
        }

        if(length > 4) {
                
            setFive((newList[0]+newList[1]+newList[2]+newList[3]+newList[4])/5);
            
        }else { setFive(0); }
        if(length > 9) {
            setTen((newList[0]+newList[1]+newList[2]+newList[3]+newList[4]+
                newList[6]+newList[7]+newList[8]+newList[9])/10);
        } else { setTen(0); }

        setList10(newList);
    }

    const topTenList = list10.map((time,idx) => 
    
        <li className="info-list" key={idx}>
            <button className="info-list-button" key={idx} type="button" onClick={()=>handleRemove(idx)} >
                <CancelIcon style={{ fontSize: 23 }} />
            </button>
            <span className="info-list-time">{convert2TimeFormat(time)}</span>
        </li>
    );
    
    const [additionalTime, setAdditionalTime] = useState(aditionalTime);
    const onChange = (e) => {
        setAdditionalTime(e.target.value);
        changeCountDownTime(e.target.value);
    }

    const checkedChange = (e) => {
        console.log(e.target.checked);
        if(e.target.checked === false) {
            setAdditionalTime(0);
            changeCountDownTime(0);
        } else { 
            setAdditionalTime(10);
            changeCountDownTime(10);
        }
    } 
    
    return (
        <div className="info-main">
            <ul className="info-topTen">
                {topTenList}
            </ul>
            <div className="info-value-average">
                
                <div className="info-extraTime">
                    
                    <FormControlLabel
                        control={
                            <Checkbox
                            checked={additionalTime > 0 ? true : false}
                            onChange={checkedChange}
                            name="checkedB"
                            color="primary"
                            checkedIcon={<span className={(classes.icon, classes.checkedIcon)} />}
                            icon={<span className={classes.icon} />}
                            />
                        }
                        label="Observation Time"
                    /> 

                    {additionalTime ? 
                        <div className="extraTime-section">
                            <select className="selectTime" name="extraTime" id="extraTime" value={additionalTime} onChange={onChange}>
                                <option className="timeOption"  value="10">10s</option>
                                <option className="timeOption" value="15">15s</option>
                                <option className="timeOption" value="20">20s</option>
                            </select>
                        </div> : null
        
                    }
                </div>

                <div className="info-average">
                    <Average best={best} five={five} ten={ten}/>
                </div>

            </div>
        </div>
    )
}

export default Info
