
function pagination() {
    const paginDiv = document.getElementById('pagination-div');
    paginDiv.appendChild(document.createElement('span'));
    paginDiv.appendChild(document.createElement('span'));
    paginDiv.appendChild(document.createElement('span'));
    paginDiv.appendChild(document.createElement('span'));

    const spans = document.querySelectorAll('div span');
    const el = document.getElementById('swipegallery'); // reference gallery's main DIV container
    const width = document.documentElement.clientWidth;
    const ul = el.getElementsByTagName('ul')[0];
    let gallerywidth = 1281;

    spans.forEach(function(item, index) {
        item.addEventListener('click', function() {
            ul.style.left = -index * gallerywidth + 'px';
            activeItem(item, index, spans);
        });
    });
}

function activeItem(item, index, spans) {
    spans.forEach(function(i) {
        i.classList.remove('item-active');
        i.innerHTML = '';
    });
    item.classList.add('item-active');
    item.innerHTML = `${index + 1}`;
}

module.exports = { pagination, activeItem, };
