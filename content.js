console.log('I Am Presnt is running...');

const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';
let cunter;

const getTime = () => {
  let date = new Date();
  return (
    date.getHours() * 3600 +
    date.getMinutes() * 60 +
    date.getSeconds() +
    date.getMilliseconds() / 1000
  );
};

const getPresentUserNum = (rawString) => {
  const digit = /\b\d{1,3}\b/;
  return rawString.innerText.match(digit)[0].parseInt();
};

const setTime = (hour = 0, minute = 0, second = 0, miliSecond = 0) => {
  return hour * 3600 + minute * 60 + second + miliSecond / 1000;
};

const mimicer = () => {
  console.log('mimicing...');
};

const mimicerStop = () => {
  console.log('mimic stop !');
};

const processMessagHandler = (messages, sender, sendResponse) => {
  for (message in messages) {
    if (message === MIMIC && messages[message].includes(ON)) mimicer();
    else if (message === MIMIC && messages[message].includes(OFF))
      mimicerStop();
  }
};

const setInintialCunter = () => {
  const presentNum = getPresentUserNum(userCunte);
  if (messages.length > presentNum) {
    cunter = messages.length - presentNum - 1;
  } else {
    cunter = 0;
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

  console.log(sendBtn);
  console.log(textInput);
  console.log(userCunte.innerText);

  setInintialCunter();

  setInterval(() => {
    console.log(getPresentUserNum(userCunte));
    console.log(messages);
  }, 5000);

  chrome.runtime.onMessage.addListener(processMessagHandler);
}, 20000);
