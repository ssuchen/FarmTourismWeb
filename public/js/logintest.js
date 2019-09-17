console.log("test")
let singUpRedirect = document.querySelector("#singUpRedirect")
singUpRedirect.addEventListener("click",function(){
    console.log("1")
    test()
    console.log("3")
})

function test(){
    console.log("2")
}