

//最新消息 資料
 ajax("https://cors-anywhere.herokuapp.com/https://gis.taiwan.net.tw/XMLReleaseALL_public/activity_C_f.json",function(response){
     newRender(response)
});

function newRender(data){
 console.log(data)
 //let len = data.XML_Head.Infos.Info.length
for( let i=0; i<8 ;i++ ){

   //最新消息 資料  
    let title = data.XML_Head.Infos.Info[i].Name
    let text = data.XML_Head.Infos.Info[i].Description.slice(0,30)+"..."
    let time = data.XML_Head.Infos.Info[i].Start.slice(0,10)
    console.log(text)
    
    //最新消息DOM元素
     let indexMainCrad = document.createElement('div');
         indexMainCrad.setAttribute('class','index-main-crad');
     let cardTitle = document.createElement('div');
         cardTitle.setAttribute('class','card-title');
     let cardtext = document.createElement('p');
     
     


}
 

}
