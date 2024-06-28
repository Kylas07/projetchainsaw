  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

  const supabaseUrl = 'https://hkwqllhykckbhijbgynr.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhrd3FsbGh5a2NrYmhpamJneW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyNDQ4MTcsImV4cCI6MjAzMjgyMDgxN30.GPnbAN5m3pA7rdyK6zAdptOy-Y4G_qahnj1xxmBrXHw';
  const supabase = createClient(supabaseUrl, supabaseKey);

         let membresData = [];

        async function fetchData() {
            console.log("Fetching data from Supabase...");
            let { data: Membres, error } = await supabase.from('Membres').select('*');

            if (error) {
                console.error('Error fetching data:', error);
                return;
            }

            console.log('Data fetched successfully:', Membres);
            membresData = Membres;

            displayData(membresData);
        }

        function displayData(data) {
            const container = document.querySelector('#member-container');
            container.innerHTML = '';

            data.forEach(item => {
                const membresDiv = document.createElement('div');
                membresDiv.classList.add('member_info');
                membresDiv.style.setProperty('--colorGroupe', `var(--${item.rank})`);
                membresDiv.innerHTML = `
                    <span class="pseudo">${item.nomPrenom}</span>
                    <span class="feat"><rls>${item.featNom}</rls><rls>${item.featIrl}</rls></span>
                    <span class="race">${item.race}</span>
                    <span class="mainClasse">${item.mainClasse} ${item.subClasse ? item.subClasse : ''}</span>
                    <span class="rank">${item.rank}</span>`;
                container.appendChild(membresDiv);
            });

            initIsotope();
        }

        function initIsotope() {
            // Utiliser setTimeout pour s'assurer que Isotope est initialisé après le rendu des éléments
            setTimeout(() => {
                const $grid = $('#member-container').isotope({
                    itemSelector: '.member_info',
                    layoutMode: 'fitRows',
                    getSortData: {
                        nomPrenom: '.pseudo',
                        mainClasse: '.mainClasse',
                        rank: '.rank',
                        featNom: '.feat',
                        race: '.race'
                    }
                });

                document.querySelector('button[for="Alphabetique"]').addEventListener('click', () => {
                    $grid.isotope({ sortBy: 'nomPrenom' });
                });

                document.querySelector('button[for="mainClasse"]').addEventListener('click', () => {
                    $grid.isotope({ sortBy: 'mainClasse' });
                });

                document.querySelector('button[for="groupe"]').addEventListener('click', () => {
                    $grid.isotope({ sortBy: 'rank' });
                });

                document.querySelector('button[for="feat"]').addEventListener('click', () => {
                    $grid.isotope({ sortBy: 'featNom' });
                });

                document.querySelector('button[for="race"]').addEventListener('click', () => {
                    $grid.isotope({ sortBy: 'race' });
                });
            }, 0);
        }
        fetchData();
