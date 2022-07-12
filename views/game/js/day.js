export default class Day {
  initialize(numberOfDay) {
    document.getElementById('number-of-days').innerHTML = numberOfDay;
  }

  updateUI() {
    if (document.getElementById('day-time-left').innerHTML == 'infinite') {
      // If we are dealing with infinite time
      return;
    }
    let timeLeft = Number(document.getElementById('day-time-left').innerHTML);
    timeLeft -= 1;
    document.getElementById('day-time-left').innerHTML = timeLeft;
  }

  endOfDay() {
    if (document.getElementById('day-time-left').innerHTML == 'infinite') {
      // If we are dealing with infinite time
      return false;
    }

    let timeLeft = Number(document.getElementById('day-time-left').innerHTML);

    if (timeLeft >= 0) {
      return false;
    }

    return true;
  }
}
