//随机生成格子
function createRandomGrid(num) {
  let x = Math.floor(Math.random() * 4) + 1;
  let y = Math.floor(Math.random() * 4) + 1;
  let newGrid = document.getElementsByClassName("grid" + x + y)[0];
  console.log("hell",getPrevGrid(newGrid,"right"));
  newGrid.style.backgroundColor = "pink";
  newGrid.innerText = num;
}
//清除棋板上的方块
function clearGrid() {
  let grid = document.getElementsByClassName("grid");
  for (let i = 0; i < grid.length; i++) {
    grid[i].style.backgroundColor = "#ffffe0";
    grid[i].innerText = "";
  }
}
//new Game重新开始游戏
function newGame() {
  let newGame = document.getElementsByClassName("newgame")[0];
  
  newGame.addEventListener(
    "click",
    function () {
      clearGrid();
      createRandomGrid(2);
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
    console.log(e);
  };
}

newGame();
getReady();
//监听方向键控制方块滑动
function keyDown(keyCode) {
  let dire, arr;
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
      dir = "down";
      break;
  }
  for (let i = 1; i < 5; i++) {
    if (dire === "up" || dire === "down") {
      arr = document.getElementsByClassName("col" + i);
    } else if (dire === "left" || dire === "right") {
      arr = document.getElementsByClassName("row" + i);
    }
    for (let j = 1; j <= 3; j++) {
      if (dir === "up" || "dir" === "left") {
      }
    }
  }
}
//方块滑动方式
function howToGo(gridArray, dire, position) {}

//方块在不同方向上的前一个格子
function getPrevGrid(grid, direction) {
  if (direction === "left") {
    let row = grid.previousElementSibling?grid.previousElementSibling.classList[2]:"";
    return row&&row===grid.classList[2]?grid.previousElementSibling:null;
  } else if (direction === "right") {
    let row = grid.nextElementSibling?grid.nextElementSibling.classList[2]:"";
    return row&&row===grid.classList[2]?grid.nextElementSibling:null;
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
      grid = grid.nextElementSibing;
      if (!grid) {
        return null;
      }
    }
    return grid;
  }
}
