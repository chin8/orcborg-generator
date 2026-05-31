import { OrcGenerator } from './generator.js';
import { setupEventListeners } from './ui.js';

async function initApp() {
    try {
        // Carica in parallelo tutti i file JSON
        const [namesRes, traitsRes, weaponsRes, originiRes, aspettoRes] = await Promise.all([
            fetch('data/names.json'),
            fetch('data/traits.json'),
            fetch('data/weapons.json'),
            fetch('data/origini.json'),
            fetch('data/aspetto.json')
        ]);

        const names = await namesRes.json();
        const traits = await traitsRes.json();
        const weapons = await weaponsRes.json();
        const origini = await originiRes.json();
        const aspetto = await aspettoRes.json();

        // Inizializza il generatore
        const generator = new OrcGenerator(names, traits, weapons, origini, aspetto);

        // Prepara l'interfaccia utente
        setupEventListeners(generator);

        console.log("Generatore di Orchi pronto all'uso!");

    } catch (error) {
        console.error("Errore durante il caricamento dei dati:", error);
        document.getElementById('orc-details').innerHTML = `<p style="color:red">Errore nel caricamento dei dati JSON. Assicurati che i file esistano in src/data/.</p>`;
    }
}

// Avvia l'app
document.addEventListener('DOMContentLoaded', initApp);