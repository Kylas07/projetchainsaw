document.addEventListener('DOMContentLoaded', () => {
  const profileContainers = document.querySelectorAll('aside.wombat-aside');

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
