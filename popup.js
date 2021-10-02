
const mimicBtn = document.querySelector('button');
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

const mimicBtnHandler = () => {
  toggleBtn(mimicBtn);
  // runContentJs();
};

mimicBtn.addEventListener('click', mimicBtnHandler);
