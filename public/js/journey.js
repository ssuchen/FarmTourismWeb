// ajax(
//   "https://cors-anywhere.herokuapp.com/https://data.coa.gov.tw/Service/OpenData/RuralTravelData.aspx",
//   function (response) {
//     journeyRender(response);
//   }
// );
ajax("journey.json", function (response) {
  journeyRender(response);
});
function journeyRender(data) {
  console.log(data);
  let len = data.length;
  let perPage = 12;

  let loading = document.querySelector(".loading");
  loading.style.display = "none";
  console.log("aaa");
  for (let i = 0; i < 12; i++) {
    let journeyTag;
    let id = data[i].TravelSeq;
    let name = data[i].Title;
    //let photo = data[i].PhotoUrl;
    let photo =
      "https://images.unsplash.com/photo-1551651431-aae9dc0ba2dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80";
    let text = data[i].Contents.substr(0, 38) + "...";
    let tag = data[i].TravelType;
    //將tag 字串分開成陣列
    let arr = [];
    for (t = 0; t < tag.length; t++) {
      let getTag = tag.substr(t * 9, 4);
      if (getTag !== "") {
        arr.push(getTag);
      }
    }

    function renderCard() {
      let journeyMainContent = document.querySelector(".journey-main-content");
      let journeyCard = document.createElement("a");
      journeyCard.setAttribute("class", "journey-card");
      //journeyCard.setAttribute("href", "journeyPagination.html?id=" + id);
      journeyCard.setAttribute("href", "journeyPagination.html?id=" + name);
      let journeyImg = document.createElement("div");
      journeyImg.setAttribute("class", "journey-img");
      let img = document.createElement("img");
      img.setAttribute("src", photo);
      let journeyBtn = document.createElement("i");
      journeyBtn.setAttribute("class", "far fa-heart like-btn");
      journeyBtn.setAttribute("id", id);

      let journeyTitle = document.createElement("div");
      journeyTitle.setAttribute("class", "journey-title");
      journeyTitle.textContent = name;

      let journeyGroup = document.createElement("div");
      journeyGroup.setAttribute("class", "journey-group");

      let journeyText = document.createElement("div");
      journeyText.setAttribute("class", "journey-text");
      journeyText.textContent = text;

      journeyMainContent.appendChild(journeyCard);
      journeyCard.appendChild(journeyImg);
      journeyCard.appendChild(journeyTitle);

      journeyCard.appendChild(journeyText);
      journeyCard.appendChild(journeyGroup);
      journeyImg.appendChild(img);
      journeyImg.appendChild(journeyBtn);

      //將 tag 放入 journey-group的迴圈
      arr.forEach(function (item) {
        journeyTag = document.createElement("div");
        journeyTag.setAttribute("class", "journey-tag");
        tag = item;
        journeyTag.textContent = "#" + tag;
        journeyGroup.appendChild(journeyTag);
      });
    }
    renderCard();
  }

  //+++++++++++++++++++++++++++
  //      頁數判斷功能
  //+++++++++++++++++++++++++++

  //農場頁數
  let page = Math.ceil(len / perPage);

  //農場頁數 掛的 html 標籤
  let pageList = document.querySelector(".page-list");
  //第一次產出頁數按鈕
  for (let i = 0; i < 5; i++) {
    let pageBtn = document.createElement("div");
    pageBtn.setAttribute("class", "page-btn");
    pageBtn.setAttribute("id", i + 1);
    pageBtn.textContent = i + 1;
    pageList.appendChild(pageBtn);
  }
  let activeBtn = document.getElementById("1");
  activeBtn.classList.add("btn-active");

  // 頁數按鈕 監聽事件
  let pageBtn = document.querySelectorAll(".page-btn");
  let choseBtn;
  let nextPage;
  let searchData = [];

  //---------------更新按鈕列---------------
  //重新更新按鈕列表
  function updateBtnlist() {
    let btnStr = "";
    let max = nextPage + 3;
    let min = nextPage - 2;

    if (min < 0 || (min == 0 && page > 5)) {
      min = 1;
      max = 6;
    }
    if (max > page) {
      max = page + 1;
    }
    for (let i = min; max > i; i++) {
      btnStr += '<div class="page-btn" id="' + i + '">' + i + "</div>";
      pageList.innerHTML = btnStr;
    }
    let text = document.getElementById(nextPage);
    text.classList.add("btn-active");
  }

  //更新點擊按鈕事件
  function clickbtn() {
    //重新定義點擊的按鈕
    let pageBtn = document.querySelectorAll(".page-btn");
    for (let i = 0; i < pageBtn.length; i++) {
      pageBtn[i].addEventListener("click", function () {
        nextPage = parseInt(pageBtn[i].innerHTML);
        //改變按鈕 樣式
        changeBtnStyle();
        //重新 更換內容資料的函式
        renderPage();
      });
    }
  }

  //---------------觸發更換按鈕------------

  for (let i = 0; i < pageBtn.length; i++) {
    pageBtn[i].addEventListener("click", changeBtnStyle);

    //更換按鈕樣式的函式
    function changeBtnStyle() {
      //1.先移除原有
      let removeClass = document.querySelector(".btn-active");
      removeClass.classList.remove("btn-active");
      //2.再加入指定的按鈕css屬性
      if (nextPage == undefined) {
        choseBtn = pageBtn[i].id;
      } else {
        choseBtn = nextPage;
      }
      let clickBtn = document.getElementById(choseBtn);
      clickBtn.classList.add("btn-active");

      //重新定義 nextPage 將內容定義為 undefined
      nextPage = undefined;
    }

    //更換內容資料的函式
    pageBtn[i].addEventListener("click", renderPage);

    function renderPage() {
      //抓出每頁最大及最小筆數編號 當前頁數 * 每頁需要的資料筆數
      let min = choseBtn * perPage - perPage + 1;
      let max = choseBtn * perPage;
      let pageData;
      let newData = [];
      if (searchData != "") {
        pageData = searchData;
      } else {
        pageData = data;
      }

      pageData.forEach(function (item, index) {
        //利用陣列索引 索引從0開始 所以要加1
        let num = index + 1;
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if (num >= min && num <= max) {
          newData.push(item);
        }
      });

      //將新的頁數資料重新放上網頁
      let journeyMainContent = document.querySelector(".journey-main-content");
      journeyMainContent.innerHTML = "";

      for (let p = 0; p < newData.length; p++) {
        let id = newData[p].TravelSeq;
        let name = newData[p].Title;
        //let photo = newData[p].PhotoUrl;
        let photo =
          "https://images.unsplash.com/photo-1551651431-aae9dc0ba2dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80";
        let text = newData[p].Contents.substr(0, 38) + "...";
        let tag = newData[p].TravelType;

        //將tag 字串分開成陣列
        let arr = [];
        for (t = 0; t < tag.length; t++) {
          let getTag = tag.substr(t * 9, 4);
          if (getTag !== "") {
            arr.push(getTag);
          }
        }

        let journeyCard = document.createElement("a");
        journeyCard.setAttribute("class", "journey-card");
        journeyCard.setAttribute("href", "journeyPagination.html?id=" + id);
        let journeyImg = document.createElement("div");
        journeyImg.setAttribute("class", "journey-img");
        let img = document.createElement("img");
        img.setAttribute("src", photo);

        let journeyBtn = document.createElement("i");
        journeyBtn.setAttribute("class", "far fa-heart like-btn");
        journeyBtn.setAttribute("id", id);

        let journeyTitle = document.createElement("div");
        journeyTitle.setAttribute("class", "journey-title");
        journeyTitle.textContent = name;

        let journeyGroup = document.createElement("div");
        journeyGroup.setAttribute("class", "journey-group");

        let journeyText = document.createElement("div");
        journeyText.setAttribute("class", "journey-text");
        journeyText.textContent = text;

        journeyMainContent.appendChild(journeyCard);
        journeyCard.appendChild(journeyImg);
        journeyCard.appendChild(journeyTitle);
        journeyCard.appendChild(journeyText);

        journeyCard.appendChild(journeyGroup);
        journeyImg.appendChild(img);
        journeyImg.appendChild(journeyBtn);

        //將 tag 放入 journey-group的迴圈
        arr.forEach(function (item) {
          journeyTag = document.createElement("div");
          journeyTag.setAttribute("class", "journey-tag");
          tag = item;
          journeyTag.textContent = "#" + tag;
          journeyGroup.appendChild(journeyTag);
        });
      }
      //願望清單
      checkBtnStyle();
      checkBtn();
    }
  }

  //下一頁按鈕
  let AddPageBtn = document.querySelector(".add-page");
  AddPageBtn.addEventListener("click", function () {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == page) {
      // alert('最後一頁了');
      let lestPageBox = document.querySelector(".lest-page-box");
      lestPageBox.classList.add("box-open");
      cover.style.display = "block";
      body.classList.add("fixed");

      return;
    }
    if (choseBtn == 1 && page == 1) {
      return;
    }
    nextPage = parseInt(choseBtn) + 1;

    //更改按鈕列表
    updateBtnlist();
    clickbtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //上一頁按鈕
  let LessPageBtn = document.querySelector(".less-page");
  LessPageBtn.addEventListener("click", function () {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == 1) {
      return;
    }
    nextPage = parseInt(choseBtn) - 1;
    //更改按鈕列表
    updateBtnlist();
    clickbtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //+++++++++++++++++++++++++++
  //      搜尋列 功能
  //+++++++++++++++++++++++++++

  let tagBtn = document.querySelectorAll(".tag-btn");

  for (let b = 0; b < tagBtn.length; b++) {
    tagBtn[b].addEventListener("click", tagClick);
    function tagClick() {
      //為點選的按鈕加上樣式
      let removeClass = document.querySelector(".tag-active");
      if (removeClass == null) {
        removeClass = null;
      } else {
        removeClass.classList.remove("tag-active");
      }
      tagBtn[b].classList.add("tag-active");
      //選取點選樣式的數值
      let btnValue = tagBtn[b].innerHTML;
      searchData = [];
      data.forEach(function (item) {
        let tag = item.TravelType;
        //將tag 字串分開成陣列
        let arr = [];
        for (t = 0; t < tag.length; t++) {
          let getTag = tag.substr(t * 9, 4);
          if (getTag !== "") {
            arr.push(getTag);
          }
        }
        //比對選取的 tag 與 資料相符的放入searchdata
        for (let a = 0; a < arr.length; a++) {
          if (arr[a] == btnValue) {
            searchData.push(item);
          }
        }
      });
      let len = searchData.length;
      if (len > 12) {
        len = 12;
      }
      let journeyMainContent = document.querySelector(".journey-main-content");
      journeyMainContent.innerHTML = "";
      for (let l = 0; l < len; l++) {
        let journeyTag;
        let id = searchData[l].TravelSeq;
        let name = searchData[l].Title;
        //let photo = searchData[l].PhotoUrl;
        let photo =
          "https://images.unsplash.com/photo-1551651431-aae9dc0ba2dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80";
        let text = searchData[l].Contents.substr(0, 38) + "...";
        let tag = searchData[l].TravelType;

        //將tag 字串分開成陣列
        let arr = [];
        for (t = 0; t < tag.length; t++) {
          let getTag = tag.substr(t * 9, 4);
          if (getTag !== "") {
            arr.push(getTag);
          }
        }

        let journeyCard = document.createElement("a");
        journeyCard.setAttribute("class", "journey-card");
        journeyCard.setAttribute("href", "journeyPagination.html?id=" + id);
        let journeyImg = document.createElement("div");
        journeyImg.setAttribute("class", "journey-img");
        let img = document.createElement("img");
        img.setAttribute("src", photo);

        let journeyBtn = document.createElement("i");
        journeyBtn.setAttribute("class", "far fa-heart like-btn");
        journeyBtn.setAttribute("id", id);

        let journeyTitle = document.createElement("div");
        journeyTitle.setAttribute("class", "journey-title");
        journeyTitle.textContent = name;

        let journeyGroup = document.createElement("div");
        journeyGroup.setAttribute("class", "journey-group");

        let journeyText = document.createElement("div");
        journeyText.setAttribute("class", "journey-text");
        journeyText.textContent = text;

        journeyMainContent.appendChild(journeyCard);
        journeyCard.appendChild(journeyImg);
        journeyCard.appendChild(journeyTitle);
        journeyCard.appendChild(journeyText);

        journeyCard.appendChild(journeyGroup);
        journeyImg.appendChild(img);
        journeyImg.appendChild(journeyBtn);

        //將 tag 放入 journey-group的迴圈
        arr.forEach(function (item, index) {
          journeyTag = document.createElement("div");
          journeyTag.setAttribute("class", "journey-tag");
          tag = item;
          journeyTag.textContent = "#" + tag;
          journeyGroup.appendChild(journeyTag);
        });
      }

      //算出頁數按鈕總數
      let pageLen = Math.ceil(searchData.length / 12);
      //重新寫出按鈕
      nextPage = 1;
      page = pageLen;
      updateBtnlist();
      clickbtn();

      //願望清單
      checkBtnStyle();
      checkBtn();
    }
  }

  //=========================================
  //  從 firebase得到願望清單 並改變愛心樣式
  //=========================================
  let btnNum;
  function checkBtnStyle() {
    let docID;
    let docIDArr = [];
    db.collection("user").onSnapshot(function (snapshop) {
      snapshop.docs.forEach(function (doc) {
        if (userEmail == doc.data().email) {
          docID = doc.id;
        }
      });
      let journeyList = db
        .collection("user")
        .doc(docID)
        .collection("journeylist");
      journeyList.get().then(function (snapshop) {
        snapshop.docs.forEach(function (doc) {
          let clickId = doc.data().id;
          docIDArr.push(clickId);
        });
        let btn = document.querySelectorAll(".like-btn");
        for (let i = 0; i < btn.length; i++) {
          docIDArr.forEach(function (item) {
            if (btn[i].id == item) {
              btn[i].classList.add("fas");
            }
          });
        }
      });
    });
  }
  checkBtnStyle();

  //=========================================
  //  從 firebase得到願望清單 並監聽愛心樣式
  //=========================================
  function checkBtn() {
    let btn = document.querySelectorAll(".like-btn");
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function (e) {
        e.preventDefault();
        if (userEmail == undefined) {
          //alert("請登入會員")
          let pleaseLoginBox = document.querySelector(".please-login-box");
          pleaseLoginBox.classList.add("box-open");
          cover.style.display = "block";
          body.classList.add("fixed");
        }
        btnNum = btn[i].id;
        let docID;
        let clickID;
        let deleteID;
        db.collection("user").onSnapshot(function (snapshop) {
          snapshop.docs.forEach(function (doc) {
            if (userEmail == doc.data().email) {
              docID = doc.id;
            }
          });
          let journeyList = db
            .collection("user")
            .doc(docID)
            .collection("journeylist");
          journeyList
            .where("id", "==", btnNum)
            .get()
            .then(function (snapshop) {
              snapshop.docs.forEach(function (doc) {
                if (doc.data().id != undefined) {
                  clickID = doc.data().id;
                  deleteID = doc.id;
                }
              });
              if (clickID === undefined) {
                btn[i].classList.add("fas");
                //將表單送入firebase
                likebtnAdd();
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle();
              } else {
                //將表單從firebase上移除
                btn[i].classList.remove("fas");
                let deleteDoc = db
                  .collection("user")
                  .doc(docID)
                  .collection("journeylist")
                  .doc(deleteID);
                deleteDoc.delete();
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle();
              }
            });
        });
      });
    }
  }
  checkBtn();

  //===================
  //將表單送到 firebase
  //===================
  function likebtnAdd() {
    let btnID = btnNum;
    let tag;
    let id;
    let img;
    let text;
    let title;
    for (let a = 0; a < data.length; a++) {
      if (data[a].TravelSeq == btnID) {
        tag = data[a].TravelType;
        id = data[a].TravelSeq;
        img = data[a].PhotoUrl;
        text = data[a].Contents.substr(0, 38) + "...";
        title = data[a].Title;
      }
    }
    //將點取資訊放入firebase
    db.collection("user")
      .get()
      .then(function (snapshop) {
        let docID;
        snapshop.docs.forEach(function (doc) {
          //將符合email的資料放入陣列
          if (userEmail == doc.data().email) {
            docID = doc.id;
          }
        });
        let journeyList = db
          .collection("user")
          .doc(docID)
          .collection("journeylist");

        //將tag 字串分開成陣列
        let arr = [];
        for (t = 0; t < tag.length; t++) {
          let getTag = tag.substr(t * 9, 4);
          if (getTag !== "") {
            arr.push(getTag);
          }
        }
        journeyList.add({
          id: id,
          img: img,
          tag: arr,
          text: text,
          title: title,
        });
      });
  }
}
