const { loadItems } = require('./items');
const { ontouch } = require('./swipe');
const { pagination, activeItem } = require('./pagination');

let pgToken;
let liscount;
let curindex = 0;

window.addEventListener('load', function(){
    const form = document.createElement('form');
    const inputText = '<input type="text" id="search">';
    const inputSubmit = '<input type="submit" value="search">';
    const div = document.createElement('div');
    div.id = "swipegallery";
    div.className = "touchgallery";
    div.innerHTML = "<ul id='result'></ul>";

    document.body.insertBefore(form, document.body.firstChild);
    document.body.insertBefore(div, form.nextSibling);
    form.innerHTML = '<div class="input-border">' + inputText + inputSubmit + '</div>';

    const paginDiv = document.createElement('div');
    paginDiv.id = "pagination-div";
    document.body.insertBefore(paginDiv, div.nextSibling);

    document.querySelector("form").addEventListener("submit", function(e) {
        e.preventDefault();

        // prepare the request
        const request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent(document.getElementById("search").value).replace(/%20/g, "+"),
            maxResults: 16,
            order: "viewCount"
        });
        // execute the request
        request.execute(function (response) {
            const result = response.result;
            pgToken = result.nextPageToken;
            loadItems(result.items);
            liscount = document.getElementsByTagName("li").length;
            ul.style.width = gallerywidth * liscount + 'px' ;
            pagination();
            const firstSpan = document.querySelector('div span');
            firstSpan.classList.add('item-active');
            firstSpan.innerHTML = '1';
        });

    });

    const el = document.getElementById('swipegallery'); // reference gallery's main DIV container
    //const gallerywidth = el.offsetWidth;
    let gallerywidth = 1281;
    const ul = el.getElementsByTagName('ul')[0];
    let ulLeft = 0;
    liscount = 4;
    ul.style.width = gallerywidth * liscount + 'px' ;// set width of gallery to parent container's width * total li

    ontouch(el, function(evt, dir, phase, swipetype, distance){
        if (phase == 'start'){ // on touchstart

            if (curindex === liscount - 2) {
                const request = gapi.client.youtube.search.list({
                    part: "snippet",
                    type: "video",
                    q: encodeURIComponent(document.getElementById("search").value).replace(/%20/g, "+"),
                    maxResults: 16,
                    pageToken: pgToken,
                    order: "viewCount"
                });
                request.execute(function (response) {
                    const result = response.result;
                    pgToken = result.nextPageToken;
                    loadItems(result.items);
                    liscount = document.getElementsByTagName("li").length;
                    ul.style.width = gallerywidth * liscount + 'px' ;
                    pagination();
                });

            }
            ulLeft = parseInt(ul.style.left) || 0; // initialize ulLeft var with left position of UL
        }
        else if (phase == 'move' && (dir == 'left' || dir == 'right')){ //  on touchmove and if moving left or right

            let totaldist = distance + ulLeft;// calculate new left position of UL based on movement of finger
            const width = document.documentElement.clientWidth;
            if (width < 670) {
                gallerywidth = 320;
            } else if ((width >= 670) && (width < 1024)) {
                gallerywidth = 640;
            } else if ((width >= 1024) && (width < 1300)) {
                gallerywidth = 960;
            } else {
                gallerywidth = 1281;
            }
            ul.style.left = Math.min(totaldist, (curindex + 1) * gallerywidth) + 'px'; // set gallery to new left position
        }
        else if (phase == 'end'){ // on touchend
            if (swipetype == 'left' || swipetype == 'right'){ // if a successful left or right swipe is made
                curindex = (swipetype == 'left') ?  Math.min(curindex + 1, liscount - 1) : Math.max(curindex-1, 0); // get new index of image to show
            }
            ul.style.left = -curindex * gallerywidth + 'px'; // move UL to show the new image
            const spans = document.querySelectorAll('div span');
            console.log(curindex);
            spans.forEach(function(item, index) {
                if ( (index === curindex) ) {
                    activeItem(item, index, spans);
                }
                /*if ( (gallerywidth === 320) && (index === curindex) ) {
                 activeItem(item, index, spans);
                 } else if ( (gallerywidth === 640) && (index === curindex) ) {
                 activeItem(item, index, spans);
                 } else if ( (gallerywidth === 960) && (index === curindex) ) {
                 activeItem(item, index, spans);
                 } else  if ( (gallerywidth === 1281) && (index === curindex) ) {
                 activeItem(item, index, spans);
                 }*/

                 });
        }
    }); // end ontouch
}, false);



