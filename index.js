const HTML = document.querySelector('html');
const form = document.querySelector('form');
const fieldsets = form.querySelectorAll('.fieldset');

// Listen to all clicks inside document
HTML.addEventListener('click', () => {
    // Foreach fieldset
    fieldsets.forEach(f => {
        // remove focused class to reset styles
        f.classList.remove('focused')
        // but if the fieldset's input child is focused, add .focused to fieldset
        if (f.children[1] === document.activeElement) {
            f.classList.add('focused');
        }
    });
});