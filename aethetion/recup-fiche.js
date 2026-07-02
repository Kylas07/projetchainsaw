/* ================================================================
   Aetherion · récupération de fiche (bouton "Éditer cette fiche")
   ----------------------------------------------------------------
   À héberger et charger dans le HEAD du forum (comme ton ancien
   generateurscript.js). Il définit la fonction globale aethEditFiche().

   Utilisation : place ce bouton dans tes ACTIONS FORUM / le post :

     <button type="button" onclick="aethEditFiche(this)">Éditer cette fiche</button>

   Au clic : il scanne la fiche .aeth-fiche de la page, la dépose dans
   sessionStorage, puis redirige vers la page-éditeur (même domaine
   forum → le sessionStorage est partagé, l'éditeur le relit tout seul).
   ================================================================ */
(function () {

  /* ▼▼▼ RÉGLAGE : l'adresse de ta page-éditeur sur le forum ▼▼▼
     - chemin relatif  : "/h5-editeur-de-fiche"   (recommandé, même domaine)
     - ou URL complète : "https://ton-forum.com/h5-editeur-de-fiche"        */
  var EDITOR_URL = "/editeur-de-fiche";

  function findFiche(btn) {
    // 1) fiche contenue dans le même bloc que le bouton (topic multi-posts)
    if (btn && btn.closest) {
      var scope = btn.closest('.postbody, .post-entry, .post, .entry-content, article, td, div');
      while (scope) {
        var f = scope.querySelector && scope.querySelector('.aeth-fiche');
        if (f) return f;
        scope = scope.parentElement && scope.parentElement.closest
          ? scope.parentElement.closest('.postbody, .post-entry, .post, .entry-content, article, td, div')
          : null;
      }
    }
    // 2) sinon, la première fiche de la page
    return document.querySelector('.aeth-fiche');
  }

  window.aethEditFiche = function (btn) {
    var fiche = findFiche(btn);
    if (!fiche) { alert("Aucune fiche Aetherion trouvée sur cette page."); return; }
    try {
      // on dépose le HTML complet de la fiche : l'éditeur le relit avec son propre parseur
      sessionStorage.setItem('aethFicheHTML', fiche.outerHTML);
    } catch (e) {
      alert("Impossible de mémoriser la fiche (stockage du navigateur bloqué)."); return;
    }
    var url = /^https?:\/\//i.test(EDITOR_URL) ? EDITOR_URL : (window.location.origin + EDITOR_URL);
    window.location.href = url;
  };

  // alias sans argument, si tu préfères onclick="aethEditFiche()"
  // (utilisera alors la première fiche de la page)
})();
