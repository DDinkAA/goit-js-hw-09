function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(getBgColor, 1000);
  startBtn.toggleAttribute('disabled');
  stopBtn.removeAttribute('disabled');
}

function onStop() {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.toggleAttribute('disabled');
}

function getBgColor() {
  body.style.backgroundColor = getRandomHexColor();
}
