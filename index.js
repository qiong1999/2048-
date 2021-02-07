//随机生成格子
function createRandomGrid(num) {
  let x = Math.floor(Math.random() * 4) + 1;
  let y = Math.floor(Math.random() * 4) + 1;
  let newGrid = document.getElementsByClassName("grid" + x + y)[0];
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
        clearGrid()
      createRandomGrid(2);
    },
    false
  );
}
newGame();
