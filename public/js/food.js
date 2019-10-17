//特色小吃 資料
ajax(
  "https://cors-anywhere.herokuapp.com/http://data.coa.gov.tw/Service/OpenData/ODwsv/ODwsvTravelFood.aspx",
  function(response) {
    foodRender(response);
  }
);

function foodRender(data) {
  //所有食物的總數
  let len = data.length;
  let perPage = 12;
  let id;
  let name;
  let photo;
  let foodMainContent = document.querySelector(".food-main-content");

  let loading = document.querySelector(".loading");
  loading.style.display = "none";

  //載入第一筆資料
  for (let i = 0; i < 12; i++) {
    id = data[i].ID;
    name = data[i].Name;
    photo = data[i].PicURL;
    address = data[i].Address;
    text = data[i].HostWords.substr(0, 35);
    country = data[i].City;
    town = data[i].Town;
    tel = data[i].Tel;

    let foodCard = document.createElement("a");
    foodCard.setAttribute("href", "foodPagination.html?id=" + id);
    foodCard.setAttribute("class", "food-card");
    let foodCardLeft = document.createElement("div");
    foodCardLeft.setAttribute("class", "food-card-left");
    let foodCardRight = document.createElement("food-card-right");
    foodCardRight.setAttribute("class", "food-card-right");
    let foodImg = document.createElement("div");
    foodImg.setAttribute("class", "food-img");
    let Img = document.createElement("img");
    Img.setAttribute("src", photo);

    let foodBtn = document.createElement("i");
    foodBtn.setAttribute("class", "far fa-heart like-btn food-likebtn");
    foodBtn.setAttribute("id", id);

    let foodTitle = document.createElement("div");
    foodTitle.setAttribute("class", "food-title");
    foodTitle.textContent = name;

    let foodTel = document.createElement("div");
    foodTel.setAttribute("class", "food-tel");
    foodTel.textContent = tel;

    let foodPlace = document.createElement("div");
    foodPlace.setAttribute("class", "food-place");

    let foodCountry = document.createElement("div");
    foodCountry.setAttribute("class", "food-country");
    foodCountry.textContent = country;

    let foodTown = document.createElement("div");
    foodTown.setAttribute("class", "food-town");
    foodTown.textContent = town;

    let foodText = document.createElement("div");
    foodText.setAttribute("class", "food-text");
    foodText.textContent = text + " ...";

    foodMainContent.appendChild(foodCard);
    foodCard.appendChild(foodCardLeft);
    foodCard.appendChild(foodCardRight);

    foodCardLeft.appendChild(foodImg);
    foodImg.appendChild(Img);
    foodImg.appendChild(foodBtn);

    foodCardRight.appendChild(foodTitle);
    foodCardRight.appendChild(foodTel);
    foodCardRight.appendChild(foodPlace);
    foodCardRight.appendChild(foodText);

    foodPlace.appendChild(foodCountry);
    foodPlace.appendChild(foodTown);
  }
  //+++++++++++++++++++++++++++
  //      頁數判斷功能
  //+++++++++++++++++++++++++++

  //產品頁數
  let page = Math.ceil(len / perPage);
  let pageList = document.querySelector(".page-list");

  //第一次產出頁數按鈕
  for (let i = 0; i < 10; i++) {
    let pageBtn = document.createElement("div");
    pageBtn.setAttribute("class", "page-Btn");
    pageBtn.setAttribute("id", i + 1);
    pageBtn.textContent = i + 1;
    pageList.appendChild(pageBtn);
  }
  let activeBtn = document.getElementById("1");
  activeBtn.classList.add("btn-active");

  // 頁數按鈕 監聽事件
  let pageBtn = document.querySelectorAll(".page-Btn");
  let nextPage;
  let choseBtn;

  //---------------更新按鈕列---------------

  //重新更新按鈕列表
  function updateBtnlist() {
    let btnStr = "";
    let max = nextPage + 5;
    let min = nextPage - 5;
    if (min < 0 || min == 0) {
      min = 1;
      max = 11;
    }
    if (max > page) {
      max = page + 1;
    }
    for (let i = min; max > i; i++) {
      btnStr += '<div class="page-Btn" id="' + i + '">' + i + "</div>";
      pageList.innerHTML = btnStr;
    }
    let text = document.getElementById(nextPage);
    text.classList.add("btn-active");
  }

  //更新點擊按鈕事件
  function clickBtn() {
    //重新定義點擊的按鈕
    let pageBtn = document.querySelectorAll(".page-Btn");
    for (let i = 0; i < pageBtn.length; i++) {
      pageBtn[i].addEventListener("click", function() {
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
      //抓出每頁最大及最小的筆數編號  當前頁數 * 每頁需要的資料筆數
      let min = choseBtn * perPage - perPage + 1;
      let max = choseBtn * perPage;
      let newData = [];
      if (searchData != "") {
        pageData = searchData;
      } else {
        pageData = data;
      }
      pageData.forEach(function(item, index) {
        //利用陣列索引 索引從0開始 所以要加1
        let num = index + 1;
        //當篩選 索引大於最小值 及 小於最大值時 將該筆資料放入陣列
        if (num >= min && num <= max) {
          newData.push(item);
        }
      });

      //將新的頁數資料重新放上網頁
      let str = "";
      for (let p = 0; p < newData.length; p++) {
        id = newData[p].ID;
        name = newData[p].Name;
        photo = newData[p].PicURL;
        address = newData[p].Address;
        text = newData[p].HostWords.substr(0, 35);
        country = newData[p].City;
        town = newData[p].Town;
        tel = newData[p].Tel;

        str +=
          '<a  href="foodPagination.html?id="' +
          id +
          ' class="food-card"><div class="food-card-left"><div class="food-img"><img src="' +
          photo +
          '" alt="" ><i class="far fa-heart like-btn food-likebtn" id="' +
          id +
          '"></i></div></div><div class="food-card-right"><div class="food-title">' +
          name +
          '</div><div class="food-tel">' +
          tel +
          '</div><div class="food-place"><div class="food-country">' +
          country +
          '</div><div class="food-town">' +
          town +
          "</div></div>" +
          '<div class="food-text">' +
          text +
          "</div></div></a>";
      }

      let presentMainContent = document.querySelector(".food-main-content");
      presentMainContent.innerHTML = str;

      //願望清單
      checkBtnStyle();
      checkBtn();
    }
  }

  //下一頁按鈕
  let addPageBtn = document.querySelector(".Add-page");
  addPageBtn.addEventListener("click", function() {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == page) {
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
    clickBtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //上一頁按鈕
  let lessPageBtn = document.querySelector(".Less-page");
  lessPageBtn.addEventListener("click", function() {
    if (choseBtn == undefined) {
      choseBtn = 1;
    }
    if (choseBtn == 1) {
      return;
    }
    nextPage = parseInt(choseBtn) - 1;
    //更改按鈕列表
    updateBtnlist();
    clickBtn();
    //更改按鈕樣式
    changeBtnStyle();
    //更改內容資料
    renderPage();
  });

  //+++++++++++++++++++++++++++
  //      搜尋列 功能
  //+++++++++++++++++++++++++++

  let searchBtn = document.querySelector(".searchBar-Btn");
  let searchData = [];
  searchBtn.addEventListener("click", function() {
    //取得使用者選取的 地方區域
    let searchBarArea = document.querySelector(".searchBar-Area").value;
    //取得使用者選取的 縣市
    let searchBarCountry = document.querySelector(".searchBar-Country").value;

    //取得使用 者輸入的文字
    let searchInput = document.querySelector(".searchBar-Input-text").value;

    //清空資料 並重新放上資訊
    presentMainContent = document.querySelector(".food-main-content");
    presentMainContent.innerHTML = "";
    let status = true;

    //建立新陣列
    searchData = [];
    //篩選相對應的資料

    data.forEach(function(item) {
      //如果選取對應的城市
      if (searchInput === item.City) {
        searchData.push(item);
      }
      if (searchBarCountry === item.City) {
        searchData.push(item);
      }

      if (searchBarArea === "all" || searchBarCountry === "all") {
        status = false; //如果沒有輸入的話
      }
    });

    //如果沒有得到輸入值
    if (status == false && searchInput == "") {
      let searchBox = document.querySelector(".search-box");
      searchBox.classList.add("box-open");
      cover.style.display = "block";
      body.classList.add("fixed");
    }

    let searchBoxBtn = document.querySelector(".search-box-btn");
    searchBoxBtn.addEventListener("click", function() {
      location.reload();
    });

    //將新的頁數資料重新放上網頁
    let str = "";
    let len = searchData.length;

    for (let p = 0; p < len; p++) {
      if (len > 12) {
        len = 12;
      }
      id = searchData[p].ID;
      name = searchData[p].Name;
      photo = searchData[p].PicURL;
      address = searchData[p].Address;
      text = searchData[p].HostWords.substr(0, 35);
      country = searchData[p].City;
      town = searchData[p].Town;
      tel = searchData[p].Tel;

      str +=
        '<a  href="foodPagination.html?id="' +
        id +
        ' class="food-card"><div class="food-card-left"><div class="food-img"><img src="' +
        photo +
        '" alt="" ><i class="far fa-heart like-btn food-likebtn" id="' +
        id +
        '"></i></div></div><div class="food-card-right"><div class="food-title">' +
        name +
        '</div><div class="food-tel">' +
        tel +
        '</div><div class="food-place"><div class="food-country">' +
        country +
        '</div><div class="food-town">' +
        town +
        "</div></div>" +
        '<div class="food-text">' +
        text +
        "</div></div></a>";

      let foodMainContent = document.querySelector(".food-main-content");
      foodMainContent.innerHTML = str;

      //將搜尋列清空
      let inputClear = document.querySelector(".searchBar-Input-text");
      inputClear.value = "";
    }
    //算出頁數按鈕總數
    let pageLen = Math.ceil(searchData.length / 12);
    //重新寫出按鈕
    nextPage = 1;
    page = pageLen;
    updateBtnlist();
    clickBtn();

    //願望清單
    checkBtnStyle();
    checkBtn();
  });

  //=========================================
  //  從 firebase得到願望清單 並改變愛心樣式
  //=========================================

  let btnNum;
  function checkBtnStyle() {
    let docID;
    let docIDArr = [];
    db.collection("user").onSnapshot(function(snapshop) {
      snapshop.docs.forEach(function(doc) {
        if (userEmail == doc.data().email) {
          docID = doc.id;
        }
      });
      let foodlist = db
        .collection("user")
        .doc(docID)
        .collection("foodlist");
      foodlist.get().then(function(snapshop) {
        snapshop.docs.forEach(function(doc) {
          let clickId = doc.data().id;
          docIDArr.push(clickId);
        });

        let btn = document.querySelectorAll(".like-btn");
        for (let i = 0; i < btn.length; i++) {
          docIDArr.forEach(function(item) {
            if (btn[i].id == item) {
              btn[i].classList.add("fas");
            }
          });
        }
      });
    });
  };
  checkBtnStyle();

  //=========================================
  //  從 firebase得到願望清單 並監聽愛心樣式
  //=========================================
  function checkBtn() {
    let btn = document.querySelectorAll(".like-btn");
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function(e) {
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
        db.collection("user").onSnapshot(function(snapshop) {
          snapshop.docs.forEach(function(doc) {
            if (userEmail == doc.data().email) {
              docID = doc.id;
            }
          });
          let foodlist = db
            .collection("user")
            .doc(docID)
            .collection("foodlist");
          foodlist
            .where("id", "==", btnNum)
            .get()
            .then(function(snapshop) {
              snapshop.docs.forEach(function(doc) {
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
                  .collection("foodlist")
                  .doc(deleteID);
                deleteDoc.delete();
                //檢查 firebase 的清單 重新放入樣式
                checkBtnStyle();
              }
            });
        });
      });
    }
  };
  checkBtn();

  //===================
  //將表單送到 firebase
  //===================
  function likebtnAdd() {
    let btnID = btnNum;
    let country;
    let id;
    let img;
    let text;
    let title;
    let town;
    let tel;

    for (let a = 0; a < data.length; a++) {
      if (data[a].ID == btnID) {
        country = data[a].City;
        id = data[a].ID;
        tel = data[a].Tel;
        img = data[a].PicURL;
        text = data[a].HostWords.substr(0, 35);
        title = data[a].Name;
        town = data[a].Town;
      }
    }

    //將點取資訊放入firebase
    db.collection("user")
      .get()
      .then(function(snapshop) {
        let docID;
        snapshop.docs.forEach(function(doc) {
          //將符合email的資料放入陣列
          if (userEmail == doc.data().email) {
            docID = doc.id;
          }
        });
        let foodlist = db
          .collection("user")
          .doc(docID)
          .collection("foodlist");
        foodlist.add({
          country: country,
          id: id,
          img: img,
          tel: tel,
          text: text,
          title: title,
          town: town
        });
      });
  };
};
search();
