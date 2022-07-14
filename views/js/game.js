import Zombie from './sprites/zombie.js';
import Quiz from './quiz.js';
import ZombieFactory from './zombieFactory.js';
import { readFromLS, writeToLS } from './utilities/localStorage.js';
import Day from './day.js';

export default class Game {
  updateInterval;
  // listOfZombies = [];
  zombieFactory;
  day;

  constructor() {
    this.zombieFactory = new ZombieFactory();
  }

  create() {
    // Initialize the settings
    const difficulty = readFromLS('difficulty');
    const lengthOfDay = readFromLS('lengthOfDay');

    // Set the time left
    document.getElementById('day-time-left').innerHTML = lengthOfDay;

    // Hide the main menu
    document.getElementById('menu-buttons').style.display = 'none';

    // Create the day
    let numberOfDay = readFromLS('numberOfDay');

    if (!numberOfDay) {
      numberOfDay = 1;
    }

    console.log(`The day is: ${numberOfDay}`);

    this.day = new Day();
    this.day.initialize(numberOfDay);

    // Show the quiz
    document.getElementById('quiz').style.display = 'block';

    // Create the quiz
    let quiz = new Quiz(difficulty, this.zombieFactory);
    quiz.createQuestion();

    // Set the update interval
    this.updateInterval = setInterval(() => {
      this.update();
    }, 1000);
  }

  update() {
    // Update the day
    this.day.updateUI();

    // Check if end of day
    const endOfDay = this.day.endOfDay();
    if (endOfDay) {
      this.endDay();
      return;
    }

    // Check if game over
    this.zombieFactory.listOfZombies.forEach((zombie) => {
      let zombiePosition = zombie.getXCoordinate();
      if (zombiePosition < -70) {
        this.gameOver();
      }
    });

    // TODO how about, the more days, the more zombies spawn?
    // If it is infinite, the zombies have a 1 in 3 chance of spawning

    // Check if we should spawn a zombie (random. More chance the more difficult)
    const chanceOfSpawning = this.configureZombieSpawnRate();
    const randomInt = Math.floor(Math.random() * chanceOfSpawning); // 1 in 3 chance
    if (randomInt == 0) {
      // If we spawn a zombie, call the zombie factory
      this.zombieFactory.spawnZombie(
        this.zombieFactory.listOfZombies,
        readFromLS('zombie-speed')
      );
    }
  }

  configureZombieSpawnRate() {
    const numberOfDay = Number(readFromLS('numberOfDay'));

    if (
      numberOfDay == 1 ||
      numberOfDay == 2 ||
      numberOfDay == 3 ||
      numberOfDay == 4
    ) {
      // 1 in 4 chance of spawning
      return 3;
    }

    if (numberOfDay === 5 || numberOfDay === 6) {
      // 1 in 3 chance of spawning
      return 2;
    }

    if (numberOfDay === 7 || numberOfDay === 8 || numberOfDay === 9) {
      // 1 in 2 chance of spawning
      return 1;
    }

    if (numberOfDay >= 10) {
      // 100 chance of spawning
      return 0;
    }

    // Infinite time defaults to 1 in 3 chance
    return 2;
  }

  endDay() {
    // Clear the update interval
    clearInterval(this.updateInterval);

    // Stop the zombies from moving by removing their walking class
    this.pauseZombies();

    document.getElementById('quiz').style.display = 'none';

    // Quench all of the remaining zombies
    const numberOfZombies = this.zombieFactory.listOfZombies.length;
    for (let i = 0; i < numberOfZombies; i++) {
      this.zombieFactory.quenchZombie();
    }

    // TODO To start a new day, I wonder if I should add a click listener to the button in the end of day div
    // in the main function.
    document.getElementById('end-of-day-div').style.display = 'block';
  }

  gameOver() {
    // Clear the update interval
    clearInterval(this.updateInterval);

    // Stop the zombies from moving by removing their walking class
    this.pauseZombies();

    document.getElementById('quiz').style.display = 'none';

    // Show Game Over
    document.getElementById('game-over-div').style.display = 'block';
  }

  pauseZombies() {
    this.zombieFactory.listOfZombies.forEach((zombie) => {
      let htmlElement = zombie.canvas;
      htmlElement.classList.remove('walking');
    });
  }

  tryAgain() {
    location.reload();
  }
}
