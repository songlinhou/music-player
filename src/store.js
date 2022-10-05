let storeDB = null;


function initFirestore(){
    let db = firebase.firestore();
    storeDB = db;
}

async function getOnlineLikedSongs(){
    let songData = {};
    if (!firebaseUser){
        console.log("firebaseUser is null");
        return null;
    }
    let email = firebaseUser.email;
    let querySnapshot = await storeDB.collection("online-music-library")
        .doc(email)
        .collection("liked-songs")
        .get();
        
    let docs = querySnapshot.docs;
    docs.forEach(doc => {
        let id = doc.id;
        let data = doc.data();
        songData[id] = data;
    });

    console.log("songData=", songData);
    return songData;

}

async function addLikedSongsToOnlineStore(songName, video_id){
    if (!firebaseUser){
        console.log("firebaseUser is null");
        return null;
    }
    if(!songName){
        console.log("songName is null");
        return null;
    }
    if(!video_id){
        console.log("video_id is null");
        return null;
    }
    let email = firebaseUser.email;
    let time = firebase.firestore.FieldValue.serverTimestamp();
    await storeDB.collection("online-music-library")
        .doc(email)
        .collection("liked-songs")
        .doc(video_id)
        .set({
            'name': songName,
            'time': time
        }, { merge: true });
        
    console.log("added to online store", songName, video_id);
}

async function localLikedSongsToRemoteStore(){
    if (!firebaseUser){
        console.log("firebaseUser is null");
        return null;
    }
    let email = firebaseUser.email;
    let playListItems = await getAllLikedSongs();
    
    // first update the remote songs
    let batch = storeDB.batch();

    playListItems.forEach(item => {
        let video_id = item.code;
        let songName = item.name;
        let time = firebase.firestore.FieldValue.serverTimestamp();
        let dataLoc = storeDB.collection("online-music-library")
        .doc(email)
        .collection("liked-songs")
        .doc(video_id);

        batch.set(dataLoc, {
            'name': songName,
            'time': time
        });
    });

    await batch.commit();
    console.log("update remote library");    
}

async function remoteStoreToLocalLikedSongs(){
    let songData = await getOnlineLikedSongs();
    let onlinePlayCodes = Object.keys(songData);
    console.log("onlinePlayCodes=", onlinePlayCodes);
    let urls = [];
    onlinePlayCodes.forEach(code =>{
        let url = generateYTVideoLink(code);
        urls.push(url);
    });
    let urlObj = {'urls': urls};
    let playListItems = await requestMusicItemListData(urlObj);

    console.log("playListItems before modification=", playListItems);
    for(let i=0; i < playListItems.length; i++){
        const rec = playListItems[i];
        let code = rec.code;
        rec['data'] = 0;
        rec['timestamp'] = songData[code].time.seconds * 1000 + songData[code].time.nanoseconds;
    }

    console.log("playListItems=", playListItems);

    await addBulkRecordsToLikedSongs(playListItems);
    await obtainLikedSongsPlayList();
    console.log("add songs from remote store to local store");
}

async function getCurrentLocalLikedSongCodes(){
    let playListItems = await getAllLikedSongs();
    
    // first update the remote songs
    let localVideoIds = [];
    playListItems.forEach(item => {
        let video_id = item.code;
        localVideoIds.push(video_id);
    });

    return localVideoIds;
}

async function getCurrentRemoteLikedSongCodes(){
    let songData = await getOnlineLikedSongs();
    let onlineVideoIds = Object.keys(songData);
    return onlineVideoIds;
}

async function checkSyncNeeded(){
    let localVideoIds = await getCurrentLocalLikedSongCodes();
    let onlineVideoIds = await getCurrentRemoteLikedSongCodes();
    if(localVideoIds.sort().join(",") == onlineVideoIds.sort().join(",")){
        console.log("already syncronized");
        return true;
    }
    let numLocal = localVideoIds.length;
    let numRemote = onlineVideoIds.length;
    console.log("sync is required. Local=", numLocal, " Remote=", numRemote);
    return false;
}


async function syncLocalAndRemoteLikedSongs(){
    if (!firebaseUser){
        console.log("firebaseUser is null");
        return null;
    }
    let requireSync = await checkSyncNeeded()
    if(requireSync){
        console.log("sync complete. No transfer needed");
        return;
    }
    console.log("start sync process");
    await localLikedSongsToRemoteStore();
    await remoteStoreToLocalLikedSongs();

    console.log("sync complete. Transfer complete.");
}

async function overrideLocalFromRemote(){
    if (!firebaseUser){
        console.log("firebaseUser is null");
        return null;
    }
    let requireSync = await checkSyncNeeded()
    if(requireSync){
        console.log("sync complete. No transfer needed");
        return;
    }
    await deleteAllLikedSongsLocally();
    await remoteStoreToLocalLikedSongs();

    console.log("override local liked songs complete. Transfer complete.");
}

async function deleteLikedSongInRemoteStore(video_id){
    if (!firebaseUser){
        console.log("firebaseUser is null");
        return null;
    }
    let email = firebaseUser.email;

    let dataLoc = storeDB.collection("online-music-library")
        .doc(email)
        .collection("liked-songs")
        .doc(video_id);

    await dataLoc.delete();
    console.log("delete in server completed", video_id);
}
    
