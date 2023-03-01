//ANCHOR Item Class
class Item {
   constructor(name, description, checked) {
      this.name = name;
      this.description = description;
      this.checked = checked;
   }
}

//ANCHOR Initial Check
function initialCheck() {
   const lists = localStorage.getItem("lists");
   const activeList = localStorage.getItem("activeList");
   const itemListJson = localStorage.getItem(activeList);
   if (!lists) {
      localStorage.setItem("lists", "[]");
   }
   if (!activeList) {
      localStorage.setItem("activeList", null);
   }
   if (!itemListJson) {
      $("#modal-createList").modal("show");
   }
   renderItemList();
}

function addList(listName) {
   itemList = '{"itemList":[]}';
   localStorage.setItem(listName, itemList);
}

//ANCHOR Add Item Function
function addItem(name, description, checked) {
   // Retrieve the existing itemList from local storage
   const activeList = localStorage.getItem("activeList");
   const itemListJson = localStorage.getItem(activeList);

   const itemList = JSON.parse(itemListJson);

   // Check if an item with the same name already exists in the itemList
   const itemExists = itemList.itemList.some((item) => item.name === name);

   if (!itemExists) {
      // If an item with the same name does not exist, create a new Item object and add it to the itemList array
      const newItem = new Item(name, description, checked);
      itemList.itemList.push(newItem);

      // Convert the updated itemList object to a JSON string
      const updatedItemListJson = JSON.stringify(itemList);

      // Store the updated itemList in local storage
      localStorage.setItem(activeList, updatedItemListJson);

      renderItemList();
   } else {
      showErrorMessage("1002");
   }
}

$(document).ready(function () {
   initialCheck();
});

//ANCHOR Render Items Function
function renderItemList() {
   // Retrieve the name of the active List
   const activeList = localStorage.getItem("activeList");
   // Retrieve the itemList from local storage
   const itemListJson = localStorage.getItem(activeList);
   const itemList = JSON.parse(itemListJson);

   // Get a reference to the #itemList element in the DOM
   const $itemListElement = $("#itemList");

   // Clear any existing items from the #itemList element
   $itemListElement.empty();

   // Loop through each item in the itemList and append a link to the #itemList element
   itemList.itemList.forEach((item) => {
      const $link = $(
         "<a id='" +
            item.name +
            "' class='list-group-item list-group-item-action list-group-item-info'>" +
            item.name +
            "</a>",
         {}
      );
      //const $listItem = $("<li>").append($link);
      $itemListElement.append($link);
   });
}

//ANCHOR - List item remover
$(document).ready(function () {
   const activeList = localStorage.getItem("activeList");
   // Add a click event listener to each a element in the #itemList element
   $("#itemList").on("click", "a", function (event) {
      // Prevent the default link behavior
      event.preventDefault();

      // Get the ID of the clicked a element
      const id = $(this).attr("id");

      // Retrieve the existing itemList from local storage
      const itemListJson = localStorage.getItem(activeList);
      const itemList = JSON.parse(itemListJson);

      // Remove the item from the itemList with the corresponding ID
      itemList.itemList = itemList.itemList.filter((item) => item.name !== id);

      // Convert the updated itemList object to a JSON string
      const updatedItemListJson = JSON.stringify(itemList);

      // Store the updated itemList in local storage
      localStorage.setItem(activeList, updatedItemListJson);

      // Remove the clicked a element from the DOM
      $(this).remove();
      initialCheck();
   });
});

//SECTION - Button Handler

$(document).ready(function () {
   //ANCHOR Add Item Button Click Handler
   function addItemClick(inputId) {
      var text = $(inputId).val();
      if (text != "") {
         addItem(text, "", true);
      } else {
         showErrorMessage("1001");
      }
   }

   $("#addItem-desktop").click(function () {
      addItemClick("#newItem-desktop");
   });
   $("#addItem-mobile").click(function () {
      addItemClick("#newItem-mobile");
   });

   //ANCHOR - Reset ItemList
   function clearItemList() {
      const activeList = localStorage.getItem("activeList");
      localStorage.removeItem(activeList);
      itemList = '{"itemList":[]}';
      localStorage.setItem(activeList, itemList);
   }

   //ANCHOR - Reset Item Button Click Handler
   $("#resetItem-desktop, #resetItem-mobile").click(function () {
      clearItemList();
      initialCheck();
   });

   //ANCHOR - Modal - Add List Button CLick Handler
   $("#btn-modal-newList").click(function () {
      var $text = $("#input-newList").val();
      if ($text != "") {
         addList($text);
         $("#modal-createList").modal("hide");
         //TODO - set this List to current List
         localStorage.setItem("activeList", $text);
         //Add this List to "lists" in local storage
         const list = JSON.parse(localStorage.getItem("lists"));
         list.push($text);
         localStorage.setItem("lists", JSON.stringify(list));
      }
   });
});

//!SECTION

//ANCHOR - Autocomplete
//Uses Words in Json File for autocomplete
$(document).ready(function () {
   $.getJSON("words.json", function (data) {
      $(".input-item").autocomplete({
         source: data,
      });
   });
});

//ANCHOR Error Handler - 1
function showErrorAlert(message) {
   $(document).ready(function () {
      $("#error-message").text(message);
      $("#error-alert").show("shake", {}, 400, function () {
         setTimeout(function () {
            $("#error-alert").fadeOut(100);
         }, 3000);
      });
   });
}

//ANCHOR Error Handler - 2
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
      showErrorAlert(errorMessage);
   });
}
