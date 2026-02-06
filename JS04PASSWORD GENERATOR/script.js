function generatePassword(){

    const length = document.getElementById("length").value;
    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+";

    let allowedChars = "";

    if(useUpper) allowedChars += upperChars;
    if(useLower) allowedChars += lowerChars;
    if(useNumbers) allowedChars += numberChars;
    if(useSymbols) allowedChars += symbolChars;

    if(allowedChars.length === 0){
        document.getElementById("result").textContent =
            "Select at least one option!";
        return;
    }

    let password = "";

    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    document.getElementById("result").textContent =
        "Generated Password: " + password;
}
