class Gacha {
    constructor() {
        this.rarity = { sr: 0.3, ssr: 0.05 };
        this.pools = { r: this.pool('r', 80), sr: this.pool('sr', 30), ssr: this.pool('ssr', 10) };
        this.threshold = 200;
        this.pickup(0.007);
        this.reset();
    }
    reset () {
        this.total = 0;
        this.result = { r: 0, sr: 0, ssr: 0, up: 0, bingo: [], logs: [] };
    }
    pickup (min) {
        this.rarity.up = this.rarity.ssr / this.pools.ssr.length;
        if (this.rarity.up < min) { this.rarity.up = min; }
    }
    pool (type, length) {
        return Array.from({ length }, (_, i) => type + (i + 1));
    }
    card (type) {
        let pool = this.pools[type];
        let card = pool[Math.floor(Math.random() * pool.length)];
        console.log('Got ' + type.toUpperCase() + ' card: ' + card);
        this.result[type] ++;
        this.result.logs.push(card);
    }
    roll (number) {
        let times = number | 0;
        if (times < 1) { times = 1; }
        for (let i = 0; i < times; i ++) {
            if (this.total === this.threshold) { break; }
            this.total ++;
            let random = Math.random();
            if (random < this.rarity.up) {
                this.result.up ++;
                this.result.logs.push('pickup');
                this.result.bingo.push(this.total);
                console.log('Got pickup card, roll counts ' + this.total);
            } else if (random < this.rarity.ssr) {
                this.card('ssr');
            } else if (random < this.rarity.sr) {
                this.card('sr');
            } else {
                this.card('r');
            }
            if (this.total === this.threshold) {
                console.log('Gacha threshold at ' + this.threshold + ' rolls;\nGot ' + this.result.up + ' pickup cards at "' + this.result.bingo.join(', ') + '";\nGot ' + this.result.r + ' R cards, ' + this.result.sr + ' SR cards, ' + this.result.ssr + ' SSR cards;');
            }
        }
    }
}