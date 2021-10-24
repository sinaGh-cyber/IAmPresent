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
const PARTICIPATION_RATE = 0.31;
let mimicIntervalID;
const colectedData = [];
let lastExpiredObj = 0;

const getPresentUserNum = (rawString) => {
  const digit = /\b\d{1,3}\b/;
  return +rawString.innerText.match(digit)[0];
};

const sendChatMSg = (msg) => {
  // const evtUp = new KeyboardEvent('keyup');
  // const evtDown = new KeyboardEvent('keydown');

  // textInput.focus();
  textInput.value = msg;
  textInput.innerHTML = msg;
  // textInput.focus();

  // textInput.dispatchEvent(evtUp);
  // textInput.dispatchEvent(evtDown);

  console.log(sendBtn);

  setTimeout(() => {
    console.log('~~~~~~~~~~~~~~~~~~');
    console.log(sendBtn);
    sendBtn.disabled = false;
    sendBtn.querySelector('span').click();
    console.log(sendBtn);
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

const dataDigestor = () => {
  generalScenarioCheck();

  // caseScenarioCheck();
};

const mimicIntervalHandler = () => {
  dataColector();
  dataDigestor();

  // console.log(colectedData);
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
  STATUS = 'mimicing...';
  mimicIntervalID = setInterval(mimicIntervalHandler, 3000);
};

const mimicerStop = () => {
  console.log('mimic stop !');
  STATUS = 'mimic stop !';
  clearInterval(mimicIntervalID);
};

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

const setInintialCunter = () => {
  const presentNum = getPresentUserNum(USERCUNTE);
  if (MESSAGES.length > presentNum) {
    cunter = MESSAGES.length - presentNum - 1;
  } else {
    cunter = 0;
  }
};

setTimeout(function () {
  MESSAGES = document.getElementById('chat-messages').getElementsByTagName('p');
  textInput = document.getElementById('message-input');
  sendBtn = document.querySelector('form button');
  USERCUNTE = document.getElementsByTagName('h2')[2];

  // console.log(sendBtn);
  // console.log(textInput);
  // console.log(USERCUNTE.innerText);
  console.log('ready to use:');
  setInintialCunter();

  chrome.runtime.onMessage.addListener(processMessagHandler);
}, 20000);
