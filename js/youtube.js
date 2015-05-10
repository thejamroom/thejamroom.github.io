
var apiKey = 'AIzaSyC1zamPjKLCiux8Y7sExVvvPWZgRz-7AaY';
var channelId = 'UCWj0XuHsAYw2RDOO0l3RDug';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  if ($('.yt-container').length) {
    makeApiCall();
  }
}


function makeApiCall() {
  gapi.client.load('youtube', 'v3').then(function() {
    // var request = gapi.client.youtube.channels.list({
    //   part: 'contentDetails',
    //   id: channelId
    // });
    // request.execute(function(response) {
      // var playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
      var playlistId = 'PLk9MuZSSN5aidOH0pwD8ifICQqzF3ZrnR'

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
          var iframe = '<div class="embed-responsive embed-responsive-4by3"><iframe class="embed-responsive-item" src="//www.youtube.com/embed/' + video_id + '"></iframe></div>'
          var div = '<li style="width: 200px;">' + iframe + '</li>';

          $('.yt-container').append(div);
          $('.jcarousel')
          .on('jcarousel:create jcarousel:reload', function() {
              var element = $(this),
                  width = element.innerWidth();

              // This shows 1 item at a time.
              // Divide `width` to the number of items you want to display,
              // eg. `width = width / 3` to display 3 items at a time.
              element.jcarousel('items').css('width', width + 'px');
          })
          .jcarousel({
              // Your configurations options
          });
        }
      });
    // })

  });
}

