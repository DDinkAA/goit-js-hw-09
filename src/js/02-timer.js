import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.classList.add('timer-startbutton');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();

    if (selectedDates[0] <= currentDate) {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

const flatPicker = flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onTimeStart);

refs.startBtn.disabled = true;

let timerId = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onTimeStart() {
  const selectedDate = flatPicker.selectedDates[0];

  timerId = setInterval(() => {
    const startTime = new Date();
    const countdown = selectedDate - startTime;
    refs.startBtn.disabled = true;

    if (countdown < 0) {
      clearInterval(timerId);
      return;
    }
    refs.days.textContent = convertMs(countdown).days;
    refs.hours.textContent = convertMs(countdown).hours;
    refs.minutes.textContent = convertMs(countdown).minutes;
    refs.seconds.textContent = convertMs(countdown).seconds;
  }, 1000);
}
