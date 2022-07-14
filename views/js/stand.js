import { readFromLS, writeToLS } from './utilities/localStorage.js';

document.getElementById('play-game-button').addEventListener('click', () => {
  onClickPlayGame();
});

function saveUserDataToBrowser() {
  const day = document.getElementById('day-input').value;
  const earnings = document.getElementById('earnings-input').value;
  const addCount = document.getElementById('earnings-input').value;
  const addCorrect = document.getElementById('earnings-input').value;
  const subCount = document.getElementById('earnings-input').value;
  const subCorrect = document.getElementById('earnings-input').value;
  const mulCount = document.getElementById('earnings-input').value;
  const mulCorrect = document.getElementById('earnings-input').value;

  writeToLS('day', day);
  writeToLS('earnings', earnings);
  writeToLS('addCount', addCount);
  writeToLS('addCorrect', addCorrect);
  writeToLS('subCount', subCount);
  writeToLS('subCorrect', subCorrect);
  writeToLS('mulCount', mulCount);
  writeToLS('mulCorrect', mulCorrect);
}

async function onClickPlayGame() {
  await saveUserDataToBrowser();

  location.href = 'game.html';
}
