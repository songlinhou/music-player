
let base_url = 'https://youtubemusic.songlinhou.repl.co';


async function requestMusicItemListData(body){
    try{
      let url = `${base_url}/music_item_list`;

      const resp = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(body) // body data type must match "Content-Type" header
        });

      const data= await resp.json();
      console.log(data);
      return data
    }
    catch(e){
        console.log("Error in getting music info", e);
        return null;
    }
    
}

function getMusicURL(route){
    let url = `${base_url}/music_url?url=${route}`
    return url;
}

async function getMusicBlob(route){
    let url = getMusicURL(route);

    const resp = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default' // *default, no-cache, reload, force-cache, only-if-cached
      });

    const blob = await resp.blob();
    return blob
}

async function getMusicBase64(yt_url){
  try{
    let url = `${base_url}/music_base64?url=${yt_url}`;

    const resp = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
        }
      });

    let data= await resp.json();
    console.log("Getting base64 for", data['name']);
    return data;
  }
  catch(e){
      console.log("Error in getting music info", e);
      return null;
  }
}
