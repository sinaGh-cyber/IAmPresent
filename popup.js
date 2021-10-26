const mimicBtn = document.getElementById('mimicBtn');
const NONE = 'none';
const MIMIC_BTN_ON = 'mimicing...';
const MIMIC_BTN_OFF = 'mimic stop !';

const configObj = {
  active: true,
  currentWindow: true,
};
const processMessagHandler = (masseages) => {
  for (message in masseages) {
    if (masseages[message] === NONE) return;
    else if (masseages[message] === MIMIC_BTN_ON) {
      if (mimicBtn.classList.contains('bg-red')) {
        mimicBtn.classList.replace('bg-red', 'bg-green');
        mimicBtn
          .querySelector('i')
          .classList.replace('fa-toggle-off', 'fa-toggle-on');
      }
    } else if (masseages[message] === MIMIC_BTN_OFF) {
      mimicBtn.classList.replace('bg-green', 'bg-red');
      mimicBtn
        .querySelector('i')
        .classList.replace('fa-toggle-on', 'fa-toggle-off');
    }
  }
};
const sendStatuusRequst = (tabs) => {

  const msg = {};
  msg.query = 'giv me your status...';
  chrome.tabs.sendMessage(tabs[0].id, msg);
};
// console.log(mimicBtn);
const toggleBtn = (Btn) => {
  if (Btn.classList.contains('bg-red')) {
    Btn.classList.replace('bg-red', 'bg-green');
    Btn.querySelector('i').classList.replace('fa-toggle-off', 'fa-toggle-on');
    return;
  }

  Btn.classList.replace('bg-green', 'bg-red');
  Btn.querySelector('i').classList.replace('fa-toggle-on', 'fa-toggle-off');
};

const sendCurentStatus = (Btn, tabs) => {
  console.log('sendCurentStatus-Btn:', Btn, 'sendCurentStatus-tab:', tabs[0]);
  const msg = {};
  msg[Btn.id] = Btn.className;
  console.log(msg);

  chrome.tabs.sendMessage(tabs[0].id, msg);
};

const runContentJs = (Btn) => {
  console.log('runContentJs', Btn);
  chrome.tabs.query(configObj, sendCurentStatus.bind(null, Btn));
};

const mimicBtnHandler = () => {
  toggleBtn(mimicBtn);
  runContentJs(mimicBtn);
};
chrome.tabs.query(configObj, sendStatuusRequst);
mimicBtn.addEventListener('click', mimicBtnHandler);
chrome.runtime.onMessage.addListener(processMessagHandler);
