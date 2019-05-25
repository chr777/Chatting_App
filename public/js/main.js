
loc_username = localStorage.getItem("loc_username");

console.log(loc_username);

if(loc_username){
    $.get("/users", function(data) {
        $('#users-list').html(
            data.map(single => {
                return `<li class="media">
                <div class="media-body">
                    <div class="media">
                        <div class="media-body" >
                            <h5>${single.username} </h5>
                        </div>
                    </div>
                </div>
            </li>`
            })
        );
    });
    
    $.get("/messages", function(data) {
        $('#message-list').html(
            data.map(single => {
                return `<li class="media">
                <div class="media-body" >
                    <div class="media">
                        <div class="media-body" >
                        ${single.text}
                            <br />
                           <small class="text-muted">${single.from} | ${single.date}</small>
                            <hr />
                        </div>
                    </div>
                </div>
            </li>`
            })
        );
    });

}


$('#message_button').submit(function(event) {
    event.preventDefault();
    const text = $('#m-text').val();
    const username = loc_username;
    console.log(text);
    $.post("/messages", {username, text},  function(data) {
        username;
        $('#m-text').val('');
    });
});



// (function() {
//     var  socket  =  io();
//     $("form").submit(function(e) {
//         e.preventDefault(); // prevents page reloading
//         socket.emit("chat message", $("#m").val());
//         $("#m").val("");
//     return  true;
// });
// })();