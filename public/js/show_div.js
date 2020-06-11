let indexPlay = document.querySelector(".index-play");
let indexPlayRound = document.querySelectorAll(".index-play-photo-round-bg");

let indexFood = document.querySelector(".index-food");
let indexFoodRound = document.querySelectorAll(".index-food-photo-round-bg");

let indexPresent = document.querySelector(".index-present");
let indexPresentRound = document.querySelectorAll(
  ".index-present-photo-round-bg"
);

function indexPlayMove() {
  //div在滾軸的高度
  let indexPlayHeight = indexPlay.offsetTop - 600;
  //滾軸高度
  let bodyHeight = window.scrollY;
  if (indexPlayHeight < bodyHeight) {
    indexPlay.classList.add("index-div-show");
    for (let i = 0; i < indexPlayRound.length; i++) {
      indexPlayRound[i].classList.add(
        "index-div-show",
        "index-play-photo-round-bg-move"
      );
    }
  } else {
    indexPlay.classList.remove("index-div-show");
    for (let i = 0; i < indexPlayRound.length; i++) {
      indexPlayRound[i].classList.remove(
        "index-div-show",
        "index-play-photo-round-bg-move"
      );
    }
  }
}
document.addEventListener("scroll", indexPlayMove);

function indexFoodMove() {
  //滾軸高度
  let bodyHeight = window.scrollY;
  //div在滾軸的高度
  let indexFoodHeight = indexFood.offsetTop - 600;
  if (indexFoodHeight < bodyHeight) {
    indexFood.classList.add("index-div-show");
    for (let i = 0; i < indexFoodRound.length; i++) {
      indexFoodRound[i].classList.add(
        "index-div-show",
        "index-food-photo-round-bg-move"
      );
    }
  } else {
    indexFood.classList.remove("index-div-show");
    for (let i = 0; i < indexFoodRound.length; i++) {
      indexFoodRound[i].classList.remove(
        "index-div-show",
        "index-food-photo-round-bg-move"
      );
    }
  }
}

document.addEventListener("scroll", indexFoodMove);

function indexPresentMove() {
  //滾軸高度
  let bodyHeight = window.scrollY;
  //div在滾軸的高度
  let indexPresentHeight = indexPresent.offsetTop - 600;
  if (indexPresentHeight < bodyHeight) {
    indexPresent.classList.add("index-div-show");
    for (let i = 0; i < indexPresentRound.length; i++) {
      indexPresentRound[i].classList.add(
        "index-div-show",
        "index-Present-photo-round-bg-move"
      );
    }
  } else {
    indexPresent.classList.remove("index-div-show");
    for (let i = 0; i < indexPresentRound.length; i++) {
      indexPresentRound[i].classList.remove(
        "index-div-show",
        "index-Present-photo-round-bg-move"
      );
    }
  }
}
document.addEventListener("scroll", indexPresentMove);
