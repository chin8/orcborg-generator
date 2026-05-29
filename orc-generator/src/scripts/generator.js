class OrcGenerator {
    constructor(names, traits, weapons, clans, backgrounds) {
        this.names = names;
        this.traits = traits;
        this.weapons = weapons;
        this.clans = clans;
        this.backgrounds = backgrounds;
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    generateOrc() {
        const name = this.getRandomElement(this.names);
        const trait = this.getRandomElement(this.traits);
        const weapon = this.getRandomElement(this.weapons);
        const clan = this.getRandomElement(this.clans);
        const background = this.getRandomElement(this.backgrounds);

        return {
            name: name,
            trait: trait,
            weapon: weapon,
            clan: clan,
            background: background
        };
    }
}

export default OrcGenerator;