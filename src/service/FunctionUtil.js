export function Throttle(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    }
}