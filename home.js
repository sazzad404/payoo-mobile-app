const validPin = 1536842;
const coupon = "sazzad50%";
let couponUsed = false;

const transactionData = [];

// function to get input values

function getInputValueNumber(id) {
	const inputField = document.getElementById(id);
	const inputFieldValue = inputField.value;
	const inputFieldValueNumber = parseInt(inputFieldValue);

	return inputFieldValueNumber;
}

function getInputValue(id) {
	const inputField = document.getElementById(id);
	const inputFieldValue = inputField.value;
	return inputFieldValue;
}

// functions to get innertexts

function getInnerText(id) {
	const element = document.getElementById(id);
	const elementValue = element.innerText;
	const elementValueNumber = parseInt(elementValue);

	return elementValueNumber;
}

//function to set innertext
function setInnerText(value) {
	const availableBalanceElement = document.getElementById("available-balance");
	availableBalanceElement.innerText = value;
}

//function to toggle
function handleToggle(id) {
	const forms = document.getElementsByClassName("form");

	for (const form of forms) {
		form.style.display = "none";
	}

	document.getElementById(id).style.display = "block";
}

//function to toggle button
function handleButtonToggle(id) {
	const formBtns = document.getElementsByClassName("form-btn");

	for (const btn of formBtns) {
		btn.classList.remove("border-[#0874f2]", "bg-[#0874f20d]");
		btn.classList.add("border-gray-300");
	}

	document.getElementById(id).classList.remove("border-gray-300");
	document
		.getElementById(id)
		.classList.add("border-[#0874f2]", "bg-[#0874f20d]");
}

//function for valid mobile number

// function checkValidNumber(number) {
// 	if (number.length !== 11) {
// 		alert("PLease Enter a Valid Number");
// 		return;
// 	}
// 	if (isNaN(number) || !Number.isInteger(Number(number))) {
// 		alert("number is not valid");
// 		return;
// 	}
// }

//function for valid pin

// function checkValidPin(pin) {
// 	if (pin !== validPin) {
// 		alert("Enter Valid PIn");
// 		return;
// 	}
// }

//--------------------------------------------------------------------------------//

//add money feature
document
	.getElementById("add-money-btn")
	.addEventListener("click", function (e) {
		e.preventDefault();

		const bank = getInputValue("bank");

		const accountNumber = document.getElementById("account-Number").value;

		const amount = getInputValueNumber("add-Amount");

		if (amount <= 0) {
			alert("Invalid amount");
			return;
		}

		const pin = getInputValueNumber("add-pin");

		const availableBalance = getInnerText("available-balance");

		if (accountNumber.length < 11) {
			alert("please provide valid number");
			return;
		}

		if (pin !== validPin) {
			alert("invalid pin number");
			return;
		}

		const totalNewAvailableBalance = amount + availableBalance;

		setInnerText(totalNewAvailableBalance);

		const data = {
			name: "Add Money",
			date: new Date().toLocaleTimeString(),
		};

		transactionData.push(data);
	});

//cash out money feature
document.getElementById("withdraw-btn").addEventListener("click", function (e) {
	e.preventDefault();
	const agentNumber = getInputValue("agent-number");
	const pin = getInputValueNumber('cash-out-pin')

	const amount = getInputValueNumber("withdraw-amount");

	const availableBalance = getInnerText("available-balance");


	if (amount <= 0 || amount > availableBalance) {
		alert("Invalid Amount");
		return;
	}

	if (agentNumber.length < 11) {
		alert("Enter Valid Agent Number");
		return;
	}

	if (pin !== validPin) {
		alert("Enter Valid Pin");
		return;
	}

	const totalNewAvailableBalance = availableBalance - amount;

	setInnerText(totalNewAvailableBalance);

	const data = {
		name: "Cash Out",
		date: new Date().toLocaleTimeString(),
	};

	transactionData.push(data);
});

document
	.getElementById("transaction-button")
	.addEventListener("click", function () {
		const transactionContainer = document.getElementById(
			"transaction-container"
		);
		transactionContainer.innerText = "";

		for (const data of transactionData) {
			const div = document.createElement("div");
			div.innerHTML = `
			<div class=" bg-white rounded-xl p-3 flex justify-between items-center mb-3">
					<div class="flex items-center">
						<div class=" p-3 rounded-full bg-[#f4f5f7]">
							<img class="mx-auto" src="assets/wallet1.png" alt="" />
						</div>
						<div class="ml-3">
							<h1>${data.name}</h1>
							<p>${data.date}</p>
						</div>
					</div>


					<i class="fa-solid fa-ellipsis-vertical"></i>
			</div>
		`;

			transactionContainer.appendChild(div);
		}
	});

//transfer money feature

document
	.getElementById("send-now-button")
	.addEventListener("click", function (e) {
		e.preventDefault();

		const userAccountNumber = getInputValue("user-account-number");
		const pin = getInputValueNumber("transfer-pin");

		const transferMoney = getInputValueNumber("add-Amount-transfer");

		const availableBalance = getInnerText("available-balance");

		if (userAccountNumber.length !== 11) {
			alert("PLease Enter a Valid Number");
			return;
		}
		if (
			isNaN(userAccountNumber) ||
			!Number.isInteger(Number(userAccountNumber))
		) {
			alert("Number Is Not Valid");
			return;
		}
		if (pin !== validPin) {
			alert("Enter Valid Pin");
			return;
		}

		if (transferMoney <= 0 || transferMoney > availableBalance) {
			alert("Invalid Amount");
			return;
		}

		if (userAccountNumber.length < 11) {
			alert("Enter Valid Agent Number");
			return;
		}

		// checkValidNumber(userAccountNumber)
		// checkValidPin(pinNumber);

		const totalNewAvailableBalance = availableBalance - transferMoney;

		const IdAvailableBalance = document.getElementById("available-balance");

		IdAvailableBalance.innerText = totalNewAvailableBalance;

		const data = {
			name: "Transfer Money",
			date: new Date().toLocaleTimeString(),
		};

		transactionData.push(data);
	});

// Get bonus feature

document.getElementById("bonus-btn").addEventListener("click", function (e) {
	e.preventDefault();
	const couponCode = getInputValue("bonus-code");
	const availableBalance = getInnerText("available-balance");

	if (couponCode !== coupon) {
		alert("Coupon is not Valid");
		return;
	}
	if (couponUsed) {
		alert("Coupon Already Used");
		return;
	}

	if (couponCode === coupon) {
		const addBalance = (availableBalance * 50) / 100;
		const totalNewAvailableBalance = availableBalance + addBalance;
		couponUsed = true;
		alert("Coupon applied! New price:" + totalNewAvailableBalance);
		setInnerText(totalNewAvailableBalance);
	}

	const data = {
		name: "Get Bonus",
		date: new Date().toLocaleTimeString(),
	};

	transactionData.push(data);
});

//pay bill feature

document
	.getElementById("pay-now-button")
	.addEventListener("click", function (e) {
		e.preventDefault();

		const selectToPay = getInputValue("pay");
		const billerAccountNumber = getInputValue("biller-account-Number");
		const amountToPay = getInputValueNumber("add-Amount-to-pay");
		const pin = getInputValueNumber("pay-bill-pin");
		const availableBalance = getInnerText("available-balance");

		if (billerAccountNumber.length !== 11) {
			alert("PLease Enter a Valid Number");
			return;
		}
		if (
			isNaN(billerAccountNumber) ||
			!Number.isInteger(Number(billerAccountNumber))
		) {
			alert("Number Is Not Valid");
			return;
		}
		if (pin !== validPin) {
			alert("Enter Valid Pin");
			return;
		}

		if (amountToPay <= 0 || amountToPay > availableBalance) {
			alert("Invalid Amount");
			return;
		}

		if (billerAccountNumber.length < 11) {
			alert("Enter Valid Agent Number");
			return;
		}

		const totalNewAvailableBalance = availableBalance - amountToPay;
		setInnerText(totalNewAvailableBalance);

		const data = {
			name: "Pay Bill",
			date: new Date().toLocaleTimeString(),
		};

		transactionData.push(data);
	});

//toggling feature

document.getElementById("Add-button").addEventListener("click", function () {
	handleToggle("add-money-parent");

	handleButtonToggle("Add-button");
});

document
	.getElementById("cash-out-button")
	.addEventListener("click", function () {
		handleToggle("cash-out-parent");
		handleButtonToggle("cash-out-button");
	});

document
	.getElementById("transfer-button")
	.addEventListener("click", function () {
		handleToggle("transfer-money-parent");

		handleButtonToggle("transfer-button");
	});

document.getElementById("bonus-button").addEventListener("click", function () {
	handleToggle("get-bonus-parent");

	handleButtonToggle("bonus-button");
});

document
	.getElementById("pay-bill-button")
	.addEventListener("click", function () {
		handleToggle("pay-bill-parent");

		handleButtonToggle("pay-bill-button");
	});

document
	.getElementById("transaction-button")
	.addEventListener("click", function () {
		handleToggle("transaction-parent");

		handleButtonToggle("transaction-button");
	});




//log out feature

document.getElementById('logout-button').addEventListener('click', function(){
	sessionStorage.clear()
	localStorage.clear()
	window.location.replace('./index.html')
})
