// ----------------------------------------------- //
// QUERY DOM ELEMENTS 
// ----------------------------------------------- //
const emailInput = document.querySelector('#email')
const eReasons = document.querySelector('#eReasons');

// ----------------------------------------------- //
// Check for "@" in email string
// ----------------------------------------------- //
const checkValid = (email) => {
    // We can breakup the regex pattern into (4) sections
    // FULL EMAIL: patrick@gmail.com
    // 1. patrick [email name] === ([a-zA-z0-9\.-_]+)
    // 2. @ [at sign] === @
    // 3. gmail [domain] === ([a-zA-z0-9\-_]+)
    // 4. .com [extension] === ([a-z]{2,20})
    var regex = /^([a-zA-z0-9\.-_]+)@([a-zA-z0-9\-_]+).([a-z]{2,20})$/
    const matches = email.match(regex) || []

    if(matches.length < 1){
        return  { 
            message: `you have not entered a valid email address`,
            success: false }
    }
}

const updateMessage = (email) =>{
    const invalid = []
    invalid.push(checkValid(email))
    return invalid
}

const emailCheck = () => {
    const emailString = emailInput.value
    const invalids = updateMessage(emailInput.value);
    eReasons.innerHTML = '';

    invalids.forEach(i => {
        if (i == null) return
        const messageElement = document.createElement('li')
        messageElement.innerHTML = `<div class="svg-cont"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></div> ${i.message}`;
        eReasons.appendChild(messageElement);
    });
}


emailInput.addEventListener('input', emailCheck)
