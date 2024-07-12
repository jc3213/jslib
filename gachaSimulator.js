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
        this.result = [];
        this.count = { r: 0, sr: 0, ssr: 0, up: 0 };
        this.bingo = { r: [], sr: [], ssr: [], up: [] };
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
        this.count[type] ++;
        this.bingo[type].push(this.total);
        this.result.push(card);
    }
    roll (number) {
        let times = number | 0;
        if (times < 1) { times = 1; }
        for (let i = 0; i < times; i ++) {
            if (this.total === this.threshold) { break; }
            this.total ++;
            let random = Math.random();
            if (random < this.rarity.up) {
                this.count.up ++;
                this.bingo.up.push(this.total);
                this.result.push('pickup');
                console.log('Got pickup card, roll counts ' + this.total);
            } else if (random < this.rarity.ssr) {
                this.card('ssr');
            } else if (random < this.rarity.sr) {
                this.card('sr');
            } else {
                this.card('r');
            }
            if (this.total === this.threshold) {
                console.log('Gacha threshold at ' + this.threshold + ' rolls;\nGot ' + this.count.up + ' pickup cards at "' + this.bingo.up.join(', ') + '";\nGot ' + this.count.r + ' R cards, ' + this.count.sr + ' SR cards, ' + this.count.ssr + ' SSR cards;');
            }
        }
    }
}
