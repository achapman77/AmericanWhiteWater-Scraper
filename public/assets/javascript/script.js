$(function () {
    alert("hello");
    
    $(".saveRiverSection").on("click", function () {
        const id = $(this).parents("li").data("riverSection-id");

        $.ajax({
            method: "PUT",
            url: `/api/riverSections/${id}`,
            data: { saved: true }
        }).then(function (response) {
            window.location.assign("/saved");
        });
    });

    $(".deleteRiverSection").on("click", function () {
        const id = $(this).parents("li").data("riverSection-id");
        
        $.ajax({
            method: "DELETE",
            url: `/api/riverSections/${id}`,
        }).then(function (response) {
            window.location.assign("/");
        });
    });

    $(".editNote, .addNote").on("click", function () {
        $(this).siblings("form").show();
        $(this).hide();
    });

    $(".editForm").on("submit", function (event) {
        event.preventDefault();
        const id = $(this).siblings(".note").data("note-id");
        const text = $(this).children("input").val().trim();

        $.ajax({
            method: "PUT",
            url: `/api/notes/${id}`,
            data: { text }
        }).then(function (response) {
            location.reload();
        })

    });

    $(".addForm").on("submit", function (event) {
        event.preventDefault();
        const riverSectionId = $(this).parents("li").data("riverSection-id");
        const text = $(this).children("input").val().trim();
        
        $.ajax({
            method: "POST",
            url: `/api/notes/`,
            data: { 
                riverSectionId,
                text
            }
        }).then(function (response) {
            location.reload();
        })

    })


});