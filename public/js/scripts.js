// $.get("/students", function(data) {
//     $('#studentList').html(
//         data.map(single => {
//             return `<li class="list-group-item">${single.email}</li>`
//         })
//     );
// });

// $('#studentForm').submit(function(event) {
//     event.preventDefault();

//     const email = $('#studentEmail').val();
//     const password = $('#studentPassword').val();
//     const project = $('#studentProject').val();

//     $.post("/students", {email, password, project},  function(data) {
//         $('#studentEmail').val('');
//         $('#studentPassword').val('');
//         $('#studentProject').val('');
//     });
// })
