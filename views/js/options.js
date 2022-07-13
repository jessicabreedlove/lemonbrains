import { readFromLS, writeToLS } from './utilities/localStorage.js';
export default class Options {
  constructor() {
    this.veryEasy = document.getElementById('very-easy');
    this.easy = document.getElementById('easy');
    this.medium = document.getElementById('medium');
    this.hard = document.getElementById('hard');
    this.extreme = document.getElementById('extreme');

    this.difficultySettings = [
      this.veryEasy,
      this.easy,
      this.medium,
      this.hard,
      this.extreme,
    ];

    this.slow = document.getElementById('slow');
    this.normal = document.getElementById('normal');
    this.fast = document.getElementById('fast');

    this.speedSettings = [this.slow, this.normal, this.fast];

    this.thirtySeconds = document.getElementById('thirtySeconds');
    this.oneMinute = document.getElementById('oneMinute');
    this.twoMinutes = document.getElementById('twoMinutes');
    this.infinite = document.getElementById('infinite');

    this.lengthOfDaySettings = [
      this.thirtySeconds,
      this.oneMinute,
      this.twoMinutes,
      this.infinite,
    ];

    this.addition = document.getElementById('addition');
    this.subtraction = document.getElementById('subtraction');
    this.multiplication = document.getElementById('multiplication');
    this.all = document.getElementById('all');

    this.questionTypeSettings = [
      this.addition,
      this.subtraction,
      this.multiplication,
      this.all,
    ];
  }

  renderView() {
    this.initializeSettings();
    if (
      document.getElementById('options-menu').style.display == 'none' ||
      document.getElementById('options-menu').style.display == ''
    ) {
      document.getElementById('options-menu').style.display = 'flex';
      return;
    }
    this.closeMenu();
  }

  closeMenu() {
    document.getElementById('options-menu').style.display = 'none';
    this.saveSettings();
  }

  saveSettings() {
    // Set the settings in Local Storage
    this.difficultySettings.forEach((radioButton) => {
      if (radioButton.checked) {
        writeToLS('difficulty', radioButton.value);
      }
    });

    this.speedSettings.forEach((radioButton) => {
      if (radioButton.checked) {
        writeToLS('zombie-speed', radioButton.value);
      }
    });

    this.lengthOfDaySettings.forEach((radioButton) => {
      if (radioButton.checked) {
        writeToLS('lengthOfDay', radioButton.value);
      }
    });

    this.questionTypeSettings.forEach((radioButton) => {
      if (radioButton.checked) {
        writeToLS('questionTypes', radioButton.value);
      }
    });
  }

  initializeSettings() {
    this.difficultySettings.forEach((radioButton) => {
      const settingSelected = readFromLS('difficulty');
      if (settingSelected == radioButton.value) {
        radioButton.checked = true;
      }
    });

    this.speedSettings.forEach((radioButton) => {
      const settingSelected = readFromLS('zombie-speed');
      if (settingSelected == radioButton.value) {
        radioButton.checked = true;
      }
    });

    this.lengthOfDaySettings.forEach((radioButton) => {
      const settingSelected = readFromLS('lengthOfDay');
      if (settingSelected == radioButton.value) {
        radioButton.checked = true;
      }
    });

    this.questionTypeSettings.forEach((radioButton) => {
      const settingSelected = readFromLS('questionTypes');
      if (settingSelected == radioButton.value) {
        radioButton.checked = true;
      }
    });
  }
}
