class OrcGenerator {
    constructor(names = [], traits = [], weapons = [],  origini = [], aspetto = []) {
        this.names = names;
        this.traits = traits;
        this.weapons = weapons;
        this.origini = origini;
        this.aspetto = aspetto;    
    }

    getRandomElement(array) {
        if (!array || array.length === 0) return "Sconosciuto";
        return array[Math.floor(Math.random() * array.length)];
    }

     // Lancia un dado con 'sides' facce
     rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    // Tira 4d6 (o 3d6 se Orcborg) e somma
    rollStat(isOrcborg = false) {
        if (isOrcborg) {
            return this.rollDice(6) + this.rollDice(6) + this.rollDice(6);
        }
        let rolls = [this.rollDice(6), this.rollDice(6), this.rollDice(6), this.rollDice(6)];
        rolls.sort((a, b) => a - b); // Ordina dal più piccolo al più grande
        rolls.shift(); // Rimuove il risultato più basso
        return rolls.reduce((sum, val) => sum + val, 0); // Somma i restanti
    }

    // Calcola il modificatore in base al risultato
    getModifier(score) {
        if (score >= 17) return 3;
        if (score >= 15) return 2;
        if (score >= 13) return 1;
        if (score >= 9) return 0;
        if (score >= 7) return -1;
        if (score >= 5) return -2;
        return -3;
    }

    // Formatta il modificatore con il segno + per i positivi
    formatModifier(mod) {
        return mod > 0 ? `+${mod}` : `${mod}`;
    }

    generateOrc(isOrcborg = false) {
        const name = this.getRandomElement(this.names);
        const trait = this.getRandomElement(this.traits);
        
        let origine = "";
        if (isOrcborg) {
            const orcborgOrigini = [
                "UN SACCO DI TELECAMERE. Inizi sempre prima dei nemici; se hai successo in una prova di INIZIATIVA, fai un'azione addizionale.",
                "RUOTE. Hai delle ruote al posto delle gambe. Veloce nei tratti piatti, fai schifo sulle scale.",
                "TECNOMASTERIZZATORE. Copi ogni Tecnomanzia di cui vedi l'attivazione fino alla prossima dormita.",
                "MANI ELETTRICHE. Mani contano come arma D4. CD12 Forza ad afferrare per far cadere oggetti e dare spasmi.",
                "TUTTO IN OVERCLOCK. Subisci D3 danni, scegli una statistica e ottieni +2 alle prove per un'ora. Terribile epistassi.",
                "TOSTAPANE. Testa a tostapane, +1 prove Presenza perché sei figo. Sforna toast."
            ];
            origine = this.getRandomElement(orcborgOrigini);
        } else {
            origine = this.getRandomElement(this.origini);
        }

        const dei = [
            "GULGACK, Il Padre Sfregiato, lo Sputa-Zanne",
            "EKKO, L'Ulula Stelle, le Grandi Fauci",
            "LUGOL, che tutto vede, che tutto sà e che tutto sente",
            "JEKT, Portatore della FINE",
            "[STRIDIO DI METALLO SU METALLO] che ha inventato il combattimento",
            "SNIV, patrono furtivo dei goblin"
        ];
        const dio = this.getRandomElement(dei);

        // STATISTICHE BASE & MODIFICATORI
        const stats = {
            presenza: this.rollStat(isOrcborg),
            agilita: this.rollStat(isOrcborg),
            costituzione: this.rollStat(isOrcborg),
            forza: this.rollStat(isOrcborg)
        };

        const mods = {
            presenza: this.getModifier(stats.presenza),
            agilita: this.getModifier(stats.agilita),
            costituzione: this.getModifier(stats.costituzione),
            forza: this.getModifier(stats.forza)
        };

        // Calcola Punti Ferita (1d8 + Modificatore Costituzione, minimo 1)
        const hpRaw = this.rollDice(8) + mods.costituzione;
        const hp = Math.max(1, hpRaw);

        // Tira Aspetto, Punti TEK e Miracoli
        let aspetto1Index = this.rollDice(12) - 1;
        let aspetto2Index = this.rollDice(12) - 1;
        let trattiAspetto = [this.aspetto[aspetto1Index], this.aspetto[aspetto2Index]].map(tratto => {
            if (tratto === "Protesi Bionica") {
                const subRoll = this.rollDice(6);
                if (subRoll <= 3) return "Protesi Bionica (Braccio)";
                if (subRoll <= 5) return "Protesi Bionica (Gamba)";
                return "Protesi Bionica (Mascella)";
            }
            if (tratto === "Arma Innestata") {
                return `Arma Innestata (rimpiazza una mano)`;
            }
            return tratto;
        });

        const tek = this.rollDice(6) + this.rollDice(6) + this.rollDice(6);
        const miracoli = this.rollDice(2);

        // INVENTARIO E POTERI
        const generiMusicali = ["Drum Bastard", "Thrash Yell", "Orcish Hymnal", "Pianohammer", "Industrial Noise", "Apocalypse Goth", "Goblin Skiffle", "Trashcannon"];
        const cartucce = ["Asteroid Jam", "Rokk Bastard", "Slugfuckers Inc", "Big Doktor Apokalypse", "Lil Skabba Razz", "Junk juNk JUnk", "Mogs Hulldecker", "Kickdoor One Hundred", "Dog Full-Auto", "[ T R A S H ] Sixty Six Seventy"];
        
        const tecnomanzia = [
            "RITO DELLA CHIAVE BLU: Apre la porta più vicina.",
            "METRONOMICON: Evoca un piccolo vagone vicino a te.",
            "ALOGENESI: Spegni o accendi tutte le luci nell'area.",
            "PROTOCOLLO DISTRUTTIVO: Elettrifica superficie (D4 danni al tocco).",
            "DOWNLOAD CORNUCOPIA: Cibo 3D portato da angelo metallico.",
            "TABLET DIVINATORIO: Rivela stanza adiacente con schermo verde.",
            "MATRICE ICARO: Sospende a gravità zero un bersaglio (10 round).",
            "EGIDA VINCOLATA: -D4 danni subiti per 10 round.",
            "SUBROUTINE DI SUBORDINAZIONE: Addomestica macchina per 10 round.",
            "COMPRESSIONE: Riduci altezza tunnel a 30cm, schiacciando per D4 round."
        ];

        const preghiere = [
            "PROFANARE: -2 CD alla prossima prova del bersaglio.",
            "VOCE DEGLI DEI: La tua voce spacca i timpani per un'ora.",
            "SQUARTA E SQUARCIA: I tuoi attacchi ignorano l'armatura per 10 round.",
            "ENORMITÀ: Raddoppi taglia (+4 mischia/prove, +D6 danni, Difesa CD8).",
            "MASSAGGIO VIGOROSO: Il bersaglio recupera D10 PF.",
            "FINE FINE FINE: D3 pistole fanno D10 danni al prossimo sparo.",
            "MUGGITO DI GUERRA: D3 bersagli ottengono D6 PF temporanei.",
            "SCHIANTO: D6 danni a chiunque a portata di braccio.",
            "PORTATE QUI I VOSTRI CULI: Evoca D4 goblin ipertiroidei.",
            "SCOPPIA TESTE: Un bersaglio visibile subisce D10 danni."
        ];

        let inventario = ["I tuoi vestiti"];
        let haPoteri = isOrcborg; // Orcborg inizia SEMPRE con un potere
        let listaPoteri = [];

        if (isOrcborg) {
            const tecno = tecnomanzia[this.rollDice(10) - 1];
            const partiCorpo = ["Braccio", "Gamba", "Occhio", "Petto", "Budella"];
            inventario.push(`Runa Installata (${this.getRandomElement(partiCorpo)}): ${tecno}`); 
            listaPoteri.push(`Tecnomanzia Iniziale: ${tecno}`);
        }

        for(let i=0; i<3; i++) {
            let roll = this.rollDice(20);
            switch(roll) {
                case 1: inventario.push(`Tirapugni dell'accolito (D3)`); break;
                case 2: inventario.push(`Bomba incendiaria (D6, a espansione)`); break;
                case 3: inventario.push(`Tamburo (D6 arma, Genere: ${this.getRandomElement(generiMusicali)})`); break;
                case 4: inventario.push(`Cassa-botta e ${this.rollDice(3)} cartucce musicali (${this.getRandomElement(cartucce)})`); break;
                case 5: inventario.push(`Console da tecnomante`); break;
                case 6: inventario.push(`Cavo rinforzato da 25 metri`); break;
                case 7: inventario.push(`Grosso rotolo di nastro isolante`); break;
                case 8: inventario.push(`Canide alieno (5 PF, Morale 5, Morso D6, test Presenza per comandi)`); break;
                case 9: inventario.push(`${this.rollDice(10) + this.rollDice(10)} sigari unticci`); break;
                case 10: inventario.push(`Cappello Gigante`); break;
                case 11: inventario.push(`Stivali chiodati`); break;
                case 12: inventario.push(`Sei fiaschette di liquore fungino`); break;
                case 13: inventario.push(`Borsa di funghi "speciali"`); break;
                case 14: inventario.push(`Grossa chiave inglese (D4)`); break;
                case 15: inventario.push(`Bomboletta di vernice spray`); break;
                case 16: inventario.push(`Sparachiodi (D4) e ${this.rollDice(20)} chiodi`); break;
                case 17: inventario.push(`Fiamma ossidrica (D3)`); break;
                case 18: inventario.push(`Elmo urlante`); break;
                case 19: 
                    const preg = preghiere[this.rollDice(10) - 1];
                    inventario.push(`Preghiera (Potere): ${preg}`); 
                    listaPoteri.push(`Preghiera Orchesca: ${preg}`);
                    haPoteri = true; 
                    break;
                case 20: 
                    const tecno = tecnomanzia[this.rollDice(10) - 1];
                    inventario.push(`Runa (Potere): ${tecno}`); 
                    listaPoteri.push(`Tecnomanzia: ${tecno}`);
                    haPoteri = true; 
                    break;
            }
        }

        // Calcolo USI POTERI (Presenza + D4)
        let usiPoterigiorno = 0;
        if (haPoteri) {
            usiPoterigiorno = Math.max(1, mods.presenza + this.rollDice(4));
        }

        // ARMATURA & ARMA (basate su haPoteri)
        let armaturaRoll = haPoteri ? (this.rollDice(2) - 1) : (this.rollDice(4) - 1);
        const armature = [
            "Nessuna (ma +1 al tuo attacco)",
            "Pezzi e Scarti (-D2 danni subiti)",
            "Blindatura (-D4 danni subiti, -1 al tuo attacco)",
            "Potenziata (-D6 danni subiti, spendi 3 TEK per attivarla 1 ora o subisci +4CD a tutte le prove)"
        ];
        let armatura = armature[armaturaRoll];

        // Definizione armi con logica di proiettili dinamica (Presenza)
        const colpiPresenzaPiu6 = Math.max(1, mods.presenza + 6);
        const caricatoriPresenzaPiu3 = Math.max(1, mods.presenza + 3);
        const tabellaArmi = [
            `Artigli (D2 danni)`,
            `Coltello (D4 danni)`,
            `Mazza o Spada (D4 danni)`,
            `Spappolatore (D6 danni)`,
            `Affettatore (D6 danni)`,
            `Pistola (D6 a distanza, a una mano, ${colpiPresenzaPiu6} colpi inclusi)`,
            `Folgoratore (D8 danni)`,
            `Cannone (D8 a distanza, a due mani, ${colpiPresenzaPiu6} colpi inclusi)`,
            `Demolitore (D10 a due mani)`,
            `Crivellatore (Svuota l'intero caricatore, D3 attacchi alla volta. ${caricatoriPresenzaPiu3} caricatori inclusi)`,
            `Chela squarciatrice (D10 a due mani)`,
            `Mutilatore (D12 a due mani)`
        ];

        // Tira l'arma (D12 normale, D6 se ha un potere)
        let armaRoll = haPoteri ? this.rollDice(6) : this.rollDice(12);
        let weapon = tabellaArmi[armaRoll - 1];

        // Modifica l'Arma Innestata (se l'aveva ottenuta in Aspetto)
        trattiAspetto = trattiAspetto.map(tratto => 
            tratto.includes("Arma Innestata") ? `Arma Innestata: ${tabellaArmi[this.rollDice(6)]} (rimpiazza una mano)` : tratto
        );

        // Restituisce il personaggio completato
        return {
            isOrcborg: isOrcborg,
            name: name,
            trait: trait,
            weapon: weapon,
            origine: origine,
            aspetto: trattiAspetto,
            dio: dio,
            mods: mods,
            hp: hp,
            tek: tek,
            miracoli: miracoli,
            armatura: armatura,
            inventario: inventario,
            haPoteri: haPoteri,
            usiPoteri: usiPoterigiorno,
            listaPoteri: listaPoteri
        };
    }
}

export { OrcGenerator };