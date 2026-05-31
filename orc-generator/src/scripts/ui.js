export function renderOrc(orc) {
    const orcDetails = document.getElementById('orc-details');
    
    // Costruiamo le stringhe per i dettagli (gestendo i formati degli oggetti)
    const traitText = orc.trait.trait ? `${orc.trait.trait} - ${orc.trait.description}` : orc.trait;
    // const weaponText = orc.weapon.name ? `${orc.weapon.name} (${orc.weapon.damage})` : orc.weapon;
    
    // Usa le nuove proprietà origine e aspetto
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
        
        <div class="vitals-box">
            <div class="vital">
                <h3>P. FERITA</h3>
                <p>${orc.hp}</p>
            </div>
            <div class="vital">
                <h3>MIRACOLI</h3>
                <p>${orc.miracoli}</p>
            </div>
            <div class="vital">
                <h3>PUNTI TEK</h3>
                <p>${orc.tek}</p>
            </div>
        </div>

        <div class="stats-box">
            <div><strong>FOR:</strong> ${formatMod(orc.mods.forza)}</div>
            <div><strong>AGI:</strong> ${formatMod(orc.mods.agilita)}</div>
            <div><strong>PRE:</strong> ${formatMod(orc.mods.presenza)}</div>
            <div><strong>COS:</strong> ${formatMod(orc.mods.costituzione)}</div>
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
            <h3 style="color: var(--hot-pink);">ROBA (INVENTARIO)</h3>
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
    generateButton.addEventListener('click', () => {
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
}