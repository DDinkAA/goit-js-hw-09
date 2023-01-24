import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  console.log(e.currentTarget);

  let firstDelay = e.currentTarget.delay.valueAsNumber;
  const delayStep = e.currentTarget.step.valueAsNumber;
  const promisesAmount = e.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= promisesAmount; position += 1) {
    createPromise(position, firstDelay);
    firstDelay += delayStep;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
