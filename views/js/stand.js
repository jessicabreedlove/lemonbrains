import { readFromLS, writeToLS } from './utilities/localStorage.js';

// First, let's load any of the locally stored data
loadLocallyStoredData();

document.getElementById('play-game-button').addEventListener('click', () => {
  onClickPlayGame();
});

function saveUserDataToBrowser() {
  let day = document.getElementById('day-input').value;
  const earnings = document.getElementById('earnings-input').value;
  const addCount = document.getElementById('addCount').value;
  const addCorrect = document.getElementById('earnings-input').value;
  const subCount = document.getElementById('subCount').value;
  const subCorrect = document.getElementById('earnings-input').value;
  const mulCount = document.getElementById('mulCount').value;
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

  console.log(`Add count is: ${addCount}`);
}

async function onClickPlayGame() {
  await saveUserDataToBrowser();
  location.href = 'game.html';
}

function loadLocallyStoredData() {
  const day = readFromLS('numberOfDay');
  const addCount = readFromLS('addCount');
  const subCount = readFromLS('subCount');
  const mulCount = readFromLS('mulCount');

  document.getElementById('day-input').value = day;
  document.getElementById('addCount').value = addCount;
  document.getElementById('subCount').value = subCount;
  document.getElementById('mulCount').value = mulCount;
}
