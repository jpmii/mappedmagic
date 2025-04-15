// utils.js
export function formatTime(time) {
    const [hour, minute] = time.split(':');
    const date = new Date(1970, 0, 1, hour, minute);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: minute !== '00' ? '2-digit' : undefined,
        hour12: true,
    });
}
