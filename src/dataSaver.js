const db = new Dexie("MusicDB");
//https://dexie.org/docs/Tutorial/Hello-World
function initDatabase(){
    db.version(1).stores({
        likedSongs: `
            code,
            url,
            name,
            artist,
            image,
            desc,
            data,
            timestamp`,
      });
    
    //   db.likedSongs.bulkPut([
    //     {
    //         url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    //         name: "Sample", 
    //         artist: "Unknown", 
    //         image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_09/2769481/190228-headphones-music-se-152p.jpg",
    //         desc:'This is a demo song',
    //         data:0,
    //         timestamp: 1664259273492
    //     }
    //   ]).then(()=>{
    //     console.log("Database is created.");
    //     let promise = db.likedSongs.where("name").equals("Sample").toArray();
    //     return promise;
    //   }).then((record)=>{
    //     console.log("record is", record);
    //   });
}

async function addBulkRecordsToLikedSongs(bulkDataList){
    await db.likedSongs.bulkPut(bulkDataList);
    console.log("Data saved to likedSongs");
}

async function addOneRecordToLikedSongs(record){
    let bulkDataList = [record];
    await db.likedSongs.bulkPut(bulkDataList);
    console.log("Data saved to likedSongs");
}

async function getAllLikedSongs(){
    let likedSongs = await db.likedSongs.reverse().sortBy('timestamp');
    console.log("reading all records from likedSongs");
    return likedSongs;
}

async function getLikedSongFromDB(url){
    // let song = await db.likedSongs.where('url').equals(url).limit(1);
    let song = await db.likedSongs.filter((rec)=>{return rec.url.indexOf(url) >= 0}).toArray();
    console.log("get song data", song);
    return song;
}


function downloadMusic(code) { 
    var xhr = new XMLHttpRequest();
    let url = generateMusicLink(code);
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        var myBlob = this.response;
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(myBlob);
        link.download = `${code}.mp4`;
        link.click();
      }
    };
    xhr.send();
  }


async function deleteMusic(code){
    console.log("start delete", code);
    await db.likedSongs.where('code').equals(code).delete();
    await deleteLikedSongInRemoteStore(code);
    console.log("deleteMusic complete", code);
}

async function deleteManyMusic(codes){
    for(let i=0; i < codes.length; i ++){
        const code = codes[i];
        await deleteMusic(code);
    }

    console.log("delete songs from db. num=", codes.length);
}

async function deleteAllLikedSongsLocally(){
    console.log("start delete all local songs");
    await db.likedSongs.clear();
    console.log("delete all local songs complete");
}


// 'name': 'SoundHelix Song 1', 'artist': 'T. Sch??rger 1', 'image': 'https://i.ytimg.com/vi/Y0pdQU87dc8/sddefault.jpg', 'url':'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'desc': 'Desc 1'