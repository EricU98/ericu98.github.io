//TODO Get current List + Load current List

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
function removeItem(value) {
   $(document).ready(function () {
      var items = JSON.parse(localStorage.getItem("items"));
      var index = items.indexOf(value);
      if (index > -1) {
         items.splice(index, 1);
      }
   });
}

$(document).ready(function () {
   $(".list-group-item").click(function () {
      console.log("AAAAA");
   });
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
         //showErrorAlert();
      }

      reload();
      $(input).val("");
   });
}

$(document).ready(function () {
   // $("#btn-dark").click(function () {
   //    $("#btn-dark").fadeTo(500, 0, function () {
   //       $("#btn-light").fadeTo(500, 0);
   //    });
   // });

   $("#btn-light").click(function () {
      $("btn-light").fadeTo(500, 0, function () {
         $("#btn-dark").fadeTo(500, 0);
      });
   });
});

//ANCHOR - Save List in locale Storage
$(document).ready(function () {
   $("#btn-save-list").click(function () {
      var listName = $("#input-list-name").val();
      if (listName != "") {
         items = [];
         var listen = JSON.parse(localStorage.getItem("listen"));
         if (!listen) {
            listen = [];
            localStorage.setItem("listen", JSON.stringify(listen));
         }
         var items = JSON.parse(localStorage.getItem("items"));
         localStorage.setItem(listName, JSON.stringify(items));
         localStorage.setItem("currentList", listName);

         console.log(
            "Liste mit dem Namen '" + listName + "' erfolgreich gespeichert"
         );

         $("#input-list-name").val("");
      } else {
         showErrorAlertModal();
         //console.log("Der Name der Liste darf nicht leer sein!");
      }
   });
});

//Show Error Alert
function showErrorAlertModal() {
   $(document).ready(function () {
      $("#modal-error-alert").show("shake", {}, 400, function () {
         setTimeout(function () {
            $("#modal-error-alert").fadeOut(100);
         }, 3000);
      });
   });
}

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

$(document).ready(function () {
   $("#btn-settings-mobile").click(function () {
      $("#settings-mobile").show("fold", function () {
         setTimeout(function () {
            $("#settings-mobile").hide("fold");
         }, 10000);
      });
   });
});

$(document).ready(function () {
   $("#btn-settings-desktop").click(function () {
      $("#settings-desktop").show(function () {
         setTimeout(function () {
            $("#settings-desktop").hide("drop");
         }, 3000);
      });
   });
});

//Download List as Json File
//TODO Add Custom File Name
//TODO Add List Selection
$(document).ready(function () {
   $("#btn-download").click(function () {
      var data = localStorage.getItem("items");
      var array = JSON.parse(data);

      var json = JSON.stringify(array);
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);

      var a = document.createElement("a");
      a.download = "array.json";
      a.href = url;
      a.click();
   });
});

//Upload Json File
//TODO Add Custom List Name Input
//TODO Set added List to currentList + refresh if needed
$(document).ready(function () {
   $("#btn-upload").click(function () {
      $("#fileInput").trigger("click");
   });

   $("#fileInput").change(function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
         var json = reader.result;
         var array = JSON.parse(json);
         localStorage.setItem("items", JSON.stringify(array));
      };
   });
});

$(function () {
   $("#itemList").sortable();
});
