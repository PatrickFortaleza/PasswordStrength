// ----------------------------------------------- //
// QUERY DOM ELEMENTS 
// ----------------------------------------------- //
const strengthMeter = document.getElementById('strength-meter');
const strengthBar = document.getElementById('strength-bar');
const passwordInput = document.querySelector('#password')
const reasons = document.querySelector('#reasons');


// ----------------------------------------------- //
// Calculates length weakness
// ----------------------------------------------- //
const lengthWeakness = (password) => {
    const length = password.length
    
    if(length <= 5){
        return {
            message: 'Your password does not exceed the standard amount of character length',
            deduction: 40,
        }
    }

    if(length <= 10){
        return {
            message: 'Your password can be longer',
            deduction: 10,
        }
    }
}

// ----------------------------------------------- //
// Calculate lowercase weakness
// ----------------------------------------------- //
const lowercaseWeakness = (password) => {
    // create regular expension - calculate # of lower case letters
    // /[a-z]/g  = globally calculate characters within password that match a-z
    return characterTypeWeakness(password, /[a-z]/g, 'lowercase')
}

// ----------------------------------------------- //
// Calculate uppercase weakness
// ----------------------------------------------- //
const uppercaseWeakness = (password) => {
    // create regular expension - calculate # of upper case letters
    // /[A-Z]/g  = globally calculate characters within password that match a-z
    return characterTypeWeakness(password, /[A-Z]/g, 'uppercase')
}

// ----------------------------------------------- //
// Calculate numbers weakness
// ----------------------------------------------- //
const numbersWeakness = (password) => {
    // create regular expension - calculate # of numbers
    // /[0-9]/g  = globally calculate characters within password that match a-z
    return characterTypeWeakness(password, /[0-9]/g, 'number')
}

// ----------------------------------------------- //
// Calculate special characters weakness
// ----------------------------------------------- //
const specialWeakness = (password) => {
    // create regular expension - calculate # of special characters
    // /[^0-9a-zA-z\s]/g = globally calculate characters within password that do ^(not) match
    // 0-9, a-z, A-Z and \s (whitespace)
    // if undefined, assign matches as an empty array
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special')
}

// ----------------------------------------------- //
// Calculate character type weakness
// ----------------------------------------------- //
const characterTypeWeakness = (password, regex, type) => {
    // if undefined, assign matches as an empty array
    const matches = password.match(regex) || []
    if(matches.length === 0){
        return {
            message: `Your password has no ${type} characters`,
            deduction: 20
        }
    }

    if(matches.length < 2){
        return {
            message: `Your password could use more ${type} characters`,
            deduction: 5
        }
    }
}

// ----------------------------------------------- //
// Repeat Character Weakness
// ----------------------------------------------- //

const repeatCharactersWeakness = (password) => {
    // the period in regex means the character can be anything
    // using the \1 will check if there are two of the same characters in a row
    const matches = password.match(/(.)\1/) || []
    if(matches.length > 0){
        return {
            message: `Your password has repeat characters`,
            // we multiply here, as if you have more matching characters, the weaker your password is.
            deduction: matches.length * 10
        }
    }
}

// ----------------------------------------------- //
// Will update calculate weaknesses
// based on the weakness calculation functions below
// ----------------------------------------------- //
const calculatePasswordStrength = (password) => {
    // Init empty array
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numbersWeakness(password))
    weaknesses.push(specialWeakness(password))
    weaknesses.push(repeatCharactersWeakness(password))
    return weaknesses
}

// ----------------------------------------------- //
// Will update strength meter 
// ----------------------------------------------- //
const updateStrengthMeter = () =>{
    // Assign return value to constant
    const weaknesses = calculatePasswordStrength(passwordInput.value);
    // Init strength value
    let strength = 100
    // Clear reasons ul before re-render
    reasons.innerHTML = '';

    if (passwordInput.value.length = 0) {
        strength - 100
        strengthBar.style.width = `${strength}%`
    }

    // For each weakness,
    weaknesses.forEach(weakness => {
        // If there is no weakness, return null
        if (weakness == null) return
        // Deduct the weakness deduction score from strength
        strength -= weakness.deduction
        // Append messages to reasons ul
        const messageElement = document.createElement('li')
        messageElement.innerHTML = `<div class="svg-cont"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></div> ${weakness.message}`;
        reasons.appendChild(messageElement);
    })
    console.log(strength)
    // after strength has been calculated, set the css variable to the strength calculation
    strengthBar.style.width = `${strength}%`
}


// Updates strength checker on first load
updateStrengthMeter();

// Adds event listener to input
passwordInput.addEventListener('input', updateStrengthMeter)