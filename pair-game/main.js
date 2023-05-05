//Генератор парных чисел
function createNumbersArray(count) {
  let result = [];

  for (let i = 1; i <= count; i++) {
    result.push(i, i);
  }
  return result;
}
//функция для перемешивания массива парных чисел
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
//функция которая объединяет первые две функции
function startGame(count) {
  const arr = createNumbersArray(count);
  return shuffle(arr);
}

document.addEventListener('DOMContentLoaded', function() {
  const buttonAgain = document.getElementById('btn-again');
  const form = document.getElementById('form');
  const buttonStart = document.getElementById('btn-start');
  const input = document.getElementById('input');
  let count = 4;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const value = parseInt(input.value);
    if(!isNaN(value) && value >= 2 && value <= 10 && value % 2 === 0) {
      count = value;
    } else {
      count = 4;
      input.value = count;
    }

    startNewGame();
  })

//функция создания карточки и проверки
  function newCard(number) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = number;

    card.addEventListener('click', function() {
      if(card.classList.contains('success')) {
        return;
      }

      card.classList.add('open');
      const selectedCards = document.querySelectorAll('.card.open');
      if(selectedCards.length === 2) {
        const number1 = selectedCards[0].textContent;
        const number2 = selectedCards[1].textContent;
        if(number1 === number2) {
          selectedCards.forEach(card => {
            card.classList.add('success');
            card.classList.remove('open');
          });
        } else {
          setTimeout(() => {
            selectedCards.forEach(card => {
              card.classList.remove('open');
            });
          }, 1000);
        }
        //Делает кнопку "попробовать еще раз" видимой если все карточки открыты
        const allSuccess = document.querySelectorAll('.card').length === document.querySelectorAll('.card.success').length;
        if(allSuccess) {
          buttonAgain.classList.add('visible');
        }
      }
    });
    document.getElementById('game').append(card);
  }
  //функция запуска новой игры
  function startNewGame() {
    document.getElementById('game').innerHTML = '';
    const shuffledNum = startGame(count);

    shuffledNum.forEach(number => {
      newCard(number);
    });
    buttonAgain.classList.remove('visible');
  }
  //обработчик начала игры после ввода количества карточек в поле
  buttonStart.addEventListener('click', function() {
    startNewGame();
  })
  //обработчик собития который запускает функцию по запуску новой игры после завершения текущей
  buttonAgain.addEventListener('click', function() {
    startNewGame();
  });
})
