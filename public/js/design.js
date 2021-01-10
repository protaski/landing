function setColor(e) {
    var target = e.target,
        count = +target.dataset.count;

    target.style.backgroundColor = count === 1 ? "#3B1195" : '#FF9D00';
    target.dataset.count = count === 1 ? 0 : 1;
}