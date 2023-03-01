window.addEventListener("load", function() {
  var contpa = document.getElementById("contpa");
  var navpa = document.querySelector(".navigationpa");
  var contentpa = document.getElementById("contentpa");
  
  setTimeout(function() {
    contpa.style.opacity = "1";
  }, 500);
  
  setTimeout(function() {
    navpa.style.opacity = "1";
  }, 1000);
  
  setTimeout(function() {
    contentpa.style.opacity = "1";
  }, 1500);
});

function openTabs(evt, tabName) {
  // Récupérer tous les éléments avec la classe "tabcontent" et les masquer
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
    tabcontent[i].style.opacity = "0";
    setTimeout(() => {
      tabcontent[i].style.display = "none";
    }, 300);
  }
  
  // Récupérer tous les éléments avec la classe "tablinks" et les désactiver
  var tablinks = document.getElementsByClassName("tablinks");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // Afficher le contenu de la div correspondante
  document.getElementById(tabName).classList.add("active");
  document.getElementById(tabName).style.display = "block";
  setTimeout(() => {
    document.getElementById(tabName).style.opacity = "1";
  }, 50);

  // Activer le bouton tablink correspondant
  evt.currentTarget.classList.add("active");
  
  // Modifier le texte dans le span oeeee avec le nom du tablink
  document.querySelector('.oeeee').textContent = evt.currentTarget.dataset.tabname;
}

document.addEventListener('DOMContentLoaded', () => {
    // sélectionne l'élément HTML qui représente le cercle
    const cercle = document.getElementById('mouse-circle');

    // fonction pour suivre la souris
    function suivreSouris(e) {
        // si la souris est dans la div "contpa"
        if (e.target.closest('#contpa')) {
            // fait suivre le cercle à la position de la souris
            cercle.style.left = e.pageX + 'px';
            cercle.style.top = e.pageY + 'px';
            // si la souris est sur une div avec la classe "tablinks", ajoute la classe "circle-opaque" au cercle
            if (e.target.classList.contains('tablinks')) {
                cercle.classList.add('circle-opaque');
            } else {
                cercle.classList.remove('circle-opaque');
            }
        } else {
            // si la souris est en dehors de la div "contpa", cache le cercle
            cercle.style.display = 'none';
        }
    }

    // fonction pour afficher le cercle lorsqu'il entre dans la div "contpa"
    function afficherCercle(e) {
        if (e.target.closest('#contpa')) {
            cercle.style.display = 'block';
        }
    }

    // fonction pour cacher le cercle lorsqu'il sort de la div "contpa"
    function cacherCercle(e) {
        cercle.style.display = 'none';
    }

    // ajoute les événements à la div "contpa"
    const contpa = document.getElementById('contpa');
    contpa.addEventListener('mousemove', suivreSouris);
    contpa.addEventListener('mouseenter', afficherCercle);
    contpa.addEventListener('mouseleave', cacherCercle);
});
