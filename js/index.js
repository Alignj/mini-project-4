//selects
let inputValue = document.getElementById("input-item");
let filter = document.getElementById("filter-item");
let addItemBtn = document.getElementById("submit");
let itemParent = document.getElementById("items-container");
let form = document.getElementById("form");
let Error = document.getElementById("invalid");
let clearBtn = document.getElementById("clear");
//displayItems func
function displayItems() {
  let itemFromStorage = getItemStorage();
  itemFromStorage.forEach((item) => {
    createItem(item);
    checkUi();
  });
}
//submited func
function submited(e) {
  e.preventDefault();
  //validate
  if (inputValue.value == "") {
    Error.innerText = "Please Fill The Field";
    return;
  } else {
    Error.innerText = "";
  }

  addStorage(inputValue.value);
  createItem(inputValue.value);
  inputValue.value = "";
  checkUi();
}
//submited form event
form.addEventListener("submit", submited);

//create item func
function createItem(itemValue) {
  let item = document.createElement("div");
  item.id = "item";
  itemParent.appendChild(item);
  item.innerText = itemValue;
  console.log(inputValue.value);
  //create x icon
  let icon = document.createElement("div");
  icon.id = "xicon";
  item.appendChild(icon);
  //remove item func
  icon.addEventListener("click", () => {
    item.remove();
    checkUi();
  });
}

//get item from local storage func
function getItemStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}
//add item to storage
function addStorage(item) {
  itemFromStorage = getItemStorage();
  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}
//clear btn func
clearBtn.addEventListener("click", () => {
  itemParent.innerHTML = "";
  checkUi();
});
//check Ui func
function checkUi() {
  let check = itemParent.querySelectorAll("div");
  if (check.length == 0) {
    clearBtn.style.display = "none";
    filter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    filter.style.display = "block";
  }
}
checkUi();
//filter func
function filterfn(e) {
  let items = itemParent.querySelectorAll("div");
  let text = e.target.value.toLowerCase();
  items.forEach((item) => {
    if (item.textContent.indexOf(text) == -1) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
}
//filter event
filter.addEventListener("input", filterfn);
//dom listener
document.addEventListener("DOMContentLoaded", displayItems);
