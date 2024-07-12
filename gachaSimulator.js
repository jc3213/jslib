class Gacha {
    constructor(pickup, threshold) {
        this.pickup = pickup;
        this.threshold = threshold;
        this.rarity = { sr: 0.3, ssr: 0.05 };
        this.pools = { r: Array.from({ length: 50 }, (_, i) => 'r' + i), sr: Array.from({ length: 15 }, (_, i) => 'sr' + i), ssr: Array.from({ length: 5 }, (_, i) => 'ssr' + i) };
        this.reset();
    }
    reset () {
        this.total = 0;
        this.result = { r: 0, sr: 0, ssr: 0, up: 0, pickup: [], logs: [] };
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
            if (random < this.pickup) {
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
