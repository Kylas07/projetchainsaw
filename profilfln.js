document.addEventListener('DOMContentLoaded', () => {
  const posts = document.querySelectorAll('.post.post_row');

  posts.forEach((post) => {
    const dateInscriptionField = post.querySelector('.user_field.field-date-dinscription .field_content');
    const dateInscriptionText = dateInscriptionField ? dateInscriptionField.textContent : 'Date d\'inscription par défaut';
    
    const pointsField = post.querySelector('.user_field.field-points .field_content');
    const pointsText = pointsField ? pointsField.textContent : '0xp';
    
    const argentField = post.querySelector('.user_field.field-argent .field_content');
    const argentText = argentField ? argentField.textContent : '0$';
    
    const tierField = post.querySelector('.user_field.field-tier .field_content');
    const tierText = tierField ? tierField.textContent : 'tier 0';
    
    const descriptionField = post.querySelector('.user_field.field-description .field_content');
    const descriptionText = descriptionField ? argentField.textContent : 'description de votre personnage';
    
    const messageField = post.querySelector('.user_field.field-messages .field_content');
    const messageText = messageField ? messageField.textContent : 'Message par défaut';
    
    post.querySelector('.champ_msg').textContent = messageText;
    post.querySelector('.champ_inscr').textContent = dateInscriptionText;
    post.querySelector('.champ_xp').textContent = pointsText;
    post.querySelector('.champ_money').textContent = argentText;
    post.querySelector('.champ_origine').textContent = descriptionText;
    post.querySelector('.champ_champ_tier').textContent = tierText;
    
    const pronomField = post.querySelector('.user_field.field-pronoms .field_content');
    const pronomText = pronomField ? pronomField.textContent : 'Pronom par défaut';
    
    const twField = post.querySelector('.user_field.field-tw .field_content');
    const TwText = twField ? twField.textContent : 'Tw par défaut';
    
    const featField = post.querySelector('.user_field.field-feat-credits .field_content');
    const FeatText = featField ? featField.textContent : 'Feat par défaut';
    
    const runesField = post.querySelector('.user_field.field-runes-actives .field_content');
    const RunesText = runesField ? runesField.innerHTML : 'Runes par défaut';
    
    const iconPost = post.querySelector('.iconpost');
    const userField = post.querySelector('.user_field.field-icon-profil .field_content');
    const htmlContent = userField ? userField.innerHTML : 'https://i.imgur.com/C3v7rCi.png';

    const icon2Post = post.querySelector('.iconmood');
    const userField2 = post.querySelector('.user_field.field-icon-profil2 .field_content');
    const htmlContent = userField2 ? userField2.innerHTML : 'https://i.imgur.com/C3v7rCi.png';
    
    iconPost.innerHTML = htmlContent;
    icon2Post.innerHTML = htmlContent;
    post.querySelector('.champ_pronom').textContent = pronomText;
    post.querySelector('.champ_tw').textContent = TwText;
    post.querySelector('.champ_feat').textContent = FeatText;
    post.querySelector('.champ_runes').innerHTML = RunesText;
  });

  const postRows = document.querySelectorAll('.post_row');

  postRows.forEach((postRow) => {
    const tabButton = postRow.querySelector('.tab-button');
    const contentItems = postRow.querySelectorAll('.content-item');
    let activeIndex = 0;

    tabButton.addEventListener('click', () => {
      activeIndex = (activeIndex === 0) ? 1 : 0;

      contentItems.forEach(item => {
        item.classList.remove('active', 'slide-in', 'slide-out');
      });

      contentItems[activeIndex].classList.add('active', 'slide-in');
      contentItems.forEach((item, itemIndex) => {
        if (itemIndex !== activeIndex) {
          item.classList.add('slide-out');
        }
      });

      if (activeIndex === 0) {
        tabButton.textContent = '⌃';
        tabButton.classList.remove('tab-button2');
        tabButton.classList.add('tab-button1');
      } else {
        tabButton.textContent = '⌄';
        tabButton.classList.remove('tab-button1');
        tabButton.classList.add('tab-button2');
      }
    });
  });
});
