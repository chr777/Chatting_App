
let username = localStorage.getItem("username");

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

   
$('#login-form').submit(function(event) {
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();

    $.post("/login", {username, password}, function(data) {
        if(data.username === username){
            localStorage.setItem("username", username);
            document.open('main.html', '_self', '');
         }
         else{
              alert('username or password are incorrect !!!');
            }
    });
});

$('#reg-form').submit(function(event) {
        event.preventDefault();
        const username = $('#username_reg').val();
        const password = $('#password_reg').val();
        $.post("/users", {username, password},  function(data) {  
            $('#username_reg').val('');
            $('#password_reg').val('');  
        });
});

$("#sign-in").click(function() {
    const username = $('#username').val();
    const password = $('#password').val();
    $.get("/UserByUsername", {
      username
    }, function(data) {
      if(data.username === username){
        alert("Account with this username already exists");
      }
      else if(!username  || !password){
        alert("All fields are required");
      }
    });
  });



