console.log('I Am Presnt is running...');

const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';
let cunter;
let MESSAGES;
let USERCUNTE;
const colectedData = [];
let lastExpiredObj = 0;

const dataColector = () => {
  console.dir('*********');
  console.dir(MESSAGES);
  console.dir('*********');
  for (let i = cunter; i < MESSAGES.length; i++) {
    console.dir('*********');
    console.dir(MESSAGES[i]);
    console.dir(i);
    console.dir('*********');

    const dataObj = {
      creationTime: getTime(),
      text: MESSAGES[i].innerHTML,
    };

    colectedData.push(dataObj);
  }
  cunter = MESSAGES.length;
};

const checkGeneralSimilarity = (lastEpierdObj) => {
  const textCunts = {};
  for (let i = lastEpierdObj; i < colectedData.length - 1; i++) {
    let expirDate = getTime() - setTime(0, 2);

    if (colectedData[i].creationTime < expirDate) lastExpiredObj = i;

    textCunts[colectedData[i].text].text = textCunts[colectedData[i].text].text;
    textCunts[colectedData[i].text].itration = (textCunts[colectedData[i].text].itration || 0) + 1 ;
    textCunts[colectedData[i].text].idx = i;
  }

  for(let obj in textCunts) {
    if (obj.itration > getPresentUserNum(USERCUNTE) * 0.6) {
      console.log(obj.text);
      lastExpiredObj = obj.idx;
  }
}
};

const dataDigestor = () => {
  checkGeneralSimilarity();
  // checkNumberSimilarity();
  // checkPositivSimilarity();
  // checkNegativSimilarity();
  // checkIMTierdSimilarity();
  // checkHelloSimilarity();
};

const mimicIntervalHandler = () => {
  dataColector();
  dataDigestor();

  console.log(colectedData);
};

const getPresentUserNum = (rawString) => {
  const digit = /\b\d{1,3}\b/;
  return +rawString.innerText.match(digit)[0];
};

const getTime = () => {
  let date = new Date();
  return (
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds() +
    date.getMilliseconds() / 1000
  );
};

const setTime = (hour = 0, minute = 0, second = 0, miliSecond = 0) => {
  return hour * 3600 + minute * 60 + second + miliSecond / 1000;
};

const mimicer = () => {
  console.log('mimicing...');
  setInterval(mimicIntervalHandler, 3000);
};

const mimicerStop = () => {
  console.log('mimic stop !');
  clearInterval(mimicIntervalHandler);
};

const processMessagHandler = (masseages) => {
  for (message in masseages) {
    if (message === MIMIC && masseages[message].includes(ON)) mimicer();
    else if (message === MIMIC && masseages[message].includes(OFF))
      mimicerStop();
  }
};

const setInintialCunter = (userCunte, messages) => {
  const presentNum = getPresentUserNum(userCunte);
  if (messages.length > presentNum) {
    cunter = messages.length - presentNum - 1;
  } else {
    cunter = messages.length;
  }
};

setTimeout(function () {
  console.log('timeout running');

  const messages = document
    .getElementById('chat-messages')
    .getElementsByTagName('p');
  const textInput = document.getElementById('message-input');
  const sendBtn = document.querySelector('form button');
  const userCunte = document.getElementsByTagName('h2')[2];

  MESSAGES = messages;
  USERCUNTE = userCunte;

  console.log(sendBtn);
  console.log(textInput);
  console.log(userCunte.innerText);

  setInintialCunter(userCunte, messages);

  chrome.runtime.onMessage.addListener(processMessagHandler);
}, 20000);
