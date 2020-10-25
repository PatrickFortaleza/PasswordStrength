// ----------------------------------------------- //
// QUERY DOM ELEMENTS 
// ----------------------------------------------- //
const phoneInput = document.querySelector('#phone')
const phReasons = document.querySelector('#phReasons');

// ----------------------------------------------- //
// Check for valid phone number
// ----------------------------------------------- //
const checkValidPhone = (phone) => {
    // Matches:
    // 123-456-7890
    // (123) 456-7890
    // 123 456 7890
    // 123.456.7890
    // +91 (123) 456-7890
    var regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
    const matches = phone.match(regex) || []

    if(matches.length < 1){
        return  { 
            message: `you have not entered a valid phone number`,
            success: false }
    }
}

const updatePhoneMessage = (phone) =>{
    const invalid = []
    invalid.push(checkValidPhone(phone))
    return invalid
}

const phoneCheck = () => {
    const invalids = updatePhoneMessage(phoneInput.value);
    phReasons.innerHTML = '';

    invalids.forEach(i => {
        if (i == null) return
        const messageElement = document.createElement('li')
        messageElement.innerHTML = `<div class="svg-cont"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></div> ${i.message}`;
        phReasons.appendChild(messageElement);
    });
}


phoneInput.addEventListener('input', phoneCheck)
