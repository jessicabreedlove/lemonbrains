import { readFromLS, writeToLS } from './utilities/localStorage.js';

document.getElementById('play-game-button').addEventListener('click', () => {
  onClickPlayGame();
});

function saveUserDataToBrowser() {
  let day = document.getElementById('day-input').value;
  const earnings = document.getElementById('earnings-input').value;
  const addCount = document.getElementById('earnings-input').value;
  const addCorrect = document.getElementById('earnings-input').value;
  const subCount = document.getElementById('earnings-input').value;
  const subCorrect = document.getElementById('earnings-input').value;
  const mulCount = document.getElementById('earnings-input').value;
  const mulCorrect = document.getElementById('earnings-input').value;

  // We also save the browser location so we can navigate back here
  const apiPage = window.location.href;

  if (day == 0) {
    day = 1;
  }

  writeToLS('numberOfDay', day);
  writeToLS('earnings', earnings);
  writeToLS('addCount', addCount);
  writeToLS('addCorrect', addCorrect);
  writeToLS('subCount', subCount);
  writeToLS('subCorrect', subCorrect);
  writeToLS('mulCount', mulCount);
  writeToLS('mulCorrect', mulCorrect);
  writeToLS('apiPage', apiPage);
}

async function onClickPlayGame() {
  await saveUserDataToBrowser();
  location.href = 'game.html';
}
