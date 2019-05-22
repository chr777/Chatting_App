
let username = localStorage.getItem("username");

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });

   
$('#login-form').submit(function(event) {
    event.preventDefault();
    let username = $('#username').val();
    let password = $('#password').val();

    $.get("/login", {username, password}, function(data) {
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
        const username = $('#username').val();
        const password = $('#password').val();
        $.post("/users", {username, password},  function(data) {
  
            $('#firstname').val('');
            $('#lastname').val('');
            $('#userEmail').val('');
            $('#userPassword').val('');
  
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




// $.get("/students", function(data) {
//     $('#studentList').html(
//         data.map(single => {
//             return `<li class="list-group-item">${single.email}</li>`
//         })
//     );
// });

// (function() {
//     var  socket  =  io();
//     $("form").submit(function(e) {
//         e.preventDefault(); // prevents page reloading
//         socket.emit("chat message", $("#m").val());
//         $("#m").val("");
//     return  true;
// });
// })();