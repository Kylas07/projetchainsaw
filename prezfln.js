 document.addEventListener('DOMContentLoaded', function() {
    function changeTab(tabId) {
      var contents = document.querySelectorAll('.tabs-contenu > div');
      for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
      }

      var links = document.querySelectorAll('.tabs-selector > a');
      for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('selected');
      }

   document.getElementById(tabId).style.display = 'block';

      var selectedLink = document.querySelector('a[href="' + tabId + '"]');
      if (selectedLink) {
        selectedLink.classList.add('selected');
      }
    }

    var tabLinks = document.querySelectorAll('.tabs-selector > a');
    for (var i = 0; i < tabLinks.length; i++) {
      tabLinks[i].addEventListener('click', function(event) {
        event.preventDefault();
        var tabId = this.getAttribute('href').substring(1); // 
        changeTab(tabId);
      });
    }

    changeTab('tab1');
  });

document.addEventListener('DOMContentLoaded', function() {
  var skillElements = document.querySelectorAll('.skillss');

  skillElements.forEach(function(skillElement) {
    var collapsingElement = skillElement.querySelector('.collapsingskill');

    skillElement.addEventListener('click', function() {
      collapsingElement.classList.toggle('open');
    });
  });
});
