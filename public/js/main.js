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

            <div class="media-body">

                <div class="media">
                    <a class="pull-left" href="#">
                        <img class="media-object img-circle " src="public/pictures/user2.jpg" />
                    </a>
                    <div class="media-body" >
                    ${single.text}
                        <br />
                       <small class="text-muted">${single.username} | ${single.date}</small>
                        <hr />
                    </div>
                </div>

            </div>
        </li>`
        })
    );
});

$('#message-form').submit(function(event) {
    event.preventDefault();
    const message = $('#m-text').val();
    $.post("/messages", {message},  function(data) {

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