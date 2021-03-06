//页面加载
window.onload = function () {
  createRandomGrid(2);
  let best = document.getElementsByClassName("best")[0].children[2];
  best.innerText = localStorage.getItem("best");
  newGame();
  //gameOver()
  getReady();
  keyDown();
};

//随机生成格子
function createRandomGrid(num) {
  let gridNum = 0;
  let grid = document.getElementsByClassName("grid");
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].innerText !== "") {
      gridNum = gridNum + 1;
    }
  }
  if (gridNum === 16) {
    return;
  }
  let x = Math.floor(Math.random() * 4) + 1;
  let y = Math.floor(Math.random() * 4) + 1;
  let newGrid = document.getElementsByClassName("grid" + x + y)[0];

  if (!newGrid.innerText) {
    newGrid.style.backgroundColor = "#facfa1";
    newGrid.innerText = num;
  } else {
    createRandomGrid(num);
  }
}

//清除棋板上的方块
function clearGrid() {
  let grid = document.getElementsByClassName("grid");
  let score = document.getElementsByClassName("score")[0].children[2];
  score.innerText = "0";
  for (let i = 0; i < grid.length; i++) {
    grid[i].style.backgroundColor = "#ffffe0";
    grid[i].innerText = "";
  }
}

//new Game重新开始游戏
function newGame() {
  let newGame = document.getElementsByClassName("newgame")[0];
  let best = document.getElementsByClassName("best")[0].children[2];

  newGame.addEventListener(
    "click",
    function () {
      clearGrid();
      createRandomGrid(2);
      localStorage.setItem("best", best.innerText);
      console.log("localStorage", localStorage.getItem("best"));
    },
    false
  );
}
/**
 * 上键 38
 * 下键 40
 * 左键 39
 * 右键 37
 */

//开始游戏
function getReady() {
  window.onkeydown = function (e) {
    keyDown(e.keyCode);
    gameOver();
  };
}

//监听方向键控制方块滑动
function keyDown(keyCode, flag = true) {
  let dire,
    arr,
    signal = 0,
    count = 0;
  switch (keyCode) {
    case 37:
      dire = "left";
      break;
    case 38:
      dire = "up";
      break;
    case 39:
      dire = "right";
      break;
    case 40:
      dire = "down";
      break;
  }
  for (let i = 1; i < 5; i++) {
    if (dire === "up" || dire === "down") {
      arr = document.getElementsByClassName("col" + i);
    } else if (dire === "left" || dire === "right") {
      arr = document.getElementsByClassName("row" + i);
    }
    if (dire === "up" || dire === "left") {
      for (let j = 1; j <= 3; j++) {
        position = j;
        go = howToGo(arr[j], dire, position, flag);
        signal += go;
        if (go > 1) {
          count = count + 1;
        }
      }
    } else if (dire === "right" || dire === "down") {
      for (let j = 2; j >= 0; j--) {
        position = 3 - j;
        go = howToGo(arr[j], dire, position, flag);
        signal += go;
        if (go > 1) {
          count = count + 1;
        }
      }
    }
  }
  if (signal > 0) {
    createRandomGrid(2);
  }
  return count;
}

//方块滑动方式
function howToGo(grid, direction, position, flag) {
  let prevGrid,
    prevGridNum,
    gridNum = 0,
    go;
  prevGrid = getPrevGrid(grid, direction);
  gridNum = getGridNum(grid);
  let score = document.getElementsByClassName("score")[0].children[2];
  let best = document.getElementsByClassName("best")[0].children[2];
  if (prevGrid) {
    prevGridNum = getGridNum(prevGrid);
  } else {
    prevGridNum = "null";
  }

  if (gridNum && !prevGridNum) {
    if (flag) {
      prevGrid.innerHTML = grid.innerHTML;
      prevGrid.style.backgroundColor = numberToColor(gridNum);
      grid.innerText = "";
      grid.style.backgroundColor = "";
    }

    position -= 1;
    if (position) {
      go = howToGo(prevGrid, direction, position, flag);
    }
    return go || 1;
  } else if (gridNum === prevGridNum) {
    gridNum = gridNum + prevGridNum;
    if (flag) {
      let goard = parseInt(score.innerText) + gridNum;
      let bestNum = parseInt(best.innerText);
      score.innerText = goard;
      best.innerText = goard > bestNum ? goard : bestNum;
      prevGrid.innerText = gridNum + "";
      prevGrid.style.backgroundColor = numberToColor(gridNum);
      grid.innerText = "";
      grid.style.backgroundColor = "";
      if (gridNum === 2048) {
        Alert("win");
      }
    }

    return gridNum;
  } else {
    return 0;
  }
}
//返回格子里的数字
function getGridNum(grid) {
  // console.log(parseInt(grid.innerText),"get")
  return parseInt(grid.innerText);
}
//方块在不同方向上的前一个格子
function getPrevGrid(grid, direction) {
  if (direction === "left") {
    let row = grid.previousElementSibling
      ? grid.previousElementSibling.classList[2]
      : "";
    return row && row === grid.classList[2]
      ? grid.previousElementSibling
      : null;
  } else if (direction === "right") {
    let row = grid.nextElementSibling
      ? grid.nextElementSibling.classList[2]
      : "";
    return row && row === grid.classList[2] ? grid.nextElementSibling : null;
  } else if (direction === "up") {
    for (let i = 0; i < 4; i++) {
      grid = grid.previousElementSibling;
      if (!grid) {
        return null;
      }
    }
    return grid;
  } else if (direction === "down") {
    for (let i = 0; i < 4; i++) {
      grid = grid.nextElementSibling;
      if (!grid) {
        return null;
      }
    }

    return grid;
  }
}
//不同数字对应不同颜色
function numberToColor(num) {
  let color = "";
  switch (num) {
    case 2:
      color = "#facfa1";
      break;
    case 4:
      color = "#f5b880";
      break;
    case 8:
      color = "#f8a558";
      break;
    case 16:
      color = "#faa544";
      break;
    case 32:
      color = "#f07d12";
      break;
    case 64:
      color = "#fc9e60";
      break;
    case 128:
      color = "#f8741c";
      break;
    case 256:
      color = "#ec712af5";
      break;
    case 512:
      color = "#eb5f0ef5";
      break;
    case 1024:
      color = "#f3817df5";
      break;
    case 2048:
      color = "#f51109f5";
      break;
  }
  return color;
}

function gameOver() {
  let gridNum = 0;
  let tempGrid = 0;
  let grid = document.getElementsByClassName("grid");
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].innerText !== "") {
      gridNum = gridNum + 1;
    }
  }
  if (gridNum === 16) {
    let num =
      keyDown(37, false) ||
      keyDown(38, false) ||
      keyDown(39, false) ||
      keyDown(40, false);
    if (!num) {
      setTimeout(() => {
        Alert("game over");
      }, 500);
    }
  }
}
function Alert(content) {
  let body = document.body;
  let module = document.createElement("div");
  let alert = document.createElement("div");
  let btn = document.createElement("button");
  module.classList.add("module");
  alert.innerText = `${content ? content : ""}`;
  btn.classList.add("btn");
  btn.innerText = "close";
  alert.classList.add("alert");
  alert.appendChild(btn);
  module.appendChild(alert);
  body.appendChild(module);
  btn.onclick = function () {
    module.remove();
    clearGrid();
    createRandomGrid(2);
  };
}
