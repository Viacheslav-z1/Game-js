window.addEventListener("DOMContentLoaded", () => {
  let $startBrn = document.querySelector("#start"),
    $game = document.querySelector("#game"),
    $time = document.querySelector("#time-header"),
    $scoreHeader = document.querySelector("#result-header"),
    $timeHeader = document.querySelector("#time-header"),
    $inputTime = document.querySelector("#game-time"),
    $timeNumHeader = document.querySelector("#time");

  colors = colorArray = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#3366E6",
    "#999966",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#FF1A66",
    "#E6331A",
    "#4D8000",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#4D8066",
    "#809980",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#99E6E6",
    "#6666FF",
  ];

  let gameHeight = $game.clientHeight,
    gameWidth = $game.clientWidth,
    resultHeader = document.querySelector("#result"),
    allTime = +$inputTime.value,
    score = 0,
    gameInProces = false;

  $game.addEventListener("click", newBox);
  $startBrn.addEventListener("click", startGame);
  $inputTime.addEventListener("input", updateTimeInHeader);

  function startGame() {
    allTime = +$inputTime.value;
    gameInProces = true;
    if (gameInProces) {
      $inputTime.setAttribute('disabled', true);
    }
    hide($startBrn);
    hide($scoreHeader);
    show($timeHeader);
    createBox();
    $game.style.backgroundColor = "#fff";
    startTimer();
  }

  function startTimer() {
    const timer = setInterval(gameTimer, 100);
    function gameTimer() {
      if (allTime <= 0.1) {
        endGame();
        clearInterval(timer);
      } else {
        allTime = allTime - 0.1;
        $timeNumHeader.textContent = allTime.toFixed(1);;
      }
    }
  }

  function updateTimeInHeader() {
    show($time);
    hide($scoreHeader);
    $timeNumHeader.innerHTML = +$inputTime.value;
  }

  function newBox(e) {
    const target = e.target;
    if (target.classList.contains("box")) {
      $game.innerHTML = "";
      createBox();
      score++;
    }
  }

  function endGame() {
    hide($time);
    $game.innerHTML = "";
    $game.style.backgroundColor = "#ccc";
    show($scoreHeader);
    show($startBrn);
    resultHeader.textContent = score;
    $inputTime.removeAttribute('disabled',true)
    score = 0;
    realTime = 0;
    gameInProces = false;
  }

  function createBox() {
    let box = document.createElement("div");
    let boxWidth = getRandomNum(30, 70);
    box.style.position = "absolute";
    box.style.cursor = "pointer";
    box.style.width = box.style.height = boxWidth + "px";
    box.style.top = getRandomNum(0, gameHeight - boxWidth) + "px";
    box.style.left = getRandomNum(0, gameWidth - boxWidth) + "px";
    box.style.backgroundColor = colors[getRandomNum(0, colors.length - 1)];
    $game.append(box);
    box.classList.add("box");
  }

  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function hide(el) {
    el.classList.add("hide");
  }
  
  function show(el) {
    el.classList.remove("hide");
  }
});
