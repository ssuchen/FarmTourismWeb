//ajax
function ajax(src, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("get", src, true);
  xhr.onload = function() {
    callback(JSON.parse(xhr.responseText));
  };
  xhr.send(null);
}

//menu 按鈕開關
document.addEventListener("DOMContentLoaded", function() {
  let menuBtn = document.querySelector(".mobile-menu-buttom");
  menuBtn.addEventListener("click", function() {
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
    behavior: "smooth"
  });
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = ajax;
}
