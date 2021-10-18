console.log('I Am Presnt is running...');

const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';
let cunter;
let MESSAGES;
let USERCUNTE;
const PARTICIPATION_RATE = 0.25;
let mimicIntervalID;
const colectedData = [];
let lastExpiredObj = 0;

const sendStatusToPopup = () => {};

const dataColector = () => {
  console.dir('*********');
  console.dir(MESSAGES);
  console.dir('*********');
  for (let i = cunter; i < MESSAGES.length; i++) {
    const dataObj = {
      creationTime: getTime(),
      text: MESSAGES[i].innerHTML,
    };

    colectedData.push(dataObj);
  }
  cunter = MESSAGES.length;
};

const checkGeneralSimilarity = (lastEpierdObj) => {
  console.log('I m running: checkGeneralSimilarity ');
  const textCunts = {};
  for (let i = lastExpiredObj; i < colectedData.length; i++) {
    console.log('I m running: checkGeneralSimilarity > loop');
    let expirDate = getTime() - setTime(0, 2);

    if (colectedData[i].creationTime < expirDate) lastExpiredObj = i;
    textCunts[colectedData[i].text] = textCunts[colectedData[i].text] || {};
    textCunts[colectedData[i].text].text = colectedData[i].text;
    textCunts[colectedData[i].text].itration =
      (textCunts[colectedData[i].text].itration || 0) + 1;
    textCunts[colectedData[i].text].idx = i;
  }

  console.log('##############');
  console.log('textCunts:');
  console.log(textCunts);
  console.log('##############');

  for (let obj in textCunts) {
    if (
      textCunts[obj].itration >
      getPresentUserNum(USERCUNTE) * PARTICIPATION_RATE
    ) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@');
      console.log('^^^^^^^^^^^^^^^^^^^');
      console.log(textCunts[obj].text);
      console.log('^^^^^^^^^^^^^^^^^^^');
      console.log('@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      
      lastExpiredObj = textCunts[obj].idx;
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
  mimicIntervalID = setInterval(mimicIntervalHandler, 3000);
  sendStatusToPopup(MIMIC, ON);
};

const mimicerStop = () => {
  console.log('mimic stop !');
  clearInterval(mimicIntervalID);
};

const processMessagHandler = (masseages) => {
  for (message in masseages) {
    if (message === MIMIC && masseages[message].includes(ON)) mimicer();
    else if (message === MIMIC && masseages[message].includes(OFF))
      mimicerStop();
  }
};

const setInintialCunter = () => {
  const presentNum = getPresentUserNum(USERCUNTE);
  if (MESSAGES.length > presentNum) {
    cunter = MESSAGES.length - presentNum - 1;
  } else {
    cunter = 0;
  }
};

setTimeout(function () {
  console.log('timeout running');

  MESSAGES = document.getElementById('chat-messages').getElementsByTagName('p');
  const textInput = document.getElementById('message-input');
  const sendBtn = document.querySelector('form button');
  USERCUNTE = document.getElementsByTagName('h2')[2];

  console.log(sendBtn);
  console.log(textInput);
  console.log(USERCUNTE.innerText);

  setInintialCunter();

  chrome.runtime.onMessage.addListener(processMessagHandler);
}, 20000);
