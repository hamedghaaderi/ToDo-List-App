var input = document.getElementById("task-input");
var resultContainer = document.getElementById("result-container");
var all = document.getElementById("all");
var pending = document.getElementById("pending");
var completed = document.getElementById("completed");
var clearBtn = document.getElementById("clear-btn");
var items = [];

input.addEventListener("keyup", function (event) {
  var inputValue = input.value.trim();

  if (event.key === "Enter" && inputValue) {
    var item = {
      todoTitle: inputValue,
      todoStatus: "pending",
    };
    items.push(item);
    input.value = "";
    showToDoItem("all");
    all.classList.add("active-filter");
    pending.classList.remove("active-filter");
    completed.classList.remove("active-filter");
  }
});

function showToDoItem(filter) {
  if (items.length > 0) {
    var empty = document.getElementById("empty");

    if (empty) {
      empty.remove();
    }

    clearBtn.classList.add("active-btn");
    clearBtn.removeAttribute("disabled");

    var li = "";

    items.forEach(function (item, index) {
      if (item.todoStatus === filter || filter === "all") {
        if (item.todoStatus === "completed") {
          var completedStatus = "checked";
        } else {
          var completedStatus = "";
        }
        li += `
              <li id="item-${index}">
                  <div>
                    <input
                        type="checkbox"
                        ${completedStatus}
                        id="item-input-${index}"
                        onclick="updateToDoItem(event, ${index})"/>
                    <label
                        for="item-input-${index}"
                        class="${completedStatus}">${item.todoTitle}</label>
                  </div>
                  <div>
                    <i class="edit"></i>
                    <i class="delete"></i>
                  </div>
              </li>
              `;
      }
    });

    resultContainer.innerHTML = li;
  } else {
    var li = `
            <li id="empty">You don't have any task here</li>
            `;
    resultContainer.innerHTML = li;
  }
}

showToDoItem("all");
