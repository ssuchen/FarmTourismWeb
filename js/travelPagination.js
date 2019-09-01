//抓到網址的query string    
let Idstring = location.href;
//console.log(Idstring);
//將字串轉成url
let url = new URL(Idstring);
//console.log(url)
//找到id後方的字串
let UrlString = url.searchParams.get('id');
//console.log(UrlString)
    
       