 function display_diary() {
      var inputnum = $("#inputnum").val();
      //to check if the value is not empty
      if (inputnum == '') {
          $("#output").html("Gotta store some data");
      } else {
          // a line of code which takes value from the input boxes in insertdiaryinfo
          //defines URL
          var URL = "http://localhost:8080/";
          URL += opt + "?n=" + inputnum;
          // ajax to send Get req and receive data
          $.ajax({
              type: "GET",
              url: URL,
              data: {
                  'num': inputnum
              },
              dataType: "html",
              success: function(msg) {
                  $("#output").html(msg);
              },
              //shows error when server is unavailable
              error: function(xhr, ajaxOptions, thrownError) {
                  $("#output").html("Error fetching " + URL);
              }
          });
      }
  }
