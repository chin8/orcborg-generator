# Orc Generator

Benvenuto nel progetto Orc Generator! Questo strumento ti permette di generare orchi unici combinando vari elementi come nomi, tratti, armi, clan e background. È progettato per essere utilizzato su desktop e dispositivi mobili, con un'interfaccia completamente localizzata in italiano.

## Caratteristiche

- Generazione casuale di orchi con nomi, tratti, armi, clan e background.
- Interfaccia utente intuitiva e responsiva.
- Completamente localizzato in italiano.

## Struttura del Progetto

Il progetto è organizzato come segue:

```
orc-generator
├── src
│   ├── index.html          # Documento HTML principale
│   ├── styles              # Cartella per i fogli di stile
│   │   └── main.css        # Stili principali per l'applicazione
│   ├── scripts             # Cartella per gli script JavaScript
│   │   ├── main.js         # Inizializzazione dell'applicazione
│   │   ├── generator.js    # Logica di generazione degli orchi
│   │   └── ui.js           # Gestione dell'interfaccia utente
│   ├── data                # Cartella per i dati
│   │   ├── names.json      # Nomi degli orchi
│   │   ├── traits.json     # Tratti degli orchi
│   │   ├── weapons.json    # Armi degli orchi
│   │   ├── clans.json      # Clan degli orchi
│   │   └── backgrounds.json # Background degli orchi
│   └── locales             # Cartella per le traduzioni
│       └── it.json        # Traduzioni in italiano
├── package.json            # Configurazione npm
└── README.md               # Documentazione del progetto
```

## Come Eseguire il Progetto

1. Clona il repository:
   ```
   git clone <URL del repository>
   ```
2. Naviga nella cartella del progetto:
   ```
   cd orc-generator
   ```
3. Installa le dipendenze:
   ```
   npm install
   ```
4. Apri il file `src/index.html` nel tuo browser per utilizzare l'Orc Generator.

## Contribuire

Se desideri contribuire al progetto, sentiti libero di aprire una pull request o segnalare problemi.

## Licenza

Questo progetto è sotto licenza MIT. Vedi il file LICENSE per ulteriori dettagli.