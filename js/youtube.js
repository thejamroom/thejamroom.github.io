
var apiKey = 'AIzaSyC1zamPjKLCiux8Y7sExVvvPWZgRz-7AaY';
var channelId = 'UCYjk_zY-iYR8YNfJmuzd70A';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
}


function makeApiCall() {
  gapi.client.load('youtube', 'v3').then(function() {
    var request = gapi.client.youtube.channels.list({
      part: 'contentDetails',
      id: channelId
    });
    request.execute(function(response) {
      var playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
      console.log(playlistId);
      var request = gapi.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 10
      });
      request.execute(function(response) {
        console.log(response);
        var items = response.result.items;
        for (var i = 0; i < items.length; i++) {
          var video_id = items[i].snippet.resourceId.videoId;
          var iframe = '<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/' + video_id + '"frameborder="0"/>';
          $('.yt-container').append(iframe);
        }
      });
    })

  });
  
}