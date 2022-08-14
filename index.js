let i = 0;

var hours = document.querySelectorAll('.timer-section input')[0].value;
var minutes = document.querySelectorAll('.timer-section input')[1].value;
var seconds = document.querySelectorAll('.timer-section input')[2].value;

document.querySelector('circle').style.strokeDasharray = 782;
document.querySelector('circle').style.strokeDashoffset = 781;

const sleep = (ms) => new Promise( (resolve)=> setTimeout(resolve, ms));

function checkEmptyInput(element){
    if(element === ''){
        return element = '00' ;
    }
    return element ;
}

function checkDigits(el){
    if(isNaN(el.value)){
        el.value = '';
    }
    else{
        if ((Number(el.value) < 10) &&  (el.value !== "0" + Number(el.value)) ){
            el.value = '0'+ el.value;
        }
    }
}

function setTime(){
    if(Number(seconds) > 0){
        if (Number(seconds) < 11){
            seconds ='0' + (Number(seconds) - 1) ; 
        }
        else{
            seconds = Number(seconds) - 1 ; 
        }
    }
    if((Number(seconds) === 0) && Number(minutes) !== 0){
        seconds = 59 ;
        if (Number(minutes) < 11){
            minutes ='0' + (Number(minutes) - 1) ; 
        }
        else{
            minutes = Number(minutes) - 1 ; 
        }      
    }
    if((Number(seconds) === 0) && (Number(minutes) === 0) && Number(hours) !== 0){
        minutes = 59 ;
        if (Number(hours) < 11){
            hours ='0' + (Number(hours) - 1) ; 
        }
        else{
            hours = Number(hours) - 1 ; 
        }      
    }
    document.querySelector('.timer-circle-text').innerHTML = checkEmptyInput(hours) + ' : ' + checkEmptyInput(minutes) + ' : ' + checkEmptyInput(seconds) ;
}

var started = false ;

document.querySelector('.start-btn').addEventListener('click',async()=>{
    if (!started){
        started = true ;
        hours = document.querySelectorAll('.timer-section input')[0].value;
        minutes = document.querySelectorAll('.timer-section input')[1].value;
        seconds = document.querySelectorAll('.timer-section input')[2].value;
    
        var totalSeconds = (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);

        document.querySelector('.timer-circle-text').innerHTML = checkEmptyInput(hours) + ' : ' + checkEmptyInput(minutes) + ' : ' + checkEmptyInput(seconds) ;
        
        if(totalSeconds !== 0){
            document.querySelector('circle').style.strokeDashoffset = 781;
            document.querySelector('circle').style.animationName = "countdown"; 
            document.querySelector('circle').style.animationDuration = totalSeconds + 1 + 's'; 
            for (i=totalSeconds ; i>0 ; i--){
                setTime();
                await sleep(1000);
            }
            new Audio("alarm.mp3").play();
            document.querySelector('.timer-circle-text').innerHTML = 'Finish!';
            document.querySelector('circle').style.strokeDashoffset = 1;
            document.querySelector('circle').style.animationName = ""; 
            document.querySelector('circle').style.animationDuration = 0; 
        }
        started = false ;    
    }
});
