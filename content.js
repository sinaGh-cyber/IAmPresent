console.log('I Am Presnt is running...');

const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';
const query = 'query';
let STATUS = 'none';
let sendBtn;
let textInput;
const StatusRequstMsg = 'giv me your status...';
let cunter;
let MESSAGES;
let USERCUNTE;
const PARTICIPATION_RATE = 0.21;
let mimicIntervalID;
const colectedData = [];
let lastExpiredObj = 0;

const getPresentUserNum = (rawString) => {
  const digit = /\b\d{1,3}\b/;
  return +rawString.innerText.match(digit)[0];
};

const sendChatMSg = (msg) => {
  const evtUp = new KeyboardEvent('keydown', {
    code: 'Space',
    charCode: 0,
    bubbles: true,
    cancelable: true,
    composed: true,
    keyCode: 32,
    isTrusted: true,
    key: ' ',
  });

  console.dir(evtUp);
  textInput.focus();
  console.dir(textInput);
  textInput.value = msg;
  textInput.innerHTML = msg;
  console.dir(textInput);
  textInput.focus();
  textInput.click();

  textInput.dispatchEvent(evtUp);

  console.log(sendBtn);

  setTimeout(() => {
    console.log('~~~~~~~~~~~~~~~~~~');
    console.dir(sendBtn);
    sendBtn.disabled = false;
    textInput.dispatchEvent(evtUp);
    sendBtn.click();
    console.dir(sendBtn);
    console.log('~~~~~~~~~~~~~~~~~~');
  }, 5000);
};

const sendCurentStatusToPopup = () => {
  chrome.runtime.sendMessage({
    data: STATUS,
  });
};

const dataColector = () => {
  // console.dir('*********');
  // console.dir(MESSAGES);
  // console.dir('*********');
  for (let i = cunter; i < MESSAGES.length; i++) {
    const dataObj = {
      creationTime: getTime(),
      text: MESSAGES[i].innerHTML,
    };

    colectedData.push(dataObj);
  }
  cunter = MESSAGES.length;
};
// check for itration of a exatly the same message
const generalScenarioCheck = () => {
  const textCunts = {};
  for (let i = lastExpiredObj; i < colectedData.length; i++) {
    let expirDate = getTime() - setTime(0, 2);

    if (colectedData[i].creationTime < expirDate) lastExpiredObj = i;

    textCunts[colectedData[i].text] = textCunts[colectedData[i].text] || {};
    textCunts[colectedData[i].text].text = colectedData[i].text;
    textCunts[colectedData[i].text].itration =
      (textCunts[colectedData[i].text].itration || 0) + 1;
    textCunts[colectedData[i].text].idx = i;
  }

  // console.log('##############');
  // console.log('textCunts:');
  // console.log(textCunts);
  // console.log('##############');

  for (let textObj in textCunts) {
    if (
      textCunts[textObj].itration >
      getPresentUserNum(USERCUNTE) * PARTICIPATION_RATE
    ) {
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@');
      // console.log('^^^^^^^^^^^^^^^^^^^');
      // console.log(textCunts[textObj].text);
      // console.log('^^^^^^^^^^^^^^^^^^^');
      // console.log('@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

      lastExpiredObj = textCunts[textObj].idx;
      sendChatMSg(textCunts[textObj].text);
    }
  }
};

//get 2 arguments, first an arry of same category and secand a callback func to be run if chck scenario matched
const caseScenarioCheck = (scenarioArr, callBackFunc) => {
  let counter = 0;
  for (let i = lastExpiredObj; i < colectedData.length; i++) {
    let expirDate = getTime() - setTime(0, 2);

    if (colectedData[i].creationTime < expirDate) {
      lastExpiredObj = i;
      continue;
    }

    for (let Case of scenarioArr) {
      if (Case === colectedData[i].text) {
        counter++;
        if (counter > getPresentUserNum(USERCUNTE) * PARTICIPATION_RATE) {
          console.log(
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
          );
          console.log(Math.floor(Math.random() * (scenarioArr.length - 1)));
          console.log(
            scenarioArr[Math.floor(Math.random() * (scenarioArr.length - 1))]
          );
          console.log(
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
          );

          lastExpiredObj = i;
          sendChatMSg(
            scenarioArr[Math.floor(Math.random() * (scenarioArr.length - 1))]
          );

          if (callBackFunc) callBackFunc();
        }
      }
    }
  }
};
//put all data that collected in chck for varios check scenario:
const dataDigestor = () => {
  generalScenarioCheck();

  // caseScenarioCheck();
};

const mimicIntervalHandler = () => {
  dataColector();
  dataDigestor();

  // console.log(colectedData);
};
// return todays  elapsed seconds since 00:00
const getTime = () => {
  let date = new Date();
  return (
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds() +
    date.getMilliseconds() / 1000
  );
};
// get nuber of hour, minuts, second and miliSeconds as argument and return equal secondes for arguments
const setTime = (hour = 0, minute = 0, second = 0, miliSecond = 0) => {
  return hour * 3600 + minute * 60 + second + miliSecond / 1000;
};

// mimic crowds actions:
const mimicer = () => {
  console.log('mimicing...');
  STATUS = 'mimicing...';
  mimicIntervalID = setInterval(mimicIntervalHandler, 3000);
};
// clear mimicers interval and stops mimicer:
const mimicerStop = () => {
  console.log('mimic stop !');
  STATUS = 'mimic stop !';
  clearInterval(mimicIntervalID);
};
// process incoming messages from popup.js:
const processMessagHandler = (masseages) => {
  for (message in masseages) {
    if (message === MIMIC && masseages[message].includes(ON)) mimicer();
    else if (message === MIMIC && masseages[message].includes(OFF))
      mimicerStop();
    else if (message === query && masseages[message] === StatusRequstMsg) {
      sendCurentStatusToPopup();
    }
  }
};

// This func in the fist excution of code will determine value of cunter,
// cunter going to be used at dataColector func
const setInintialCunter = () => {
  const presentNum = getPresentUserNum(USERCUNTE);
  if (MESSAGES.length > presentNum) {
    cunter = MESSAGES.length - presentNum - 1;
  } else {
    cunter = 0;
  }
};

// This interVal mackes sure that page is fully loaded:
let InterValID = setInterval(() => {
  if (document.getElementById('chat-messages')) {
    MESSAGES = document
      .getElementById('chat-messages')
      .getElementsByTagName('p');
  }

  textInput = document.getElementById('message-input');
  sendBtn = document.querySelector('form button');
  USERCUNTE = document.getElementsByTagName('h2')[2];

  if (MESSAGES && textInput && sendBtn && USERCUNTE) {
    clearInterval(InterValID);

    console.log(sendBtn);
    console.log(textInput);
    console.log(USERCUNTE.innerText);
    console.log('ready to use:');

    setInintialCunter();
    chrome.runtime.onMessage.addListener(processMessagHandler);

    setTimeout(() => {
      sendChatMSg('.');
      console.dir(textInput);
    }, 20000);
  }
}, 1000);
