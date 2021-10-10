console.log('I Am Presnt is running...');

const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';

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
  // sendBtn.click();
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
  console.log(messages);
  console.log(userCunte);

  // setTimeout(() => {
  //   console.log(messages);
  // }, 15000);

  chrome.runtime.onMessage.addListener(processMessagHandler);
}, 20000);
