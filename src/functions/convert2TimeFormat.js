

const pad = (time) => {
    if(time < 10) {
        return '0' + time;
    }

    else return time;
}

export const  convert2TimeFormat = (time) => {
    
    let givenTime;
    if(time < 999) {
        givenTime = time;
    }else { 
        givenTime = time/1000;
    }


    var hour = (givenTime/3600).toFixed(0);
    givenTime  = givenTime%3600;
    var min = Math.floor(givenTime/60);
    givenTime  = Math.floor(givenTime%60);
    
    return pad(hour) + ":" + pad(min) + ":" + pad(givenTime);
};