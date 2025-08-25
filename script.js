//login button functioaloty

document.getElementById("log-in-btn").addEventListener("click", function (e) {
	e.preventDefault();
	const mobileNUmber = 01315710180;
	const pinNumber = 1234;

	const mobileNumberValue = document.getElementById("mobile-number").value;
	const mobileNumberValueConverted = parseInt(mobileNumberValue);

	const pinNumberValue = document.getElementById("pin-number").value;
	const pinNumberValueConverted = parseInt(pinNumberValue);

	if (
		mobileNumberValueConverted === mobileNUmber &&
		pinNumberValueConverted === pinNumber
	) {
		window.location.href = "./home.html";
	} else {
		alert("User name and password not matched");
	}
});
