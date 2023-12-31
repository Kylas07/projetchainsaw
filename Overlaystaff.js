  (function() {
        new Wombat({
            allowGuests: true,
            afterLoad: function(aside, overlay) {
                var inputElementFP = document.querySelector(".pataperstp.camcamlabest .contactop:nth-child(3) a");
                var inputElementFT = document.querySelector(".pataperstp.camcamlabest .contactop:nth-child(4) a");
                var inputElementCAR = document.querySelector(".pataperstp.camcamlabest .contactop:nth-child(5) a");
              
                var urlValueFP = inputElementFP.getAttribute('href');
                var urlValueFT = inputElementFT.getAttribute('href');
                var urlValueCAR = inputElementCAR.getAttribute('href');
              
                var linkElementFP = document.querySelector(".link_fp");
                var linkElementFT = document.querySelector(".link_ft");
                var linkElementCAR = document.querySelector(".link_carnet");

                linkElementFP.setAttribute('href', urlValueFP);
                linkElementFT.setAttribute('href', urlValueFT);
                linkElementCAR.setAttribute('href', urlValueCAR);

  var spanElement = aside.querySelector('.namepaginb span');
            var color = window.getComputedStyle(spanElement).getPropertyValue('color');
            
            aside.querySelector('.discord_container').style.setProperty('--coloblock', color);
       
            }
        });
    })();
