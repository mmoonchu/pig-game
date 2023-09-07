'use strict';

/// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
/// "." for classes, "#" for id's
const score1El = document.getElementById('score--1');
/// same as above, but maybe faster when dealing w/ lots of elements
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

/// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// const removeClass = function (player, class) {

// }

/// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    /// 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    /// 2. Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    /// 3. Roll 1 ? Switch to next player : Add to current score
    if (dice !== 1) {
      currentScore += dice;
      // current0El.textContent = currentScore; /// CHANGE LATER for p1 v p2
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    /// 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    /// 2. Player score >= 100 ? End game : Switch to next player
    if (scores[activePlayer] >= 30) {
      /// Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      /// Didn't finish, switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  /// 1. Reset scores, current scores, starting player
  currentScore = 0;
  scores[0] -= scores[0];
  scores[1] -= scores[1];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;

  /// 2. Hide die, winner filter
  diceEl.classList.add('hidden');

  if (playing === false) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
  }

  //   document
  //     .querySelector(`.player--${activePlayer}`)
  //     .classList.remove('player--winner');
  //   document
  //     .querySelector(`.player--${activePlayer}`)
  //     .classList.add('player--active');

  if (!player0El.classList.contains('player--active')) {
    switchPlayer();
  }
  /// 3.
  playing = true;
});
