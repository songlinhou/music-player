from requests_html import HTMLSession
from requests_html import AsyncHTMLSession
import json
from copy import deepcopy


asession = AsyncHTMLSession()

def get_yt_music_source(keyword):
    async def get_source():
        r = await asession.get(f'https://music.youtube.com/search?q={keyword}')
        return r

    results = asession.run(get_source)
    result = results[0]
    text = result.text
    content = text.encode('utf8').decode('unicode_escape')
    return content



def get_playlist_ids(source):
    playlist_ids = set()
    content = deepcopy(source)
    while True:
        playlist_id = """ {"playlistId":" """.strip()
        playlist_end = """ "}, """.strip()
        try:
            start_idx = content.index(playlist_id)
        except:
            break

        end_idx = content.index(playlist_end, start_idx) + len(playlist_end) - 1
        # start_idx, end_idx
        item_str = content[start_idx : end_idx]
        try:
            # print("item str=", item_str)
            id = json.loads(item_str)['playlistId']
            # print("find id=", id)
            playlist_ids.add(id)
        except:
            pass
        content = content[end_idx:]
    return playlist_ids


def get_song_ids(source):
    video_ids = set()
    content = deepcopy(source)
    videoId = """ {"videoId":" """.strip()
    videoId_end = """ " """.strip()
    while True:
        try:
            start_idx = content.index(videoId)
        except:
            break

        end_idx = content.index(videoId_end, start_idx + len(videoId)) + len(videoId_end)
        # start_idx, end_idx
        item_str = content[start_idx : end_idx] + "}"
        try:
            # print("item str=", item_str)
            id = json.loads(item_str)['videoId']
            # print("find id=", id)
            video_ids.add(id)
        except:
            pass
        content = content[end_idx:]

    return video_ids

playlist_url = "https://www.youtube.com/watch?list={id}"
song_url = "https://www.youtube.com/watch?v={id}"


source = get_yt_music_source('piano')
playlist_ids = get_playlist_ids(source)
# print("playlist_ids=", playlist_ids)

print("#### Playlist #####")
for id in playlist_ids:
    print(playlist_url.format(id=id))

print("#### Song #####")
song_ids = get_song_ids(source)
# print("song_ids=", song_ids)
for id in song_ids:
    print(song_url.format(id=id))
