const form = document.querySelector('.order__form');

form.addEventListener('submit', e => {
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
    form.classList.add('was-validated');
}, false);

