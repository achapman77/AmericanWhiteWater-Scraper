$(function () {
    
    $(".saveRiverSection").on("click", function () {
        const id = $(this).parents("tr").data("river-section-id");
        console.log(id)
        $.ajax({
            method: "PUT",
            url: `/api/riverSections/${id}`,
            data: { saved: true }
        }).then(function (response) {
            window.location.assign("/saved");
        });
    });

    $(".deleteRiverSection").on("click", function () {
        const id = $(this).parents("tr").data("river-section-id");
        
        $.ajax({
            method: "DELETE",
            url: `/api/riverSections/${id}`,
        }).then(function (response) {
            window.location.assign("/");
        });
    });

    // $("form").hide()

    // $(".editNote, .addNote").on("click", function () {
    //     $(this).siblings("form").show();
    //     $(this).hide();
    // });

    $(".editForm").on("submit", function (event) {
        event.preventDefault();
        const id = $(this).data("note-id");
        const text = $(this).children("input").val().trim();
        console.log("Note Edit ID: ", id)
        console.log("Note edit text: ", text);
        $.ajax({
            method: "PUT",
            url: `/api/notes/${id}`,
            data: { text }
        }).then(function (response) {
            console.log("Add form res:", response);
            location.reload();
        })

    });

    $(".addForm").on("submit", function (event) {
        event.preventDefault();
        const riverSectionID = $(this).parents("tr").data("river-section-id");
        const text = $(this).children("input").val().trim();
        console.log("Note Add: ",riverSectionID)
        console.log("Note Add: ", text);
        $.ajax({
            method: "POST",
            url: `/api/notes/`,
            data: { 
                riverSectionID,
                text
            }
        }).then(function (response) {
            console.log("Add form res:", response);
            location.reload();
        })

    })

    $(".scrape-new").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/riverSections/scrape"
        }).then(function (response) {
            window.location.assign("/");
        })
    })

    $(".clear-all").on("click", function () {
        $.ajax({
            method: "GET",
            url: "/api/riverSections/clear"
        }).then(function (response) {
            window.location.assign("/");
        })
    })

});