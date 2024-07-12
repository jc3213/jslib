class Gacha {
    constructor() {
        this.rarity = { sr: 0.3, ssr: 0.05, pickup: 0.0007 };
        this.pools = { r: this.pool(50), sr: this.pool(15), ssr: this.pool(5) };
        this.threshold = 200;
        this.reset();
    }
    reset () {
        this.total = 0;
        this.result = { r: 0, sr: 0, ssr: 0, up: 0, pickup: [], logs: [] };
    }
    pool (length) {
        return Array.from({ length }, (_, i) => 'r' + (i + 1));
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
            if (random < this.rarity.pickup) {
                this.result.up ++;
                this.result.logs.push('pickup');
                this.result.pickup.push(this.total);
                console.log('Got pickup card, roll counts ' + this.total);
            } else if (random < this.rarity.ssr) {
                this.card('ssr');
            } else if (random < this.rarity.sr) {
                this.card('sr');
            } else {
                this.card('r');
            }
            if (this.total === this.threshold) {
                console.log('Gacha threshold at ' + this.threshold + ' rolls;\nGot ' + this.result.up + ' pickup cards at "' + this.result.pickup.join(', ') + '";\nGot ' + this.result.r + ' R cards, ' + this.result.sr + ' SR cards, ' + this.result.ssr + ' SSR cards;');
            }
        }
    }
}
