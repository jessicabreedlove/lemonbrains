import { readFromLS, writeToLS } from './utilities/localStorage.js';

export default class Quiz {
  DIFFICULTY = 'easy';

  constructor(difficulty, zombieFactory) {
    this.DIFFICULTY = difficulty;

    document.getElementById('submit-button').addEventListener('click', () => {
      this.processUserInput(zombieFactory);
    });

    document
      .getElementById('answer')
      .addEventListener('keypress', function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === 'Enter') {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById('submit-button').click();
        }
      });

    document
      .getElementById('show-answer-button')
      .addEventListener('click', () => {
        this.showAnswer(zombieFactory);
      });
  }

  createQuestion() {
    const minimum = this.createMinimum();
    const maximum = this.createMaximum();
    const int1 = this.generateInteger(minimum, maximum);
    const int2 = this.generateInteger(minimum, int1); // we pass in int1 as the maximum here so we don't have any negative numbers

    const operator = this.createOperator();

    // Render the question
    document.getElementById('int1').innerHTML = int1;
    document.getElementById('operator').innerHTML = operator;
    document.getElementById('int2').innerHTML = int2;
  }

  createOperator() {
    const questionTypes = readFromLS('questionTypes');

    if (questionTypes === 'addition') {
      return '+';
    }

    if (questionTypes === 'subtraction') {
      return '-';
    }

    if (questionTypes === 'multiplication') {
      return 'x';
    }

    const randomInt = Math.floor(Math.random() * 3);
    switch (randomInt) {
      case 0:
        return '+';
      case 1:
        return '-';
      case 2:
        return 'x';
      // case 3:
      //   return '/';
    }
  }

  createMinimum() {
    // TODO Create a minimum based on the difficulty
    if (this.DIFFICULTY == 'easy') {
      return 1;
    }
    return 1;
  }

  createMaximum() {
    // TODO Create a maximum based on the difficulty
    if (this.DIFFICULTY == 'very-easy') {
      return 3;
    } else if (this.DIFFICULTY == 'easy') {
      return 5;
    } else if (this.DIFFICULTY == 'medium') {
      return 10;
    } else if (this.DIFFICULTY == 'hard') {
      return 15;
    } else if (this.DIFFICULTY == 'extreme') {
      return 20;
    }
    return 100;
  }

  generateInteger(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  }

  generateAnswer() {
    // Generate the answer
    let int1 = document.getElementById('int1').innerHTML;
    let operator = document.getElementById('operator').innerHTML;
    let int2 = document.getElementById('int2').innerHTML;
    return this.doArithmetic(int1, int2, operator);
  }

  doArithmetic(int1, int2, operator) {
    switch (operator) {
      case '+':
        return Number(int1) + Number(int2);
      case '-':
        return Number(int1) - Number(int2);
      case 'x':
        return Number(int1) * Number(int2);
      // case '/':
      //   return int1 / int2;
    }
  }

  processUserInput(zombieFactory) {
    const userAnswer = document.getElementById('answer').value;

    // Generate the answer
    let answer = this.generateAnswer();

    if (userAnswer == answer) {
      const operator = document.getElementById('operator').innerHTML;
      console.log(`The operator is: ${operator}`);
      if (operator == '+') {
        console.log('Adding to count');
        this.incrementAddCount();
      } else if (operator == '-') {
        this.incrementSubCount();
      } else if (operator == 'x') {
        this.incrementMulCount();
      }

      document.getElementById('answer').value = '';
      document.getElementById('answer').classList.remove('answer-incorrect');
      document.getElementById('answer').classList.add('answer-correct');
      this.createQuestion(zombieFactory);
      zombieFactory.quenchZombie();
    } else {
      document.getElementById('answer').classList.remove('answer-correct');
      document.getElementById('answer').classList.add('answer-incorrect');
    }
    document.getElementById('answer').focus();
  }

  showAnswer(zombieFactory) {
    let answer = this.generateAnswer();
    document.getElementById('answer').value = answer;
    // TODO Set a quick timeout where it erases everything and gives you a new question
    setTimeout(() => {
      document.getElementById('answer').value = '';
      this.createQuestion(zombieFactory);
    }, 1500);
  }

  incrementAddCount() {
    let addCount = Number(readFromLS('addCount'));
    addCount++;
    writeToLS('addCount', addCount);
  }

  incrementSubCount() {
    let subCount = Number(readFromLS('subCount'));
    subCount++;
    writeToLS('subCount', subCount);
  }

  incrementMulCount() {
    let mulCount = Number(readFromLS('mulCount'));
    mulCount++;
    console.log(`The add count is now: ${mulCount}`);
    writeToLS('mulCount', mulCount);
  }
}
