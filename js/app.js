window.addEventListener('DOMContentLoaded', function() {

    var timer = document.getElementById('timer');
    var form = document.querySelector('.order__form');
    var seconds = 60;

    timer.innerText = seconds;

    window.addEventListener("scroll", startCount);

    function startCount() {
        var bounding = timer.getBoundingClientRect();

        if (bounding.top >= 0
            && bounding.left >= 0
            && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        ) {
            window.removeEventListener("scroll", startCount);
            var interval = setInterval(function () {
                seconds--;
                timer.innerText = seconds;
                if (seconds === 0) {
                    clearInterval(interval);
                    timer.style.color = '#DB3318';
                }
            }, 1000);
        };
    };

    form.addEventListener('submit', fromValidation, false);

    function fromValidation(event) {
        if (this.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.classList.add('was-validated');
    };
});