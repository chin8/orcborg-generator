// This file contains functions for managing the user interface of the orc generator.

export function renderOrc(orc) {
    const orcDisplay = document.getElementById('orc-display');
    orcDisplay.innerHTML = `
        <h2>${orc.name}</h2>
        <p>Clan: ${orc.clan}</p>
        <p>Background: ${orc.background}</p>
        <p>Traits: ${orc.traits.join(', ')}</p>
        <p>Weapon: ${orc.weapon}</p>
    `;
}

export function setupEventListeners() {
    const generateButton = document.getElementById('generate-button');
    generateButton.addEventListener('click', () => {
        // Logic to generate an orc and render it
    });
}