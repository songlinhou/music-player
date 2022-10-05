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

function getPrefixedVolume(lastVol){
    if(lastVol < 25){
        return 25;
    }
    if(lastVol < 50){
        return 50;
    }
    if(lastVol < 75){
        return 75;
    }
    if(lastVol < 100){
        return 100;
    }
    if(lastVol == 100){
        return 0;
    }
}

let volumeIcons = [
    "fa-volume-xmark",
    "fa-volume-off",
    "fa-volume-low",
    "fa-volume-high",
];


function changeVolumeIcon(volume){
    volumeIcons.forEach(icon => {
        $("#main-play-volume-btn").removeClass(icon);
    });
    $("#main-play-volume-btn").addClass("fa-volume-high"); // to determine the size of slider
    let minSize = $("#volume-control-player-main").width();
    let idx = 0;
    if(volume == 0){
        idx = 0;
    }
    else if(volume <= 25){
        idx = 1;
    }
    else if(volume <= 75){
        idx = 2;
    }
    else if(volume <= 100){
        idx = 3;
    }
    $("#main-play-volume-btn").removeClass("fa-volume-high");
    $("#main-play-volume-btn").addClass(volumeIcons[idx]);
    $("#volume-control-player-main").css("width", minSize + "px");
}

function fixPlayerResize(){
    function debounce(func){
        var timer;
        return function(event){
          if(timer) clearTimeout(timer);
          timer = setTimeout(func,100,event);
        };
    }
    window.addEventListener("resize",debounce(function(e){
        console.log("end of resizing");
        if($("#main-play-container").is(":visible")){
            $(".main-play-horizontal-btn").click();
            setTimeout(()=>{
                $("#float-player-left").click();
                console.log("back to main player");
            }, 2000);
        }
    }));
}