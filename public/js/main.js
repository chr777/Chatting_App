$.get("/users", function(data) {
    $('#users-list').html(
        data.map(single => {
            return `<li class="media">
            <div class="media-body">
                <div class="media">
                    <div class="media-body" >
                        <h5>${single.user} </h5>
                       <small class="text-muted">Active From 3 hours</small>
                    </div>
                </div>
            </div>
        </li>`
        })
    );
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