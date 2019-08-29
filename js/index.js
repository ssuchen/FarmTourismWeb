

 let  menubtn = document.querySelector('.mobile-menu-buttom');
 menubtn.addEventListener('click',function(){
      console.log("test")
      let list = document.querySelector('.mobile-menu-list');
      list.classList.toggle('mobile-menu-list-show');

 })