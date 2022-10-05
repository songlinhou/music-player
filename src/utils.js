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

function getTimestampNow(){
    let time = Date.now();
    try {
        time = firebase.firestore.FieldValue.serverTimestamp();
        return time;
    } catch (error) {
        console.log("cannot get timestamp from firebase:", error);
    }
    return time;
}