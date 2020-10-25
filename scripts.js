// ----------------------------------------------- //
// QUERY DOM ELEMENTS 
// ----------------------------------------------- //
const strengthMeter = document.getElementById('strength-meter');
const strengthBar = document.getElementById('strength-bar');
const passwordInput = document.querySelector('#password-input')
const reasons = document.querySelector('#reasons');


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
    // For each weakness,
    weaknesses.forEach(weakness => {
        // If there is no weakness, return null
        if (weakness == null) return
        // Deduct the weakness deduction score from strength
        strength -= weakness.deduction
        // Append messages to reasons ul
        const messageElement = document.createElement('li')
        messageElement.innerHTML = weakness.message;
        reasons.appendChild(messageElement);
    })
    console.log(strength)
    // after strength has been calculated, set the css variable to the strength calculation
    strengthBar.style.width = `${strength}%`
}

// ----------------------------------------------- //
// Will update calculate weaknesses
// based on the weakness calculation functions below
// ----------------------------------------------- //
const calculatePasswordStrength = (password) => {
    // Init empty array
    const weaknesses = []
    weaknesses.push(lengthWeakness(password))
    return weaknesses
}

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


// Updates strength checker on first load
updateStrengthMeter();
// Adds event listener to input
passwordInput.addEventListener('input', updateStrengthMeter)