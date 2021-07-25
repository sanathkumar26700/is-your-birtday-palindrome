const btn = document.querySelector('#btn--check');
const gif = document.querySelector('#gif');
const date = document.querySelector('#txt--date');
const output = document.querySelector('.txt--output');

btn.addEventListener('click', () => {
    output.innerText = '';
    if (!date.value) {
        output.innerText = `Provide a valid date.`;
    } else {
        gif.style.display = 'block';
        setTimeout(() => {
            gif.style.display = 'none'
        },5000);
        setTimeout(() => callPalindrome(date.value) ,5000);
    }
});


function dateToString(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return date.getFullYear() + '-' + mm + '-' + dd;
}

let today = new Date();
let maxDate = dateToString(today);
date.setAttribute("max", maxDate);
date.setAttribute("value", maxDate);

const findNextPalindrome = (dateList) => {
    let curDate = new Date(dateList.join('-'));
    curDate.setDate(curDate.getDate() + 1);
    // console.log(dateToString(curDate));
    let trueFlag = '',dayCount = 0;
    while(!trueFlag){
        curDate.setDate(curDate.getDate() + 1);
        dayCount++;
        // console.log(dateToString(curDate));
        [trueFlag, palDate] = isPalindrome(dateToString(curDate).split('-'));
    }
    return [trueFlag,palDate,dayCount];
}

const isPalindrome = function (dateList) {
    dateFormats = [
        dateList[1] + dateList[2] + dateList[0],
        dateList[2] + dateList[1] + dateList[0],
        dateList[1] + dateList[2] + dateList[0].substring(2),
        dateList[2] + dateList[1] + dateList[0].substring(2)
    ];
    for(let index=0;index<dateFormats.length;index++) {
        let revstr = dateFormats[index].split('').reverse().join('');
        if(dateFormats[index] === revstr){
            switch(index){
                case 0: console.log('matched'+ index); return ['MM/DD/YYYY',`${dateList[1]}-${dateList[2]}-${dateList[0]}`];
                case 1: console.log('matched'+ index); return [`DD/MM/YYYY`,`${dateList[2]}-${dateList[1]}-${dateList[0]}`];
                case 2: console.log('matched'+ index); return [`MM/DD/YY`,`${dateList[1]}-${dateList[2]}-${dateList[0].substring(2)}`];
                case 3: console.log('matched'+ index); return [`DD/MM/YY`,`${dateList[2]}-${dateList[1]}-${dateList[0].substring(2)}`];
            }
        }
    }
    return ['',''];
}

function callPalindrome(date) {
    let dateVal = (date).split('-');
    let [flagFormat, palDate] = isPalindrome(dateVal);
    // console.log(flagFormat);
    if (flagFormat) {
        output.innerHTML = `Wow! Your birthday is a palindrome in the <span class='highlight'>${flagFormat}</span> format as <span class='highlight'>${palDate}</span>.`;
    }
    else{
        let [dateFormat, nextDate, days] = findNextPalindrome(dateVal);
        output.innerHTML = `Oh no! Your birthday is not a palindrome.\nThe nearest palindrome date is <span class='highlight'>${nextDate}</span> in <span class='highlight'>${dateFormat}</span> format which is <span class='highlight'>${days}</span> days from your birthday.`;
    }
}

