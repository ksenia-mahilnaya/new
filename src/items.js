function loadItems(items) {
    let html = '';
    let videoItem = '';
    const base = "https://www.youtube.com/embed/";

    items.forEach(function(item, index) {
        const snipTitle = item.snippet.title;
        const snipDescription = item.snippet.description;
        let snipPublishedAt = item.snippet.publishedAt;
        snipPublishedAt = snipPublishedAt.slice(0, snipPublishedAt.indexOf('T'));
        const snipChannelTitle = item.snippet.channelTitle;
        const snipThumbnailUrl = item.snippet.thumbnails.medium.url;
        const vidUrl = base + item.id.videoId;

        if (index % 4 === 0) {
            videoItem = '<li><div class="video-item"><img width="280" height="158" src=' + snipThumbnailUrl + '></img><p class="title"><a href=' + vidUrl + '>' + snipTitle + '</a></p><p class="author">' + snipChannelTitle + '</p><p class="date">' + snipPublishedAt + '</p><p class="description">' + snipDescription + '</p></div>';
        } else if (index % 4 === 3) {
            videoItem = '<div class="video-item">' + '<img width="280" height="158" src=' + snipThumbnailUrl + '></img>'+ '<p class="title"><a href=' + vidUrl + '>' + snipTitle + '</a></p><p  class="author">' + snipChannelTitle + '</p><p class="date">' + snipPublishedAt + '</p><p class="description">' + snipDescription + '</p></div></li>';
        } else {
            videoItem = '<div class="video-item">' + '<img width="280" height="158" src=' + snipThumbnailUrl + '></img>'+ '<p class="title"><a href=' + vidUrl + '>' + snipTitle + '</a></p><p class="author">' + snipChannelTitle + '</p><p class="date">' + snipPublishedAt + '</p><p class="description">' + snipDescription + '</p></div>';
        }
        html += videoItem;
    });
    document.getElementById("result").innerHTML += html;
}

module.exports = { loadItems };
