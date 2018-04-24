require('../src/index');

const user = document.getElementById('userTrigger');
const prog = document.getElementById('progTrigger');
const add = document.getElementById('addTrigger');
const remove = document.getElementById('removeTrigger');

let clickCal = {
  userTriggerListener(event) {
    console.log('this is user trigger!');
    console.log(event);
  },
  progTriggerListener(event) {
    console.log('this is prog trigger!');
    console.log(event);
  }
};

add.addEventListener('click', _ => {
  user.addInteractiveEventListener('click', clickCal, { once: true });
});

remove.addEventListener('click', _ => {
  user.removeInteractiveEventListener('click', clickCal);
});

prog.addEventListener('click', _ => {
  user.click();
});
