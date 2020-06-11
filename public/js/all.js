//ajax
function ajax(src, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("get", src, true);
  xhr.onload = function () {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send(null);
}

//menu 按鈕開關
document.addEventListener("DOMContentLoaded", function () {
  let menuBtn = document.querySelector(".mobile-menu-buttom");
  menuBtn.addEventListener("click", function () {
    let list = document.querySelector(".mobile-menu-list");
    list.classList.toggle("mobile-menu-list-show");
    //menu icon 更換
    let menuIcon = document.querySelector(".mobile-menu-icon");
    menuIcon.classList.toggle("fa-times");
  });

  //移至最上面
  let goTop = document.querySelector(".scroll-top");
  goTop.addEventListener("click", gotoTop);
});

function gotoTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function topbtnShow() {
  let topBtn = document.querySelector(".scroll-top");
  //卷軸目前位置
  let bodyHeight = window.scrollY;
  //卷軸高度
  var bodyScroll = document.body.scrollHeight;
  if (bodyHeight > bodyScroll * 0.3) {
    topBtn.classList.add("scroll-top-appear");
  } else {
    topBtn.classList.remove("scroll-top-appear");
  }
}

document.addEventListener("scroll", topbtnShow);

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = ajax;
}
