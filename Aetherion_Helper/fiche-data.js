/* Shared data + helpers for the Aetherion "fiche de présentation" editor.
   Exposes everything on window.FICHE.
   Récupération = scan of a pasted/fetched fiche DOM (no base64 blob):
   every field lives in a semantic class or a data-* attribute so the sheet
   can be re-read even if the CSS changes. */
(function () {
  /* ---- groups (les statuts du jeu) ---- */
  const GROUPS = ['Ascendants', 'Ancrés', 'Brisés', 'Éveillés', 'Killers'];
  const GROUP_META = {
    'Ascendants': { color: '#E0A92B', tag: 'Ils grimpent les étages, coûte que coûte.' },
    'Ancrés':     { color: '#3C8FE0', tag: 'Ils ont fait de ce monde leur foyer.' },
    'Brisés':     { color: '#6E5A9B', tag: 'Le jeu a eu raison d\u2019eux.' },
    'Éveillés':   { color: '#2FA7A0', tag: 'Ils cherchent la vérité derrière Aetherion.' },
    'Killers':    { color: '#D6365A', tag: 'Tuer un joueur, c\u2019est tuer un humain.' }
  };
  function groupColor(g) { return (GROUP_META[g] || {}).color || '#C25C3A'; }
  function groupTag(g) { return (GROUP_META[g] || {}).tag || ''; }

  const ACCENTS = ['#C25C3A', '#E07A4E', '#B0492B', '#8A8F98', '#D98C3F', '#5E6B78', '#6E5A9B', '#2FA7A0'];

  /* type colours — reuse TCARD if present, else a local table */
  const TYPE = (window.TCARD && window.TCARD.TYPE) || {
    'Normal': '#9FA39B', 'Feu': '#E84C3D', 'Eau': '#3C8FE0', 'Plante': '#4BAE4F',
    'Électrik': '#F2C94C', 'Glace': '#56CCE0', 'Combat': '#E0762B', 'Poison': '#A052C8',
    'Sol': '#C08A3E', 'Vol': '#88AEE8', 'Psy': '#EC5C8E', 'Insecte': '#9AAB2A',
    'Roche': '#BBA968', 'Spectre': '#6E5A9B', 'Dragon': '#5763E0', 'Ténèbres': '#4E4A57',
    'Acier': '#6BA7B8', 'Fée': '#EE8FCB'
  };
  const TYPE_LIST = Object.keys(TYPE);
  function typeColor(t) { return TYPE[t] || '#9AA2B0'; }
  const NATURES = (window.TCARD && window.TCARD.NATURES) || ['Assuré', 'Modeste', 'Timide', 'Calme', 'Sérieux', 'Relax', 'Pressé', 'Jovial'];

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* rich text <-> plain text (paragraphs on blank line, <br> on single newline) */
  function textToHtml(txt) {
    const paras = String(txt == null ? '' : txt).replace(/\r\n/g, '\n').split(/\n{2,}/);
    return paras.filter(function (p) { return p.trim() !== ''; })
      .map(function (p) { return '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>'; }).join('');
  }
  function htmlToText(html) {
    let s = String(html == null ? '' : html);
    s = s.replace(/<\s*br\s*\/?>/gi, '\n')
         .replace(/<\/\s*p\s*>\s*<\s*p[^>]*>/gi, '\n\n')
         .replace(/<\/?[^>]+>/g, '');
    const d = document.createElement('textarea'); d.innerHTML = s;
    return d.value.replace(/\u00a0/g, ' ').replace(/[ \t]+\n/g, '\n').trim();
  }

  const THEME = {
    card: '#FFFFFF', header: '#211C18', headText: '#FFFFFF', headMuted: '#EDE6DD',
    inset: '#F8F5F0', insetBorder: '#ECE6DD', border: '#E7E2DA',
    head: '#26221D', body: '#4E483F', muted: '#948B7F',
    disp: "'Oswald','Arial Narrow',Verdana,sans-serif",
    bodyFont: "'Barlow',Verdana,Geneva,sans-serif",
    shadow: '0 18px 44px -22px rgba(45,38,30,.38)',
    stripe: 'repeating-linear-gradient(45deg,#F0ECE4 0 7px,#E7E1D8 7px 14px)'
  };

  const DEFAULT_FICHE = {
    accent: '#C25C3A',
    name: 'Rennac Solheim',
    alias: 'Le Colporteur du Troisième Étage',
    portrait: '',
    age: '27 ans',
    sexe: 'Masculin',
    birthday: '14 février',
    occupation: 'Marchand ambulant · guide de bas-étages',
    group: 'Ancrés',
    traits: ['Débrouillard', 'Bavard', 'Méfiant', 'Loyal', 'Opportuniste', 'Protecteur'],
    realWorld: "Développeur junior de 27 ans, Rennac s'était offert Aetherion le jour du lancement pour fuir un open space sans fenêtres.\nIl n'a prévenu personne avant de mettre le casque : il comptait juste \u00ab tester deux heures \u00bb.",
    personality: "Rennac parle vite, tout le temps, et rarement pour ne rien dire. Sous la faconde du marchand se cache un survivant méthodique qui a compris très tôt qu'on tient plus longtemps en réseau qu'en solitaire.\n\nIl refuse de grimper les étages : trop de morts, trop de héros. Sa stratégie tient en une phrase — rester utile à tout le monde pour n'être l'ennemi de personne.",
    pokemon: { sprite: '', name: 'Braise', species: 'Goupix', types: ['Feu'], level: 22, nature: 'Assuré', desc: "Trouvé tremblant dans les décombres de l'étage 2. Braise sert de chaufferette, de vigie et d'associé commercial — il flaire les clients honnêtes." },
    history: "Les trois premiers jours, Rennac a fait comme tout le monde : il a paniqué.\nPuis il a ouvert son sac, compté ses objets, et ouvert boutique.\n\nDeux ans plus tard, sa camelote a sauvé plus de vies que bien des épées. Il connaît chaque PNJ marchand, chaque raccourci, chaque rumeur — et il vend l'information au prix fort, sauf quand il s'agit d'un gamin perdu.",
    player: { pseudo: 'kylas', age: '', country: 'Belgique', note: "Réponds vite en journée, plus lente le soir. RP long apprécié mais je m'adapte." }
  };

  function normalize(d) {
    d = d || {};
    const p = d.pokemon || {};
    const pl = d.player || {};
    return {
      accent: d.accent || '#C25C3A',
      name: d.name != null ? d.name : '',
      alias: d.alias != null ? d.alias : '',
      portrait: d.portrait || '',
      age: d.age != null ? d.age : '',
      sexe: d.sexe != null ? d.sexe : '',
      birthday: d.birthday != null ? d.birthday : '',
      occupation: d.occupation != null ? d.occupation : '',
      group: GROUPS.indexOf(d.group) >= 0 ? d.group : 'Ancrés',
      traits: (Array.isArray(d.traits) ? d.traits : []).map(function (t) { return t == null ? '' : String(t); }),
      realWorld: d.realWorld != null ? d.realWorld : '',
      personality: d.personality != null ? d.personality : '',
      pokemon: {
        sprite: p.sprite || '', name: p.name != null ? p.name : '', species: p.species != null ? p.species : '',
        types: (Array.isArray(p.types) && p.types.length ? p.types : ['Normal']).slice(0, 2),
        level: (p.level != null && p.level !== '') ? p.level : '', nature: p.nature != null ? p.nature : '',
        desc: p.desc != null ? p.desc : ''
      },
      history: d.history != null ? d.history : '',
      player: {
        pseudo: pl.pseudo != null ? pl.pseudo : '', age: pl.age != null ? pl.age : '',
        country: pl.country != null ? pl.country : '', note: pl.note != null ? pl.note : ''
      }
    };
  }

  /* ================= BUILD ================= */
  const FICHE_CSS =
    "@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow:wght@400;500;600;700&display=swap');" +
    '.aeth-fiche{width:650px;max-width:100%;margin:0 auto;font-family:' + THEME.bodyFont + ';background:' + THEME.card + ';border:1px solid ' + THEME.border + ';border-radius:16px;overflow:hidden;box-shadow:' + THEME.shadow + ';color:' + THEME.body + '}' +
    '.aeth-fiche *{box-sizing:border-box}' +
    '.aeth-fiche .af-banner{background:' + THEME.header + ';padding:26px 30px;border-bottom:3px solid var(--acc)}' +
    '.aeth-fiche .af-kick{font-family:' + THEME.disp + ';font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--acc);font-weight:600}' +
    '.aeth-fiche .af-name{font-family:' + THEME.disp + ';font-size:38px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:' + THEME.headText + ';line-height:1;margin-top:7px}' +
    '.aeth-fiche .af-alias{font-style:italic;color:' + THEME.headMuted + ';font-size:14px;margin-top:9px;opacity:.92}' +
    '.aeth-fiche .af-groupband{display:flex;align-items:center;justify-content:center;gap:14px;background:var(--gc);padding:10px 16px;color:#fff}' +
    '.aeth-fiche .af-groupname{font-family:' + THEME.disp + ';letter-spacing:5px;text-transform:uppercase;font-weight:700;font-size:15px}' +
    '.aeth-fiche .af-grouptag{font-size:11.5px;font-style:italic;opacity:.9;border-left:1px solid rgba(255,255,255,.4);padding-left:14px}' +
    '.aeth-fiche .af-idrow{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:' + THEME.insetBorder + '}' +
    '.aeth-fiche .af-idcell{background:' + THEME.inset + ';padding:13px 16px}' +
    '.aeth-fiche .af-idlabel{font-size:9px;letter-spacing:1.4px;text-transform:uppercase;color:' + THEME.muted + ';font-weight:700}' +
    '.aeth-fiche .af-idval{font-size:13.5px;font-weight:600;color:' + THEME.head + ';margin-top:3px}' +
    '.aeth-fiche .af-sec{padding:22px 30px}' +
    '.aeth-fiche .af-sec+.af-sec{border-top:1px solid ' + THEME.border + '}' +
    '.aeth-fiche .af-sech{font-family:' + THEME.disp + ';font-size:13px;letter-spacing:2.5px;text-transform:uppercase;color:var(--acc);font-weight:600;display:flex;align-items:center;gap:13px;margin-bottom:15px}' +
    '.aeth-fiche .af-sech::after{content:"";flex:1;height:2px;background:var(--acc);opacity:.28;border-radius:2px}' +
    '.aeth-fiche .af-fold>summary{list-style:none;cursor:pointer;margin-bottom:0}' +
    '.aeth-fiche .af-fold>summary::-webkit-details-marker{display:none}' +
    '.aeth-fiche summary.af-sech::after{display:none}' +
    '.aeth-fiche .af-fold[open]>summary{margin-bottom:15px}' +
    '.aeth-fiche .af-line{flex:1;height:2px;background:var(--acc);opacity:.28;border-radius:2px}' +
    '.aeth-fiche .af-chev{font-size:10px;opacity:.6;transition:transform .2s;flex:none}' +
    '.aeth-fiche .af-fold[open]>summary .af-chev{transform:rotate(180deg)}' +
    '.aeth-fiche .af-traits{display:flex;flex-wrap:wrap;gap:7px}' +
    '.aeth-fiche .af-trait{background:' + THEME.inset + ';border:1px solid ' + THEME.insetBorder + ';border-radius:7px;padding:6px 13px;font-size:12.5px;font-weight:600;color:' + THEME.body + '}' +
    '.aeth-fiche .af-perso{display:flex;gap:22px;flex-wrap:wrap}' +
    '.aeth-fiche .af-portrait{width:250px;flex:none;aspect-ratio:250/350;border-radius:13px;overflow:hidden;border:1px solid ' + THEME.border + ';background:' + THEME.stripe + ';display:flex;align-items:center;justify-content:center}' +
    '.aeth-fiche .af-portrait img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.aeth-fiche .af-portrait .ph{font-family:monospace;font-size:11px;color:' + THEME.muted + '}' +
    '.aeth-fiche .af-txt{flex:1;min-width:220px}' +
    '.aeth-fiche .af-txt p{margin:0 0 12px;font-size:13.5px;line-height:1.72}.aeth-fiche .af-txt p:last-child{margin-bottom:0}' +
    '.aeth-fiche .af-personality{max-height:350px;overflow-y:auto;padding-right:10px}' +
    '.aeth-fiche .af-pkmn{display:flex;gap:18px;align-items:center;background:' + THEME.header + ';border-radius:14px;padding:18px 20px}' +
    '.aeth-fiche .af-pkmn-sprite{width:104px;height:104px;flex:none;border-radius:12px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12)}' +
    '.aeth-fiche .af-pkmn-sprite img{max-width:100%;max-height:100%;object-fit:contain;image-rendering:pixelated}' +
    '.aeth-fiche .af-pkmn-sprite .ph{font-family:monospace;font-size:10px;color:#8B837A}' +
    '.aeth-fiche .af-pkmn-body{flex:1;min-width:0}' +
    '.aeth-fiche .af-pkmn-top{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}' +
    '.aeth-fiche .af-pkmn-name{font-family:' + THEME.disp + ';font-size:22px;font-weight:700;letter-spacing:.5px;color:var(--acc)}' +
    '.aeth-fiche .af-pkmn-meta{font-size:12px;color:' + THEME.headMuted + '}' +
    '.aeth-fiche .af-pkmn-types{display:flex;gap:5px;margin:9px 0}' +
    '.aeth-fiche .af-pkmn-type{color:#fff;font-size:10.5px;font-weight:700;padding:3px 10px;border-radius:6px;letter-spacing:.3px}' +
    '.aeth-fiche .af-pkmn-desc{margin:0;font-size:12.5px;line-height:1.62;color:' + THEME.headMuted + ';font-style:italic}' +
    '.aeth-fiche .af-player{background:' + THEME.inset + ';border:1px solid ' + THEME.insetBorder + ';border-radius:13px;padding:18px 20px}' +
    '.aeth-fiche .af-player-grid{display:flex;gap:26px;flex-wrap:wrap;margin-bottom:10px}' +
    '.aeth-fiche .af-player-cell .l{font-size:9px;letter-spacing:1.4px;text-transform:uppercase;color:' + THEME.muted + ';font-weight:700}' +
    '.aeth-fiche .af-player-cell .v{font-size:14px;font-weight:700;color:' + THEME.head + ';margin-top:2px}' +
    '.aeth-fiche .af-player-note{margin:0;font-size:12.5px;line-height:1.6;color:' + THEME.body + '}' +
    '.aeth-fiche .af-empty{font-size:12px;color:' + THEME.muted + ';font-style:italic}';

  function buildFicheHTML(d, inlineCss) {
    d = normalize(d);
    const withCss = inlineCss !== false;
    const acc = d.accent || '#C25C3A';
    const gc = groupColor(d.group);

    const portrait = d.portrait
      ? '<img src="' + esc(d.portrait) + '" alt="">'
      : '<span class="ph">250 &times; 350</span>';

    const traits = d.traits.filter(function (t) { return t && t.trim(); })
      .map(function (t) { return '<span class="af-trait">' + esc(t) + '</span>'; }).join('')
      || '<span class="af-empty">Aucun trait renseigné</span>';

    const p = d.pokemon;
    const pkmnSprite = p.sprite ? '<img src="' + esc(p.sprite) + '" alt="">' : '<span class="ph">[ sprite ]</span>';
    const pkmnTypes = (p.types || []).map(function (t) {
      return '<span class="af-pkmn-type" style="background:' + typeColor(t) + '" data-type="' + esc(t) + '">' + esc(t) + '</span>';
    }).join('');
    const pkmnMetaBits = [];
    if (p.species) pkmnMetaBits.push('<span class="af-pkmn-species">' + esc(p.species) + '</span>');
    if (p.level !== '' && p.level != null) pkmnMetaBits.push('Niv. <span class="af-pkmn-level">' + esc(p.level) + '</span>');
    if (p.nature) pkmnMetaBits.push('Nature <span class="af-pkmn-nature">' + esc(p.nature) + '</span>');

    const idCell = function (k, label, val) {
      return '<div class="af-idcell"><div class="af-idlabel">' + label + '</div><div class="af-idval af-' + k + '">' + esc(val || '—') + '</div></div>';
    };

    const foldSum = function (title) {
      return '<summary class="af-sech"><span>' + title + '</span><span class="af-line"></span><span class="af-chev">\u25be</span></summary>';
    };
    const secRealWorld = d.realWorld.trim()
      ? '<details class="af-sec af-fold" open>' + foldSum('Qui étais-tu dans le vrai monde ?') + '<div class="af-txt af-realworld">' + textToHtml(d.realWorld) + '</div></details>' : '';
    const secHistory = d.history.trim()
      ? '<details class="af-sec af-fold" open>' + foldSum('L\u2019histoire') + '<div class="af-txt af-history">' + textToHtml(d.history) + '</div></details>' : '';

    const playerCell = function (k, label, val) {
      return '<div class="af-player-cell"><div class="l">' + label + '</div><div class="v af-pl-' + k + '">' + esc(val || '—') + '</div></div>';
    };

    return '<div class="aeth-fiche" data-accent="' + esc(acc) + '" data-group="' + esc(d.group) + '" style="--acc:' + esc(acc) + ';--gc:' + gc + '">' +
      (withCss ? '<style>' + FICHE_CSS + '</style>' : '') +
      '<div class="af-banner">' +
        '<div class="af-kick">Aetherion · Fiche de présentation</div>' +
        '<div class="af-name">' + esc(d.name || 'Sans nom') + '</div>' +
        (d.alias ? '<div class="af-alias">\u00ab\u2009<span class="af-aliastxt">' + esc(d.alias) + '</span>\u2009\u00bb</div>' : '') +
      '</div>' +
      '<div class="af-groupband"><span class="af-groupname">' + esc(d.group) + '</span>' +
        (groupTag(d.group) ? '<span class="af-grouptag">' + esc(groupTag(d.group)) + '</span>' : '') + '</div>' +
      '<div class="af-idrow">' +
        idCell('age', 'Âge', d.age) + idCell('birthday', 'Anniversaire', d.birthday) +
        idCell('sexe', 'Sexe', d.sexe) + idCell('occupation', 'Occupation dans le jeu', d.occupation) +
      '</div>' +
      '<div class="af-sec"><div class="af-sech">Traits de caractère</div><div class="af-traits">' + traits + '</div></div>' +
      secRealWorld +
      '<div class="af-sec"><div class="af-sech">Personnalité</div>' +
        '<div class="af-perso"><div class="af-portrait">' + portrait + '</div>' +
        '<div class="af-txt af-personality">' + (d.personality.trim() ? textToHtml(d.personality) : '<p class="af-empty">Personnalité à compléter.</p>') + '</div></div></div>' +
      '<div class="af-sec"><div class="af-sech">Pokémon fétiche</div>' +
        '<div class="af-pkmn"><div class="af-pkmn-sprite">' + pkmnSprite + '</div>' +
          '<div class="af-pkmn-body"><div class="af-pkmn-top"><span class="af-pkmn-name">' + esc(p.name || 'Sans nom') + '</span>' +
            (pkmnMetaBits.length ? '<span class="af-pkmn-meta">' + pkmnMetaBits.join(' · ') + '</span>' : '') + '</div>' +
            (pkmnTypes ? '<div class="af-pkmn-types">' + pkmnTypes + '</div>' : '') +
            (p.desc ? '<p class="af-pkmn-desc">' + esc(p.desc) + '</p>' : '') +
          '</div></div></div>' +
      secHistory +
      '<div class="af-sec"><div class="af-sech">Derrière l\u2019écran</div>' +
        '<div class="af-player"><div class="af-player-grid">' +
          playerCell('pseudo', 'Pseudo', d.player.pseudo) + playerCell('age', 'Âge', d.player.age) + playerCell('country', 'Pays', d.player.country) +
        '</div>' + (d.player.note ? '<p class="af-player-note af-pl-note">' + esc(d.player.note) + '</p>' : '') + '</div></div>' +
    '</div>';
  }

  /* ================= SCAN (récupération) ================= */
  function scanRoot(root) {
    if (!root) throw new Error('Aucune fiche trouvée');
    const txt = function (sel) { const el = root.querySelector(sel); return el ? el.textContent.trim() : ''; };
    const rich = function (sel) { const el = root.querySelector(sel); return el ? htmlToText(el.innerHTML) : ''; };
    const attr = function (sel, a) { const el = root.querySelector(sel); return el ? (el.getAttribute(a) || '') : ''; };

    const traits = Array.prototype.map.call(root.querySelectorAll('.af-trait'), function (el) { return el.textContent.trim(); })
      .filter(function (t) { return t; });
    const pkmnTypes = Array.prototype.map.call(root.querySelectorAll('.af-pkmn-type'), function (el) {
      return el.getAttribute('data-type') || el.textContent.trim();
    }).filter(Boolean);

    const groupAttr = root.getAttribute('data-group') || txt('.af-groupname');
    const idval = function (k) { const el = root.querySelector('.af-' + k); return el ? el.textContent.trim().replace(/^—$/, '') : ''; };

    return normalize({
      accent: root.getAttribute('data-accent') || (root.style && root.style.getPropertyValue('--acc')) || '#C25C3A',
      name: txt('.af-name'),
      alias: txt('.af-aliastxt'),
      portrait: attr('.af-portrait img', 'src'),
      age: idval('age'), sexe: idval('sexe'), birthday: idval('birthday'), occupation: idval('occupation'),
      group: GROUPS.indexOf(groupAttr) >= 0 ? groupAttr : 'Ancrés',
      traits: traits,
      realWorld: rich('.af-realworld'),
      personality: rich('.af-personality'),
      pokemon: {
        sprite: attr('.af-pkmn-sprite img', 'src'),
        name: txt('.af-pkmn-name'), species: txt('.af-pkmn-species'),
        types: pkmnTypes.length ? pkmnTypes : ['Normal'],
        level: txt('.af-pkmn-level'), nature: txt('.af-pkmn-nature'),
        desc: rich('.af-pkmn-desc')
      },
      history: rich('.af-history'),
      player: {
        pseudo: idorpl('pseudo', root), age: idorpl('age', root, true), country: idorpl('country', root), note: rich('.af-pl-note')
      }
    });
  }
  function idorpl(k, root, isAge) {
    const el = root.querySelector('.af-pl-' + k);
    if (!el) return '';
    const v = el.textContent.trim();
    return v === '—' ? '' : v;
  }

  function scanFiche(htmlOrEl) {
    if (htmlOrEl && htmlOrEl.nodeType === 1) {
      return scanRoot(htmlOrEl.classList.contains('aeth-fiche') ? htmlOrEl : htmlOrEl.querySelector('.aeth-fiche') || htmlOrEl);
    }
    const doc = new DOMParser().parseFromString(String(htmlOrEl || ''), 'text/html');
    const root = doc.querySelector('.aeth-fiche');
    if (!root) throw new Error('Aucune fiche Aetherion détectée dans ce code');
    return scanRoot(root);
  }

  window.FICHE = {
    GROUPS: GROUPS, GROUP_META: GROUP_META, groupColor: groupColor, groupTag: groupTag,
    ACCENTS: ACCENTS, TYPE: TYPE, TYPE_LIST: TYPE_LIST, typeColor: typeColor, NATURES: NATURES,
    clone: clone, normalize: normalize, DEFAULT_FICHE: DEFAULT_FICHE,
    buildFicheHTML: buildFicheHTML, FICHE_CSS: FICHE_CSS, scanFiche: scanFiche
  };
})();
