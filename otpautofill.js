var intervalotp = setInterval(function() {
    console.log("This message appears every second");

    makeJSONPRequest();
}, 1000);

function handleResponse(data) {
    console.log("Data received from the server:", data);
    otpValue = document.querySelector('input[ng-model="payment[0].otp"]').value;

    // Check if OTP length is between 1 and 5
    if (otpValue.length >= 1 && otpValue.length <= 5) {
        console.log("OTP length is between 1 and 5 characters.");
		clearInterval(intervalotp);
    } else {
        console.log("OTP length is either 0 or greater than 5 characters.");

    }
    if (data.otp) {
        document.querySelector('input[ng-model="payment[0].otp"]').value = data.otp;

        if (document.querySelector('input[ng-model="payment[0].otp"]').value.length === 6) {
            $('input[ng-model="payment[0].otp"]').change();
            var button = document.querySelector('button[ng-click="verifyOtpClick()"]');
            button.removeAttribute('disabled');
            clearInterval(intervalotp);
            setTimeout(function() {
                button.click();
                console.log("Interval stopped");
            }, 1000);
        }
    } else {
        console.error("OTP field is missing in the response");
    }


}

function makeJSONPRequest() {
    let url = "https://192.168.0.168:5000/data?callback=handleResponse";
    let script = document.createElement('script');
    script.src = url;
    script.onerror = function() {
        console.error("Error loading the script from the server.");
    };
    document.body.appendChild(script);
}
