javascript:{
  document.getElementById("usernameId").value = "";
  document.getElementsByName("j_password")[0].value = "";
  document.getElementsByName("j_captcha")[0].focus;
  document.getElementById("loginbutton").onclick = function () {
      function myCheckFunc(){
        alert('msg');
        if (window.location.href != "https://www.irctc.co.in/eticketing/home") {
            myCheckFunc();
        }else{
          alert("page loaded successfully")
        }
      }
      myCheckFunc()
    }


}

javascript:document.getElementById("loginbutton").onclick = function () {
      while(window.location.href === "https://www.irctc.co.in/eticketing/mainpage.jsf"){
        if (document.readyState === 'complete') {
          alert("page loaded success")
        }
      }
  }
