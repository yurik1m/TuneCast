import axios from 'axios';

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRET;
const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

//스포티파이 API를 사용하기 위한 토큰을 받아오는 함수
async function getAccessToken() {
  try {
    const response = await axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials',
      },
      headers: {
        'Authorization': 'Basic ' + auth,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

//날씨 태그로 플레이리스트 검색하기 위한 함수
//반환되는 배열의 형태는 다음과 같다.
// [
//   { name: '플레이리스트1', cover: 'url1' },
//   { name: '플레이리스트2', cover: 'url2' },
//   { name: '플레이리스트3', cover: 'url3' },
// 
// ]

export async function searchPlaylistsByTag(tag, limit = 4) {
  try {
    const accessToken = await getAccessToken();
    const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(tag)}&type=playlist&limit=${limit}`; 

    const response = await axios({ //요청을 보내는 부분
      url: apiUrl,
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    });

    const playlists = response.data.playlists.items; 
    const playlistResults = [];

    playlists.forEach((playlist) => {
      const playlistInfo = {
        id: playlist.id,
        name: playlist.name,
        cover: playlist.images.length > 0 ? playlist.images[0].url : null,
      };
      playlistResults.push(playlistInfo);
    });

    return playlistResults; 
  } catch (error) {
    console.error('Error searching playlists by tag:', error);
    throw error;
  }
}

// 날씨 태그로 플레이리스트 검색 예시
// const weatherTag = 'summer';
// searchPlaylistsByTag(weatherTag, 4) summer 태글로 플레이리스트 4개 검색
//   .then((playlistResults) => {
//     console.log('Playlist results:', playlistResults);
//     // 여기서 검색 결과를 활용하여 UI를 업데이트하거나 다른 작업을 수행할 수 있습니다.
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

//플레이리스트의 트랙들을 검색하는 함수 
//결과가 반환되는 배열의 형태는 다음과 같다.
// [
//   { name: '곡1', cover: 'url1', album: '앨범1', artist: '아티스트1' },
//   { name: '곡2', cover: 'url2', album: '앨범2', artist: '아티스트2' },
//   ...
// ]
export async function getPlaylistTracks(playlistName) {
  try {
    const accessToken = await getAccessToken();
    const apiUrl = `https://api.spotify.com/v1/playlists/${encodeURIComponent(playlistName)}/tracks`;

    const response = await axios({
      url: apiUrl,
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    });

    const tracks = playlistResponse.data.items;

    const trackDetails = await Promise.all(tracks.map(async (track) => {
      const trackUrl = `https://api.spotify.com/v1/tracks/${encodeURIComponent(track.track.id)}`;

      const trackResponse = await axios({
        url: trackUrl,
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      });

      const trackInfo = {
        name: track.track.name,
        cover: trackResponse.data.album.images[0].url,
        album: trackResponse.data.album.name,
        artist: trackResponse.data.artists[0].name,
      };

      return trackInfo;
    }));

    return trackDetails;
  } catch (error) {
    console.error('Error getting playlist tracks:', error);
    throw error;
  }
}
