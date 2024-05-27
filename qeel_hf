$(function () {
  try {
    $('.qeel-third a[href^=\'/u\']').each(function() {
      var href = $(this).attr('href');
      $.get(href, function (d) {
        var img = $('#field_id2 img', $(d));
        var tooltipText = $('h1.page-title strong', $(d)).text(); 
        if (img.length) {
          img.each(function() {
            var avatarDiv = $('<div class="avatar_online_conteneur"></div>');
            avatarDiv.append($(this).clone());
            var userLink = $('<a>').attr('href', href).attr('data-tooltip', tooltipText); 
            userLink.append(avatarDiv);
            $('#online_users_img').append(userLink);
          });
        }
      }).fail(function() {
        console.error('Failed to load: ' + href);
      });
    });
  } catch(e) {
    console.error(e);
  }
});
