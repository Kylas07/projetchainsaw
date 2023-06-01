const tabButton = document.querySelector('.tab-button');
const contentItems = document.querySelectorAll('.content-item');

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


const posts = document.querySelectorAll('.post.post_row');


posts.forEach((post) => {
  const dateInscriptionText = post.querySelector('.user_field.field-date-dinscription .field_content').textContent;
  const pointsText = post.querySelector('.user_field.field-points .field_content').textContent;
  const argentText = post.querySelector('.user_field.field-argent .field_content').textContent;
  const messageText = post.querySelector('.user_field.field-messages .field_content').textContent;
    post.querySelector('.champ_msg').textContent = messageText;
    post.querySelector('.champ_inscr').textContent = dateInscriptionText;
    post.querySelector('.champ_xp').textContent = pointsText;
    post.querySelector('.champ_money').textContent = argentText;

  const pronomText = post.querySelector('.user_field.field-pronoms .field_content').textContent;
  const TwText = post.querySelector('.user_field.field-tw .field_content').textContent;
  const FeatText = post.querySelector('.user_field.field-feat-credits .field_content').textContent;
  const RunesText = post.querySelector('.user_field.field-runes-actives .field_content').innerHTML;
  const userField = document.querySelector('.user_field.field-icon-profil .field_content');
  const htmlContent = userField.innerHTML;
  const iconPost = document.querySelector('.iconpost');
  
    iconPost.innerHTML = htmlContent;
    post.querySelector('.champ_pronom').textContent = pronomText;
    post.querySelector('.champ_tw').textContent = TwText;
    post.querySelector('.champ_feat').textContent = FeatText;
    post.querySelector('.champ_runes').innerHTML = RunesText;
});
