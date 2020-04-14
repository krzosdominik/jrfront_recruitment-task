const timer = document.getElementById('timer');
let seconds = 60;
timer.innerText = seconds;

const startCount = () => {
    const { top, left, bottom, right } = timer.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    const { clientHeight, clientWidth } = document.documentElement;
    if (top >= 0
        && left >= 0
        && bottom <= (innerHeight || clientHeight)
        && right <= (innerWidth || clientWidth)
    ) {
        window.removeEventListener("scroll", startCount);
        const interval = setInterval(() => {
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