// This function illustrates how to use an ajax call to communicate 
// with a server API.

// Get all Memories
function getAllMemories() {
    let self = this;
    let urlString = "http://localhost:5000/memory/list/";
    $.ajax({
        url: urlString,
        dataType: 'json',
        type: 'GET',
        data: null,
        contentType: 'application/json;charset=utf-8',
        success: function (memories) {
            console.log("get all memories success");
            self.displayResults(memories);
        },
        error: function (x, y, z) {
            console.log("Error getting all memories: " + x.responseText);
        }
    });
}

// Get all Memories of given Title
function getByTitle(title) {
    let self = this;
    let urlString = "http://localhost:5000/memory/api?Title=" + title;
    $.ajax({
        url: urlString,
        dataType: 'json',
        type: 'GET',
        data: null,
        contentType: 'application/json;charset=utf-8',
        success: function (memories) {
            console.log("Get all memories by Title Success");
            self.displayResults(memories);
        },
        error: function (x, y, z) {
            console.log("Error getting all memories by title: " + x.responseText);
        }
    });
}

// Get all Memories of given Tags
function getByTags(tags) {
    let self = this;
    let urlString = "http://localhost:5000/memory/api?Tags=" + tags;
    $.ajax({
        url: urlString,
        dataType: 'json',
        type: 'GET',
        data: null,
        contentType: 'application/json;charset=utf-8',
        success: function (memories) {
            console.log("Get all memories by Tags Success");
            self.displayResults(memories);
        },
        error: function (x, y, z) {
            console.log("Error getting all memories by tags: " + x.responseText);
        }
    });
}

// // Delete Memory given Title, Tags, Description
// function delMemory(title, tags, desc) {
//     let self = this;
//     let urlString = "http://localhost:5000/memory/api?Title=" + title + "&Tags=" + tags + "&Description=" + desc;
//     $.ajax({
//         url: urlString,
//         dataType: 'json',
//         type: 'DELETE',
//         data: null, 
//         contentType: 'application/json;charset=utf-8',
//         success: function (memories) {
//             alert("Deleted memory id # " + memories[0]._id);
//         },
//         error: function (x, y, z) {
//             alert("Error deleting memory: " + x.responseText);
//         }
//     });
// }

// // Update Memory given Title, Tags, Description
// function updateMemory(title, tags, desc) {
//     let self = this;
//     let urlString = "http://localhost:5000/memory/api?Title=" + title + "&Tags=" + tags + "&Description=" + desc;
//     $.ajax({
//         url: urlString,
//         dataType: 'json',
//         type: 'PUT',
//         data: null, 
//         contentType: 'application/json;charset=utf-8',
//         success: function (memories) {
//             alert("Updated memory id # " + memories[0]._id);
//         },
//         error: function (x, y, z) {
//             alert("Error updating memory: " + x.responseText);
//         }
//     });
// }

// Update Memory given ID and Title
// ToDo: Since I now support row selection, do not need to pass id and title
function updateMemory(id, title) {
    let self = this;
    let urlString = "http://localhost:5000/memory/api";
    let data = {};
    data.id = id;
    data.Title = title;
    data.Tags = $("#inputTags").val();
    data.Date = $("#inputDate").val();
    data.Description = $("#inputDescription").val();
    data.URL = $("#inputUrl").val();
    data.Note = $("#inputNote").val();
    $.ajax({
        url: urlString,
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=utf-8',
        success: function (memories) {
            let memory = memories;
            if (Array.isArray(memories)) {
                memory = memories[0];
            }
            console.log("Update memory success for id = " + memory._id);
            // displayResults(memories);
            getAllMemories();
        },
        error: function (x, y, z) {
            alert("Error updating memory: " + x.responseText);
        }
    });
}

// Delete Memory given ID and Title
function delMemory(id, title) {
    let self = this;
    let urlString = "http://localhost:5000/memory/api?Id=" + id + "Title=" + title;
    $.ajax({
        url: urlString,
        dataType: 'json',
        type: 'DELETE',
        data: null,
        contentType: 'application/json;charset=utf-8',
        success: function (memories) {
            getAllMemories();
            let memory = memories;
            if (Array.isArray(memories)) {
                memory = memories[0];
            }
            alert("Deleted memory id = " + memory._id + "; Title = " + memory.Title);
        },
        error: function (x, y, z) {
            alert("Error deleting memory: " + x.responseText);
        }
    });
}

function displayResults(memories) {
    //memories.sort(sortNumber);
    // Objects have been created, can now display them
    $("#results").html("</br>");
    memories.forEach(memory => {
        // Dynamically insert a new row for dispaly
        $("#results").append(
            '<div class="row mm">' +
            '<div class="col-sm-1" style="overflow: hidden">' +
            memory._id +
            '</div>' +
            '<div class="col-sm-2">' +
            memory.Title +
            '</div>' +
            '<div class="col-sm-2">' +
            memory.Tags +
            '</div>' +
            '<div class="col-sm-1">' +
            memory.Date +
            '</div>' +
            '<div class="col-sm-1">' +
            memory.Description +
            '</div>' +
            '<div class="col-sm-1" style="overflow: hidden">' +
            memory.URL +
            '</div>' +
            '<div class="col-sm-1">' +
            memory.Note +
            '</div>' +
            '<div class="col-sm-1">' +
            // memory.imgName +
            // '</div>' +
            '</div>'
        );
    });
    $("#results").append("<br>Total = " + memories.length);

    this.addClickHandlers();
}

function addClickHandlers() {
    let self = this;
    $(".mm").off().on("click", function () {
        info = this.outerText.split("\n");
        let id = info[0];
        let title = info[1];
        let tags = info[2];
        let date = info[3];
        let description = info[4];
        let url = info[5];
        let note = info[6];
        console.log("Title = " + title);
        $("#inputId").val(id);
        $("#inputTitle").val(title);
        $("#inputTags").val(tags);
        $("#inputDate").val(date);
        $("#inputDescription").val(description);
        $("#inputUrl").val(url);
        $("#inputNote").val(note);
        self.displayImage(url);
    });
}

function displayImage(imgName) {
    $("#resultsImg").html('<img src="' +
        "http://localhost:5000/Photos/" + imgName + '" width="500" height="600"/>');
}

// Sort numerically (rather than alpha default)
function sortNumber(a, b) {
    // return a[0] - b[0]; // Array syntax
    return a.volume - b.volume; // Object syntax
}