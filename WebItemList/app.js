$(document).ready(function () {
   //ANCHOR - Get Items
   reload();
});

//ANCHOR - Reset Items
$(document).ready(function () {
   $("#resetItem").click(function () {
      localStorage.removeItem("items");
      reload();
   });
});

//ANCHOR - Reload List
function reload() {
   $(document).ready(function () {
      $("a.list-group-item").remove();

      var items = JSON.parse(localStorage.getItem("items"));

      if (items !== null) {
         for (var i = 0; i < items.length; i++) {
            $("#itemList").append(
               "<a id='removeItem' href='#' class='list-group-item list-group-item-action list-group-item-info'>" +
                  items[i] +
                  "</a>"
            );
         }
      }
   });
}

//TODO - Add Function to Remove single items from List
//ANCHOR - Remove Item
$(document).ready(function () {
   //Removes the item from List - <li>
   // $("#resetItem").click(function () {
   //    window.alert("TEST");
   // });
});

$(document).ready(function () {
   //ANCHOR - Add Item
   $("#addItem").click(function () {
      var items = JSON.parse(localStorage.getItem("items"));
      var text = $("#newItem").val();

      //Check if Array alerady exists in Local Storage
      if (!items) {
         items = [];
         localStorage.setItem("items", JSON.stringify(items));
      }

      //Check if input is empty
      if (text != "") {
         items.push(text);

         localStorage.setItem("items", JSON.stringify(items));
      } else {
         console.log("Input darf nicht leer sein!");
      }

      reload();
      $("#newItem").val("");
   });
});

//Uses Words in Json File for autocomplete
$(document).ready(function () {
   $.getJSON("words.json", function (data) {
      $("#newItem").autocomplete({
         source: data,
      });
   });
});
