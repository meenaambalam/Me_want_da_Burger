// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    //AJAX PUT call to UPDATE the burger to devoured state, when devourBurger button is clicked
    $(".devourBurger").on("click", function(event) {
      var id = $(this).data("id");
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT"
      }).then(
        function() {
          console.log("clicked on devour Id: ", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    
    //AJAX POST call yo Insert new burger record with the burgername, when the form is submitted (devoured state is hard-coded to "0" in the controller file)
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      
      var newBurger = {
        name: $("#burger").val().trim()
      };

      if (newBurger.name == ""){
        alert("Please enter a value. Input cannot be empty!");
        return false;
      }else{
          // Send the POST request.
        $.ajax("/api/burgers", {
          type: "POST",
          data: newBurger
        }).then(
          function() {
            console.log("created new Burger");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      }
    });
    
    //AJAX Delete call to Delete the burger matching the specific Id, when the deleteBurger button is clicked
    $(".deleteBurger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted Burger: ", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  