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

    // Delete Memory given ID and Title
    // function delMemory(id, title) {
    function delMemory(title, tags, desc) {
        let self = this;
        let urlString = "http://localhost:5000/memory/api?Title=" + title + "&Tags=" + tags + "&Description=" + desc;
        $.ajax({
            url: urlString,
            dataType: 'json',
            type: 'DELETE',
            data: null, 
            contentType: 'application/json;charset=utf-8',
            success: function (memories) {
                alert("Deleted memory id # " + memories[0]._id);
            },
            error: function (x, y, z) {
                alert("Error deleting memory: " + x.responseText);
            }
        });
    }

    // Update Memory given ID and Title
    // ToDo: Since I now support row selection, do not need to pass id and title
    function updateMemory(id, title) {
        let self = this;
        let urlString = "http://localhost:5000/memory/api";
        let tags = $("#inputTags").val();
        let date = $("#inputDate").val();
        let description = $("#inputDescription").val();
        let url = $("#inputUrl").val();
        let note = $("#inputNote").val();
        let queryStr = "?id=" + id + "&Title=" + title + "&Tags=" + tags 
            + "&Date=" + date + "&Description=" + description + "&Url=" + url + "&Note=" + note;
        $.ajax({
            url: urlString + queryStr,
            dataType: 'json',
            type: 'PUT',
            data: null, 
            contentType: 'application/json;charset=utf-8',
            success: function (res) {
                console.log("Update memory success");
                // Update display automatically when updating MMs
                self.getByTitle(res.title);
            },
            error: function (x, y, z) {
                console.log("Error updating memory: " + x.responseText);
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
                // '<div class="col-sm-1">' +
                // memory._id +
                // '</div>' +
                '<div class="col-sm-3">' +
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
                '<div class="col-sm-2">' +
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
        $(".mm").off().on("click", function() {
            info = this.outerText.split("\n");
            //let volume = info[0];
            let title = info[0];
            let tags = info[1];
            let date = info[2];
            let description = info[3];
            let url = info[4];
            let note = info[5];
            console.log("Title = " + title);
            // $("#inputVolume").val(volume);
            $("#inputTitle").val(title);
            $("#inputTags").val(tags);
            $("#inputDate").val(date);
            $("#inputDescription").val(description);
            $("#inputUrl").val(url);
            $("#inputNote").val(note);
            // self.displayImage(imgName);
        });
    }

    function displayImage(imgName) {
        $("#resultsImg").html('<img src="' + 
            "http://localhost:5000/images/" + imgName + '" width="400" height="600"/>');
    }

    // Sort numerically (rather than alpha default)
    function sortNumber(a, b) {
        // return a[0] - b[0]; // Array syntax
        return a.volume - b.volume; // Object syntax
    }