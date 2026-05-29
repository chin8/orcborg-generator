// Main JavaScript file for the Orc Generator application
// This file initializes the application, sets up event listeners, and manages the overall flow.

import { OrcGenerator } from './generator.js';
import { setupEventListeners } from './ui.js';

const orcGenerator = new OrcGenerator();

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners(orcGenerator);
});