let nameInput = document.querySelector(".name-input");
let spendInput = document.querySelector(".number-input");
let itemInput = document.querySelector(".item-input");
let addBtn = document.querySelector("#add-btn");
let list = document.querySelector(".list");
let count = document.querySelector(".count");

let countArray = [];
let sum = 0;
count.innerHTML = `<h2 class="price-number">${sum}</h2>`;

function totalSpendingCounted(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    console.log(sum);
    count.innerHTML = `<h2 class="price-number">${sum}</h2>`;
}

function addCountArray(spend) {
    countArray.push(spend);
    totalSpendingCounted(countArray);
}

function totalSpendingDeleated(number) {
    let spendDeleated = -Math.abs(number);
    addCountArray(spendDeleated);
}

function inputValueCleared() {
    document.getElementById("name-input").value = "";
    document.getElementById("number-input").value = "";
    document.getElementById("item-input").value = "";
}

addBtn.addEventListener("click", function () {
    let nameInputValue = nameInput.value;
    let spendInputValue = Number(spendInput.value);
    let itemInputValue = itemInput.value;
    if (nameInputValue.length > 0 && itemInputValue.length > 0) {
        list.innerHTML += ` <tr>
            <td>${nameInputValue}</td>
            <td>${spendInputValue}</td>
            <td>${itemInputValue}</td>
            <td><i class="delete fa fa-trash"></i></td>
          </tr>`;
        addCountArray(spendInputValue);
        inputValueCleared();
    } else {
        alert`ALERT! Please check out the row of "name" or "item" is totally correct.`;
    }
});

document.addEventListener("keydown", function () {
    let nameInputValue = nameInput.value;
    let spendInputValue = Number(spendInput.value);
    let itemInputValue = itemInput.value;
    if (event.key === "Enter") {
        if (nameInputValue.length > 0 && itemInputValue.length > 0) {
            list.innerHTML += ` <tr>
            <td>${nameInputValue}</td>
            <td>${spendInputValue}</td>
            <td>${itemInputValue}</td>
            <td><i class="delete fa fa-trash"></i></td>
          </tr>`;
            addCountArray(spendInputValue);
            inputValueCleared();
        } else {
            alert`ALERT! Please check out the row of "name" or "item" is totally correct.`;
        }
    }
});

document.addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("delete")) {
        let parentElement = target.parentElement;
        let grandParentElement = parentElement.parentElement;
        let spendElement = Number(parentElement.parentNode.children[1].innerText);
        grandParentElement.remove();
        totalSpendingDeleated(spendElement);
    }
});

