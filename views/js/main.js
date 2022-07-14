import Game from './game.js';
import Options from './options.js';
import LemonadeStand from './sprites/lemonade-stand.js';
import { readFromLS, writeToLS } from './utilities/localStorage.js';

function main() {
  // Set the number of day
  let numberOfDay = readFromLS('numberOfDay');

  if (!numberOfDay) {
    numberOfDay = 1;
  }
  document.getElementById('number-of-days').innerHTML = numberOfDay;

  const options = new Options();

  const game = new Game();

  // Check if we want to display the continue venture button
  if (checkSavedData()) {
    const continueVentureButton = document.getElementById(
      'continue-venture-button'
    );
    continueVentureButton.style.display = 'block';

    continueVentureButton.addEventListener('click', () => {
      options.closeMenu();
      game.create();
    });
  }

  document
    .getElementById('customize-stand-button')
    .addEventListener('click', () => {
      options.renderView();
    });

  document.getElementById('start-game-button').addEventListener('click', () => {
    options.closeMenu();
    // Reset the user's stats
    numberOfDay = 1;
    writeToLS('numberOfDay', numberOfDay);
    game.create();
  });

  document
    .getElementById('close-settings-button')
    .addEventListener('click', () => {
      options.closeMenu();
    });

  document.getElementById('try-again').addEventListener('click', () => {
    game.tryAgain();
  });

  document.getElementById('next-day').addEventListener('click', () => {
    console.log('Starting next day');
    let numberOfDay = Number(readFromLS('numberOfDay'));
    console.log(`The day was: ${numberOfDay}`);
    numberOfDay += 1;
    console.log(`The day is now: ${numberOfDay}`);
    writeToLS('numberOfDay', numberOfDay);
    document.getElementById('end-of-day-div').style.display = 'none';
    game.create();
  });

  document
    .getElementById('save-and-quit-button')
    .addEventListener('click', () => {
      saveAndQuit();
    });

  // Create the lemonade stand
  var lemonadeStand = new LemonadeStand();

  lemonadeStand.image.onload = lemonadeStand.blinkAnimation();
}

function checkSavedData() {
  let numberOfDay = readFromLS('numberOfDay');

  if (numberOfDay <= 1 || !numberOfDay) {
    return false;
  }

  return true;
}

function saveAndQuit() {
  let day = document.getElementById('number-of-days').innerHTML;
  writeToLS('numberOfDay', day);

  // const apiPage = readFromLS('apiPage');
  // location.href = apiPage;

  updateDatabase();
}

function updateDatabase() {
  const apiPage = readFromLS('apiPage');
  const url = apiPage + 'stands/put';

  let jsonData = {
    addCount: '5',
    addCorrect: '0',
    subCount: '0',
    subCorrect: '0',
    mulCount: '0',
    mulCorrect: '0',
    divCount: '0',
    divCorrect: '0',
  };

  const xhttp = new XMLHttpRequest();

  xhttp.open('POST', 'https://lemonbrains.herokuapp.com/stands/put');
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(jsonData);
}

main();
