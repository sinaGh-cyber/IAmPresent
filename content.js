console.log('I Am Presnt is running...');
const MIMIC = 'mimicBtn';
const ON = 'bg-green';
const OFF = 'bg-red';
setTimeout(function () {
  console.log('timeout running');

  const messages = document
    .getElementById('chat-messages')
    .querySelectorAll('p');

  const textInput = document.getElementById('message-input');
  const sendBtn = document.querySelector('form button');

  console.log(sendBtn);
  console.log(textInput);
  console.log(messages);

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

  chrome.runtime.onMessage.addListener(processMessagHandler);
}, 20000);
