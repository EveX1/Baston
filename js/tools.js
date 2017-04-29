// random un nombre entre min et max
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// encadrer une value entre un min et un max
function clamp(value, max, min) {
    return Math.max(Math.min(value, max), min);
}
