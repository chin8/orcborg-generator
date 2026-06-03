export function renderOrc(orc) {
    const orcDetails = document.getElementById('orc-details');
    
     const traitText = orc.trait.trait ? `${orc.trait.trait} - ${orc.trait.description}` : orc.trait;
    
    const origineText = orc.origine;
    const aspettoText = orc.aspetto ? orc.aspetto.join(' e ') : '';

    // Funzione helper per stampare i modificatori formattati
    const formatMod = (mod) => mod > 0 ? `+${mod}` : `${mod}`;
    const inventarioList = orc.inventario.map(item => `<li>${item}</li>`).join('');

    // Prepara la sezione poteri
    let poteriHTML = '';
    if (orc.haPoteri) {
        const poteriList = orc.listaPoteri.map(p => `<li>${p}</li>`).join('');
        const cdClass = orc.isOrcborg ? "10" : "12";
        poteriHTML = `
        <div class="poteri-box">
            <h3>POTERI (CD${cdClass} PRE)</h3>
            <p><strong>Usi Giornalieri:</strong> ${orc.usiPoteri}</p>
            <ul>
                ${poteriList}
            </ul>
            <p style="font-size: 0.8em; margin-top: 10px;">*Se fallisci l'uso: D2 danni e niente poteri per 1 ora.</p>
        </div>`;
    }

    const weaponText = typeof orc.weapon === "string" ? orc.weapon : `${orc.weapon.name} (${orc.weapon.damage})`;
    const classTitle = orc.isOrcborg ? 'ORCBORG' : 'ORCO';

    orcDetails.innerHTML = `
        <div style="text-align:center; margin-bottom: 10px;">
            <span class="class-badge">${classTitle}</span>
        </div>
        <h2 class="orc-name" style="text-align: center; border-bottom: none; font-size: 2.5rem;">${orc.name || 'Senza Nome'}</h2>
        <p style="text-align: center; color: var(--border-metal); margin-top: -15px;">Devoto di <strong>${orc.dio}</strong></p>
        
        <!-- PRIMA LE STATISTICHE (Grandi, box rosa) -->
        <div class="vitals-box">
            <div class="vital">
                <h3>FOR</h3>
                <p>${formatMod(orc.mods.forza)}</p>
            </div>
            <div class="vital">
                <h3>AGI</h3>
                <p>${formatMod(orc.mods.agilita)}</p>
            </div>
            <div class="vital">
                <h3>PRE</h3>
                <p>${formatMod(orc.mods.presenza)}</p>
            </div>
            <div class="vital">
                <h3>COS</h3>
                <p>${formatMod(orc.mods.costituzione)}</p>
            </div>
        </div>

        <!-- DOPO I VITALS (Piccoli e in linea) -->
        <div class="stats-box">
            <div><strong>P. FERITA:</strong> ${orc.hp}</div>
            <div><strong>MIRACOLI:</strong> ${orc.miracoli}</div>
            <div><strong>TEK:</strong> ${orc.tek}</div>
        </div>

        <div class="details">
            <p><strong>Origini:</strong> ${origineText}</p>
            <p><strong>Aspetto:</strong> ${aspettoText}</p>
            <p><strong>Tratto:</strong> ${traitText}</p>
            <p><strong>Arma d'Attacco:</strong> ${weaponText}</p>
            <p><strong>Armatura:</strong> ${orc.armatura}</p>
        </div>
        
        ${poteriHTML}
        
        <div class="poteri-box" style="border-color: var(--hot-pink);">
            <h3 ">ROBA (INVENTARIO)</h3>
            <ul>
                ${inventarioList}
            </ul>
        </div>
        
        <div class="footer-note">
            <em>*Usare un Miracolo: Doppi danni, ritira dadi, dimezza danni subiti o CD-4. Ripristina D2 con riposo lungo.</em>
        </div>
    `;
}

export function setupEventListeners(generator) {
    const generateButton = document.getElementById('generate-button');
    const soundFiles = [
        'sounds/roar1.wav',
        'sounds/roar2.wav',
        'sounds/roar3.wav',
        'sounds/roar4.wav'
    ];

    const orcSound = new Audio();
    orcSound.volume = 0.7;


    generateButton.addEventListener('click', () => {
        // Scegli un suono a caso dalla lista
        const randomSound = soundFiles[Math.floor(Math.random() * soundFiles.length)];
        
        //  Carica il file scelto e suona
        orcSound.src = randomSound;
        orcSound.currentTime = 0;
        orcSound.play().catch(e => console.log("Errore audio:", e));

        // Controlla quale classe è selezionata
        const classRadio = document.querySelector('input[name="classe-orco"]:checked');
        const isOrcborg = classRadio && classRadio.value === 'orcborg';
        
        const newOrc = generator.generateOrc(isOrcborg);
        renderOrc(newOrc);
    });

    // Logica per aumentare e diminuire la grandezza del font
    let currentFontSize = 16;
    const bodyStyle = document.body.style;

    document.getElementById('font-increase').addEventListener('click', () => {
        if (currentFontSize < 32) { // Limita l'ingrandimento massimo
            currentFontSize += 2;
            bodyStyle.fontSize = `${currentFontSize}px`;
        }
    });

    document.getElementById('font-decrease').addEventListener('click', () => {
        if (currentFontSize > 12) { // Limita il rimpicciolimento minimo
            currentFontSize -= 2;
            bodyStyle.fontSize = `${currentFontSize}px`;
        }
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    // Stampa PDF
    document.getElementById('print-button').addEventListener('click', () => {
        window.print();
    });
}