// console.log("test")
// let singUpRedirect = document.querySelector("#singUpRedirect")
// singUpRedirect.addEventListener("click",function(){
//     console.log("1")
//     test()
//     console.log("3")
// })

// function test(){
//     console.log("2")
// }

db.collection("user").get().then(function(snapshop){
console.log(snapshop.docs)
snapshop.docs.forEach(function(doc) {
    console.log(doc.data().email)
    console.log(doc.data().travellist)
});
})
let Travelarr=[]
// db.collection("wish-travel").onSnapshot(function(snapshop){
//     //console.log(snapshop.docs)
//     snapshop.docs.forEach(function(doc){
//       //如果信箱相同 則放入陣列中
//       console.log(doc.data())
//     //     let email = doc.data().email
//     //     if(userEmail == email){
//     //         Travelarr.push(doc.data())
//     //     }
//     //   //將符合的陣列 算出來
//     //   console.log(Travelarr)
      
       
//     });
    
// })  