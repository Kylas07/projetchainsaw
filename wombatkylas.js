var Wombat = function() {
  "use strict";

  function e() {
    return -1 == parseInt(
      (my_getcookie("fa_" + location.host.replace(/\./g, "_") + "_data") || "").match(/"userid";(?:s:[0-9]+:"|i:)([0-9]+)/) || [0, -1])[1]
  }
  const o = {
    excludes: [],
    allowGuests: !1,
    selector: "#wombat",
    displayOnLoad: "",
    overlay: !0,
    overlayClass: "wombat-overlay",
    drawerClass: "wombat-aside",
    afterLoad: function(aside, overlay) {
      document.addEventListener('DOMContentLoaded', () => {
        const profileContainers = aside.querySelectorAll('aside.wombat-aside');

        profileContainers.forEach((profileContainer) => {
          const iconMood = profileContainer.querySelector('.iconmood');
          const quoteElement = profileContainer.querySelector('.quote');
          const discordInfoElement = profileContainer.querySelector('.discord_gimmik_date discord_info');
          const discordGimmikBottom = profileContainer.querySelector('.discord_gimmik_bottom span');
          const champRunes = profileContainer.querySelector('.discord_gimmik_tags .champ_runes');

          if (profileContainer) {
            const iconImageUrl = profileContainer.querySelector('#field_id7 img').src;
            iconMood.innerHTML = `<img src="${iconImageUrl}">`;

            const quoteText = profileContainer.querySelector('#field_id6 div.field_uneditable').innerHTML;
            quoteElement.innerHTML = quoteText;

            const inscriptionDate = profileContainer.querySelector('#field_id-4 div.field_uneditable').textContent;
            discordInfoElement.textContent = inscriptionDate;

            const bottomText = profileContainer.querySelector('#field_id-9 div.field_uneditable').textContent;
            discordGimmikBottom.textContent = bottomText;

            const runesHTML = profileContainer.querySelector('#field_id-20 div.field_uneditable').innerHTML;
            champRunes.innerHTML = runesHTML;
          }

          const field1 = profileContainer.querySelector('#field_id1.profile_field field div.field_uneditable img');
          const iconpostContainer = profileContainer.querySelector('.iconpost');

          if (field1 && iconpostContainer) {
            const field1HTML = field1.outerHTML;
            iconpostContainer.innerHTML = field1HTML;
          }

          const field8 = profileContainer.querySelector('#field_id8');
          const discordGimmikPlayer = profileContainer.querySelector('.discord_gimmik_player');

          if (field8 && discordGimmikPlayer) {
            const fieldUneditable = field8.querySelector('.field_uneditable');
            if (fieldUneditable) {
              const fieldValue = fieldUneditable.textContent;
              const imageRegex = /Image : (.+)/;
              const titreRegex = /Titre : (.+)Artiste : (.+)/;
              const lienRegex = /Lien de la musique : (.+)/;
              const imageMatch = fieldValue.match(imageRegex);
              const titreMatch = fieldValue.match(titreRegex);
              const lienMatch = fieldValue.match(lienRegex);

              if (imageMatch && titreMatch && lienMatch) {
                const image = imageMatch[1];
                const titre = titreMatch[1];
                const artiste = titreMatch[2];
                const lienMusique = lienMatch[1];

                const imageElement = discordGimmikPlayer.querySelector('img');
                const artisteElement = discordGimmikPlayer.querySelector('div strong');
                const lienMusiqueElement = discordGimmikPlayer.querySelector('.fakeplayer a');

                if (imageElement && artisteElement && lienMusiqueElement) {
                  imageElement.src = image;
                  artisteElement.textContent = artiste;
                  lienMusiqueElement.href = lienMusique;
                }
              }
            }
          }
        });
      });
    }
  };

  function t(t) {
    if (!new.target) throw "Wombat() doit être utilisé comme constructeur et déclaré avec le mot-clef new.";
    this.dependencies = {
      switcheroo: "undefined" != typeof Switcheroo
    }, this.options = Object.assign({}, o, t), !this.options.allowGuests && e() || (this.transitionEnd = (t = document.createElement("div")).style.WebkitTransition ? "webkitTransitionEnd" : t.style.OTransition ? "oTransitionEnd" : "transitionend", this.onClick())
  }
  return t.prototype.build = function() {
    var t = document.createDocumentFragment();
    this.aside = document.createElement("aside"), this.aside.className = this.options.drawerClass, this.aside.appendChild(this.content), t.appendChild(this.aside), this.options.overlay && (this.overlay = document.createElement("div"), this.overlay.className = this.options.overlayClass, t.appendChild(this.overlay)), document.body.appendChild(t), "function" == typeof this.options.afterLoad && this.options.afterLoad(this.aside, this.overlay), window.getComputedStyle(this.aside).height, this.aside.classList.add("open"), this
