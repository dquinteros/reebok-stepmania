// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const posibleViews = [
  { name: 'start', function: startLoop },
  { name: 'video', function: video },
  { name: 'guide', function: () => null },
  { name: 'wait', function: wait },
  { name: 'game', function: game },
  { name: 'end', function: end }
]

const gameState = {
  view: posibleViews[0],
  viewCount: 0,
  score: 0,
  lockedKey: ''
}

function setup() {
  document.getElementById('start').style.display = 'inherit';
  document.getElementById('video').style.display = 'none';
  document.getElementById('guide').style.display = 'none';
  document.getElementById('wait').style.display = 'none';
  document.getElementById('game').style.display = 'none';
  document.getElementById('end').style.display = 'none';
  startLoop();
  gameState.score = 0;
  gameState.lockedKey = '';
}

function nextView() {
  gameState.viewCount = gameState.viewCount === 5 ? 0 : gameState.viewCount + 1;
  document.getElementById(gameState.view.name).style.display = 'none';
  gameState.view = posibleViews[gameState.viewCount];
  document.getElementById(gameState.view.name).style.display = 'inherit';
  gameState.view.function();
}

function startLoop() {
  gameState.score = 0;
  document.getElementById('ftext').style.display = 'block';
  document.getElementById('stext').style.display = 'none';
  const startState = {
    text: 'ftext'
  }
  function intervalFunction() {
    const currentText = document.getElementById(startState.text);
    currentText.style.display = 'none';
    startState.text = startState.text === 'ftext' ? 'stext' : 'ftext';
    const nextText = document.getElementById(startState.text);
    nextText.style.display = 'block';
    if (gameState.view.name !== 'start') {
      console.log('Interval Cleared');
      clearInterval(interval)
    }
  }
  const interval = setInterval(intervalFunction, 5000)
}


function video() {
  document.getElementById("myVideo").currentTime = 0;
  function timeoutFunction() {
    if (gameState.view.name !== 'video') {
      console.log('Timeout Cleared');
      clearTimeout(videoTimeout)
    } else {
      nextView();
    }
  }
  const videoTimeout = setTimeout(timeoutFunction, 14000);
}

function wait() {
  function timeoutFunction() {
    if (gameState.view.name !== 'wait') {
      console.log('Wait Timeout Cleared');
      clearTimeout(waitTimeout)
    } else {
      console.log('Wait Next vIew');
      nextView();
    }
  }
  const waitTimeout = setTimeout(timeoutFunction, 6000);
}

function game() {
  let time = 2000;
  const numberPoints = document.getElementById("points");
  numberPoints.innerText = gameState.score;
  const points = document.getElementById("game__battery");
  points.innerHTML = '';
  function timeoutFunction() {
    if (gameState.view.name !== 'game') {
      console.log('Game Timeout Cleared');
      clearTimeout(gameTimeout)
    } else {
      nextView();
    }
  }

  const timeDiv = document.getElementById("time");

  function setTime() {
    if (gameState.view.name !== 'game') {
      console.log('Time Interval Cleared');
      clearTimeout(timeInterval)
    }
    time = time - 1;
    console.log('time', time % 100)
    const sec = time / 100;
    const remaninder = time % 100;
    const seconds = sec < 10 ? `0${Math.floor(sec)}` : Math.floor(sec);
    const milis = remaninder < 10 ? `0${remaninder}` : remaninder;
    timeDiv.innerText = `${seconds}.${milis}`;
  }

  const timeInterval = setInterval(setTime, 10);
  const gameTimeout = setTimeout(timeoutFunction, 20000);
}

function end() {
  const points = document.getElementById("js-end__score");
  points.innerText = gameState.score;
  function timeoutFunction() {
    if (gameState.view.name !== 'wait') {
      console.log('Video Timeout Cleared');
      clearTimeout(endTimeout)
    } else {
      nextView();
    }
  }
  const endTimeout = setTimeout(timeoutFunction, 30000);
}

function addPoints() {
  if (gameState.view.name === 'game' && gameState.score < 20) {
    gameState.score++;
    const numberPoints = document.getElementById("points");
    numberPoints.innerText = gameState.score;
    const points = document.getElementById("game__battery");
    points.innerHTML = '';
    for (let index = 0; index <= gameState.score; index = index + 2) {
      console.log('HEREE');

      points.innerHTML += '<div class="game__line"></div>'
    }
  }
}


// Define Key listeners
document.addEventListener("keydown", event => {
  if (event.code === 'KeyZ') {
    nextView();
  } else if (event.code === 'KeyQ') {
    if (gameState.lockedKey !== event.code) {
      gameState.lockedKey = event.code;
      addPoints();
    }
  } else if (event.code === 'KeyW') {
    if (gameState.lockedKey !== event.code) {
      gameState.lockedKey = event.code;
      addPoints();
    }
  } else if (event.code === 'KeyE') {
    if (gameState.lockedKey !== event.code) {
      gameState.lockedKey = event.code;
      addPoints();
    }
  } else if (event.code === 'KeyA') {
    if (gameState.lockedKey !== event.code) {
      gameState.lockedKey = event.code;
      addPoints();
    }
  } else if (event.code === 'KeyS') {
    if (gameState.lockedKey !== event.code) {
      gameState.lockedKey = event.code;
      addPoints();
    }
  } else if (event.code === 'KeyD') {
    if (gameState.lockedKey !== event.code) {
      gameState.lockedKey = event.code;
      addPoints();
    }
  } else if (event.code === 'KeyR') {
    gameState.view = posibleViews[0];
    gameState.viewCount = 0;
    gameState.score = 0;
    setup();
  };

  if (gameState.view.name === 'game') {
    const points = document.getElementById("points");
    points.innerText = gameState.score;
  }
});

setup();