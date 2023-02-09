$(document).ready(function () {
   //ANCHOR - Get Items
   reload();
});

//ANCHOR - Reset Items
$(document).ready(function () {
   $("#resetItem-desktop").click(function () {
      resetItems();
   });
   $("#resetItem-mobile").click(function () {
      resetItems();
   });
});
// "#resetItem"
function resetItems() {
   $(document).ready(function () {
      localStorage.removeItem("items");
      reload();
   });
}

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
   $("#addItem-desktop").click(function () {
      addNewItem("#newItem-desktop");
   });
   $("#addItem-mobile").click(function () {
      addNewItem("#newItem-mobile");
   });
});

//Uses Words in Json File for autocomplete
$(document).ready(function () {
   $.getJSON("words.json", function (data) {
      $(".input-item").autocomplete({
         source: data,
      });
   });
});

function addNewItem(input) {
   $(document).ready(function () {
      var items = JSON.parse(localStorage.getItem("items"));
      var text = $(input).val();

      //Check if the Array alerady exists in Local Storage
      //IF not -> create one
      if (!items) {
         items = [];
         localStorage.setItem("items", JSON.stringify(items));
      }

      //Check if input is empty
      if (text != null && text != "") {
         var exists = false;
         // Loop through items and check if the input.value already exists
         for (var i = 0; i < items.length; i++) {
            if (items[i] == text) {
               exists = true;
               break;
            }
         }

         //If input.value does not exists in Array/Local Storage
         //-> add to Array / Local Storage
         if (!exists) {
            items.push(text);
            localStorage.setItem("items", JSON.stringify(items));
         } else {
            showErrorMessage("1002");
         }
      } else {
         showErrorMessage("1001");
      }

      reload();
      $(input).val("");
   });
}

//Shows error message based on the error code passed in
function showErrorMessage(errorCode) {
   $.getJSON("error-messages.json", function (data) {
      var errorMessage = "Error message not found.";
      $.each(data.errorMessages, function (i, item) {
         if (item.errorCode === errorCode) {
            errorMessage = item.errorMessage;
            return false;
         }
      });
      console.log(errorMessage);
   });
}
