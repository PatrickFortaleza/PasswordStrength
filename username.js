// ----------------------------------------------- //
// IMPORT USERS
// ----------------------------------------------- //
import { users } from './users.js'

// ----------------------------------------------- //
// QUERY DOM ELEMENTS 
// ----------------------------------------------- //
const usernameInput = document.querySelector('#username')
const uReasons = document.querySelector('#uReasons');

// ----------------------------------------------- //
// Check for valid Username length
// ----------------------------------------------- //
const checkValidUsernameLength = (username) => {
    const length = username.length

    if(length < 3 || length > 12 ){
        return  { 
            message: `usernames must be 3 - 12 characters in length`,
            success: false }
    }
}

const checkValidUsernameSpecs = (username) => {
    // A username must be:
    // 3 - 12 characters in length
    // No special characters
    var regex = /^[a-zA-Z0-9]+$/g
    const matches = username.match(regex) || []

    if(matches.length < 1){
        return  { 
            message: `usernames must not contain special characters`,
            success: false }
    }
}

const updateUsernameMessage = (username) =>{
    const invalid = []
    invalid.push(checkValidUsernameLength(username))
    invalid.push(checkValidUsernameSpecs(username))
    return invalid
}

const usernameCheck = () => {
    const invalids = updateUsernameMessage(usernameInput.value);
    uReasons.innerHTML = '';

    invalids.forEach(i => {
        if (i == null) return
        const messageElement = document.createElement('li')
        messageElement.innerHTML = `<div class="svg-cont"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg></div> ${i.message}`;
        uReasons.appendChild(messageElement);
    });
}


usernameInput.addEventListener('input', usernameCheck)