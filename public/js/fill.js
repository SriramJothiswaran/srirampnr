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
