console.log('I Am Presnt is running...');
const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';

// const masseges = document.getElementById('chat-messages').querySelectorAll('p');
// const textInput = document.getElementById('message-input');
// const sendBtn = document.getElementById('tippy-92');

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

chrome.runtime.onMessage.addListener(processMessagHandler);
