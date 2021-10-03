const mimicBtn = document.getElementById('mimicBtn');

const configObj = {
  active: true,
  currentWindow: true,
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

mimicBtn.addEventListener('click', mimicBtnHandler);
