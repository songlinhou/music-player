// let base_url = 'https://youtubemusic.songlinhou.repl.co';

function getVideoCode(yt_url){
    let params = "?" + yt_url.split("?")[1];
    const urlParams = new URLSearchParams(params);
    return urlParams.get("v");
}

function generateYTVideoLink(code){
    return `https://www.youtube.com/watch?v=${code}`
}

function generateMusicLink(code){
    let yt = generateYTVideoLink(code);
    return `${base_url}/music_url?url=${yt}`;
}