import Zombie from './sprites/zombie.js';

export default class ZombieFactory {
  listOfZombies = [];

  createZombie(newZombieName) {
    return new Zombie(newZombieName);
  }

  createNewZombieName(listOfZombies) {
    let lastZombieCreated = listOfZombies[listOfZombies.length - 1];
    let lastZombieName = '.zombie1';
    if (lastZombieCreated) {
      lastZombieName = lastZombieCreated.canvasQuery;
    }
    let numberOfLastZombie = lastZombieName.slice(7, lastZombieName.length);
    const numberOfNewZombie = Number(numberOfLastZombie) + 1;
    const nameOfNewZombie = '.zombie' + numberOfNewZombie;
    return nameOfNewZombie;
  }

  createHtmlTag(newZombieName) {
    const playingField = document.getElementById('playing-field');
    const newZombieNameWithoutThePeriod = newZombieName.slice(
      1,
      newZombieName.length
    );
    const newHtml =
      '<canvas class="zombie ' +
      newZombieNameWithoutThePeriod +
      '" width="500px" height="500px"></canvas>';

    playingField.insertAdjacentHTML('beforeend', newHtml);
  }

  spawnZombie(listOfZombies, zombieSpeed) {
    const newZombieName = this.createNewZombieName(listOfZombies);

    this.createHtmlTag(newZombieName);

    const newZombie = this.createZombie(newZombieName);

    newZombie.image.onload = newZombie.walkLeft();

    const newZombieNameWithoutThePeriod = newZombieName.slice(
      1,
      newZombieName.length
    );

    document
      .getElementsByClassName(newZombieNameWithoutThePeriod)[0]
      .classList.add(zombieSpeed);

    listOfZombies.push(newZombie);
  }

  quenchZombie() {
    // Remove the first zombie in the list from the game
    if (this.listOfZombies.length >= 1) {
      const zombieName = this.listOfZombies[0].canvasQuery;
      const zombieNameWithoutPeriod = zombieName.slice(1, zombieName.length);
      const zombieToQuench = document.getElementsByClassName(
        zombieNameWithoutPeriod
      )[0];

      // Remove the zombie from the html
      zombieToQuench.remove();
      // Remove the zombie from the list
      this.listOfZombies.shift();
    }
  }
}
