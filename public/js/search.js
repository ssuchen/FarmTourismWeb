
let searchBarArea 
function search() {
  searchBarArea = document.querySelector(".searchBar-Area");
  searchBarArea.addEventListener("change",selectPlace);
}
function selectPlace(){
  let select = searchBarArea.value;
  let country = document.querySelector(".searchBar-Country");
  let str;
  switch (select) {
    case "North":
      str =
        '<option value="all">縣市</option>' +
        '<option value="臺北市">臺北市</option>' +
        '<option value="新北市">新北市</option>' +
        '<option value="基隆市">基隆市</option>' +
        '<option value="桃園市">桃園市</option>' +
        '<option value="新竹縣">新竹縣</option>' +
        '<option value="苗栗縣">苗栗縣</option>';
      break;

    case "Central":
      str =
        '<option value="all">縣市</option>' +
        '<option value="臺中市">臺中市</option>' +
        '<option value="彰化縣">彰化縣</option>' +
        '<option value="南投縣">南投縣</option>' +
        '<option value="雲林縣">雲林縣</option>';
      break;

    case "South":
      str =
        '<option value="all">縣市</option>' +
        '<option value="嘉義縣">嘉義縣</option>' +
        '<option value="臺南市">臺南市</option>' +
        '<option value="高雄市">高雄市</option>' +
        '<option value="屏東縣">屏東縣</option>';
      break;

    case "East":
      str =
        '<option value="all">縣市</option>' +
        '<option value="宜蘭縣">宜蘭縣</option>' +
        '<option value="花蓮縣">花蓮縣</option>' +
        '<option value="臺東縣">臺東縣</option>';
      break;

    default:
      str = '<option value="all">縣市</option>';
  }
  country.innerHTML = str;
}
