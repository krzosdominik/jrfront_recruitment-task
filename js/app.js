window.addEventListener('DOMContentLoaded', function () {

    var timer = document.getElementById('timer');
    var seconds = 60;

    timer.innerText = seconds;

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

    window.addEventListener("scroll", startCount);
});