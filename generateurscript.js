const { createApp } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})
createApp({
  data() {
    const classes = [
      { value: 'paladin', title: 'Paladin' },
      { value: 'chevalier', title: 'Chevalier' },
      { value: 'berserker', title: 'Berserker' },
      { value: 'artiste', title: 'Artiste' },
      { value: 'clerc', title: 'Clerc' },
      { value: 'druide', title: 'Druide' },
      { value: 'traqueur', title: 'Traqueur' },
      { value: 'spectre', title: 'Spectre' },
      { value: 'artificier', title: 'Artificier' },
      { value: 'elementaliste', title: 'Élémentaliste' },
      { value: 'necromancien', title: 'Nécromancien' },
      { value: 'enchanteur', title: 'Enchanteur' },
      { value: 'sabreur', title: 'Sabreur' },
      { value: 'occultiste', title: 'Occultiste' },
      { value: 'invocateur', title: 'Invocateur' }
    ];
    const race = [
      { value: 'humain', title: 'humain' },
      { value: 'elfe', title: 'elfe' },
      { value: 'faune', title: 'faune' },
      { value: 'sangdragon', title: 'sangdragon' },
      { value: 'marinis', title: 'marinis' },
      { value: 'vampire', title: 'vampire' },
      { value: 'damné', title: 'damné' },
      { value: 'hybride', title: 'hybride' }
    ];

    return {
      character: {
        couleurMain: '',
        couleurSub: '',
        nom: '',
        alias: '',
        age: null,
        playStyle: '',
        job: '',
        pronoms: '',
        from: '',
        feat: '',
        classeJoue: [{ niveau: '', classe: '', spec: '' }],
        traitChar: [{ trait: '' }],
        hair: '',
        eyes: '',
        height: '',
        abt: 'fact <b>•</b> fact',
        quote: '',
        mental: '',
        tw: '',
        famille: '',
        goal: '',
        chrono: [{ chroDate: '', chroInf: '' }],
        pseudo: '',
        irlAbout: '',
        image_head: '',
        avatar: '',
        image_mid: '',
        image_bot: '',
      },
      race,
      classes,
      requiredRule: [v => !!v || 'Ce champ est requis'],
      classeLimit: 6,
      traitLimit: 7,
      chronoLimit: 20,
      displayCode: false,
      generatedCode: ''
    };
  },
  computed: {
        totalNiveau() {
      return this.character.classeJoue.reduce((sum, classe) => {
        return sum + (parseInt(classe.niveau) || 0);
      }, 0);
    },
    cssVariables() {
      return {
        '--fiche-imghead': `url(${this.character.image_head})`,
        '--fiche-ava': `url(${this.character.avatar})`,
        '--fiche-img': `url(${this.character.image_mid})`,
        '--fiche-player': `url(${this.character.image_bot})`,
        '--groupe': this.character.couleurMain,
        '--groupe2': this.character.couleurSub,
      };
    }
  },
  mounted() {
    this.loadCharacterInfo();
  },
  watch: {
    'character.race'(newVal) {
      this.limiteCategory(newVal);
    }
  },
  
  methods: {
    limiteCategory(newVal) {
        if (newVal.length > 2) {
          this.character.race = newVal.slice(0, 2);
        }
    },
    getFormattedRace() {
        if (this.character && this.character.race) {
          if (this.character.race.length === 2) {
            return `hybride ${this.character.race[0]} ${this.character.race[1]}`;
          } else {
            return this.character.race.join(', ');
          }
        }
        return '';
      },
      watch: {
    'character.race': function(newVal) {
      if (newVal === 'damné') {
        this.character.classeJoue.forEach(classeCL => {
          classeCL.classe = 'damné';
        });
      }
    }
  }
    descriptionNewLineToBR: description => typeof description === 'string' ? description.replace(/\n/g, '<br>') : '',
    descriptionBRToNewLine: description => typeof description === 'string' ? description.replace(/<br\s*\/?>/gi, '\n') : '',
    validateForm() {
      if (this.$refs.form.validate()) {
        this.generateCode();
      }
    },
    loadCharacterInfo() { 
      const characterInfo = sessionStorage.getItem('characterInfo');
      if(characterInfo) { 
        const data = JSON.parse(characterInfo);
        this.character = {
          ...this.character,
          ...data.character,
          traitChar: data.character.traitChar.map(trait => ({
            ...trait,
          })),
          chrono: data.character.chrono.map(item => ({
            ...item,
          })),
          classeJoue: data.character.classeJoue.map(classe => ({
            ...classe,
          })),
        };
      }
  } ,
    generateCode() {
      var htmlToClean = document.getElementById('rendu').innerHTML;
      this.cleanGeneratedCode(htmlToClean);
      this.displayCode = true;
    },
    cleanGeneratedCode(htmlToClean) {
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlToClean;
      this.generatedCode = tempDiv.innerHTML;
    },
    hideDisplay() {
      this.displayCode = false;
    },
    setPlayStyle(style) {
      this.character.playStyle = style;
    },
    addclass() {
      this.character.classeJoue.push({ niveau: '', classe: '', spec: '' });
    },
    removeclass() {
      if (this.character.classeJoue.length > 1) {
        this.character.classeJoue.pop();
      }
    },
    addtrait() {
      this.character.traitChar.push({ trait: '' });
    },
    removetrait() {
      if (this.character.traitChar.length > 1) {
        this.character.traitChar.pop();
      }
    },
    addchrono() {
      this.character.chrono.push({ chroDate: '', chroInf: '' });
    },
    removechrono() {
      if (this.character.chrono.length > 1) {
        this.character.chrono.pop();
      }
    }
  }
}).use(vuetify).mount('#app');
