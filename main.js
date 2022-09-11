let nameInput = document.querySelector(".name-input");
let spendInput = document.querySelector(".number-input");
let itemInput = document.querySelector(".item-input");
let addBtn = document.querySelector("#add-btn");
let spendingList = document.querySelector("#spending-list");
let totalSpending = document.querySelector(".total-spending");
let personalSpending = document.querySelector(".personal-spending");
let countBtn = document.querySelector("#count-btn");
let splitBillList = document.querySelector(".split-bill-list");
let eachPay = document.querySelector(".each-pay");
let groupList = document.querySelector(".group-list");

let personalArray = [];
let countBtnClickTimes = 0;
let sum = 0;
let pay = 0;
totalSpending.innerHTML = `<h2 class="price-number">${sum}</h2>`;
eachPay.innerText = `${pay}`;

// Show Personal Spending List
function showPersonalSpending(length) {
    let personalSpendingString = "";
    for (i = 0; i < length; i++) {
        if (personalArray[i].spend > 0) {
            personalSpendingString += `<p>${personalArray[i].name}${personalArray[i].spend}</p>`;
        }
    }
    personalSpending.innerHTML = personalSpendingString;
}

// Show Total Spending
function showTotalSpending(arr) {
    let sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i].spend;
    }
    totalSpending.innerHTML = `<h2 class="price-number">${sum}</h2>`;
    showEachPay(sum);
}

// Push personal Spending
function pushPersonalSpending() {
    let nameInputValue = nameInput.value;
    let spendInputValue = Number(spendInput.value);
    let itemInputValue = itemInput.value;
    let nameIndexOf = personalArray
        .map(function (item, index) {
            return item.name;
        })
        .indexOf(nameInputValue);
    if (personalArray.length <= 0) {
        personalArray.push({
            name: nameInputValue,
            spend: spendInputValue
        });
    } else if (personalArray.length > 0) {
        if (nameIndexOf >= 0) {
            personalArray[nameIndexOf].spend += spendInputValue;
        } else {
            personalArray.push({
                name: nameInputValue,
                spend: spendInputValue
            });
        }
    }
    showTotalSpending(personalArray);
    showPersonalSpending(personalArray.length);
}

// Show Person
function showPerson(arr) {
    let group = "";
    for (i = 0; i < personalArray.length; i++) {
        group += `<p class="member">${arr[i].name}</p>`;
    }
    groupList.innerHTML = group;
    console.log(group);
}

// Show spend Info
function showSpendInfo() {
    //  show spend list
    let nameInputValue = nameInput.value;
    let spendInputValue = Number(spendInput.value);
    let itemInputValue = itemInput.value;
    if (nameInputValue.length > 0 && itemInputValue.length > 0) {
        spendingList.innerHTML += ` <tr>
            <td>${nameInputValue}</td>
            <td>${spendInputValue}</td>
            <td>${itemInputValue}</td>
            <td><i class="delete fa fa-trash"></i></td>
          </tr>`;
        pushPersonalSpending();
        inputValueCleared();
    } else {
        alert`ALERT! Please check out the row of "name" or "item" is totally correct.`;
    }
}

// Input Value Cleared
function inputValueCleared() {
    document.getElementById("name-input").value = "";
    document.getElementById("number-input").value = "";
    document.getElementById("item-input").value = "";
}

// Show Each Pay
function showEachPay(amount) {
    let pay = Math.round(amount / personalArray.length);
    eachPay.innerText = `${pay}`;
}

// Event: Count Button Active Once
countBtn.addEventListener("click", function () {
    if (countBtnClickTimes < 1) {
        showSplitBillList();
        countBtnClickTimes++;
    } else {
        alert("You are all set!");
    }
});

// Event: Touch addBtn button
addBtn.addEventListener("click", function () {
    showSpendInfo();
    showPerson(personalArray);
});

// Event: Keydown Enter
document.addEventListener("keydown", function () {
    if (event.key === "Enter") {
        showSpendInfo();
        showPerson(personalArray);
    }
});

// Event: Remove Spend List / Total Spending / Personal Spending
document.addEventListener("click", function (event) {
    let target = event.target;
    if (target.classList.contains("delete")) {
        let parentElement = target.parentElement;
        let grandParentElement = parentElement.parentElement;
        let nameRemoved = parentElement.parentNode.children[0].innerText;
        let spendRemoved = Number(parentElement.parentNode.children[1].innerText);
        grandParentElement.remove();
        personalArray.forEach((object) => {
            if (object.name === nameRemoved) {
                object.spend -= spendRemoved;
                if (object.spend <= 0) {
                    let indexOf = personalArray.indexOf(object);
                    personalArray.splice(indexOf, 1);
                }
                showPerson(personalArray);
                showTotalSpending(personalArray);
                showPersonalSpending(personalArray.length);
            }
        });
    }
});

// Event: Touch countBtn button
countBtn.addEventListener("click", function () {
    console.log(personalArray)
    let result = ""
    for (let i = 0; i < personalArray.length; i++) {
        let isPay = false;
        for (let j = 0; j < personalArray.length; j++) {
            if (personalArray[j].name != personalArray[i].name) {
                if (personalArray[i].spend / personalArray.length < personalArray[j].spend / personalArray.length) {
                    isPay = true;
                    result += `
                    <tr>
                      <td>${personalArray[i].name}</td>
                      <td>pay <span>$${Math.round(personalArray[j].spend / personalArray.length) - Math.round(personalArray[i].spend / personalArray.length)}</span> to</td>
                      <td>${personalArray[j].name} </td>
                    </tr>
                    `
                }
            }
        }
        if (isPay == false) {
            result += `
            <tr>
              <td>${personalArray[i].name}</td>
              <td>doesn't need to pay</td>
            </tr>
            `
        }
        result += `<tr class="line">
                    <td></td>
                    <td>- - - - - - - - </td>
                    <td></td>
                </tr>`
        console.log(result)
        splitBillList.innerHTML = result
    }
})

