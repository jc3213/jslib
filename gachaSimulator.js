class Gacha {
    constructor(pickup, threshold) {
        this.pickup = pickup;
        this.threshold = threshold;
        this.sr = 0.3;
        this.ssr = 0.05;
        this.reset();
    }
    reset () {
        this.total = 0;
        this.result = { r: 0, sr: 0, ssr: 0, up: 0, pickup: [] };
    }
    roll (number) {
        let times = number | 0;
        if (times < 1) { times = 1; }
        for (let i = 0; i < times; i ++) {
            this.total ++;
            let random = Math.random();
            if (random < this.pickup) {
                this.result.up ++;
                this.result.pickup.push(this.total);
                console.log('Got pickup card at ' + this.total);
            } else {
                if (random > this.sr) {
                    this.result.r ++;
                    console.log('Got an R card!');
                } else if (random > this.ssr) {
                    this.result.sr ++;
                    console.log('Got an SR card!');
                } else {
                    this.result.ssr ++;
                    console.log('Got an SSR card!');
                }
            }
            if (this.total === this.threshold) {
                console.log('Gacha threshold at ' + this.threshold + ' rolls;\nGot ' + this.result.up + ' pickup cards at "' + this.result.pickup.join(', ') + '";\nGot ' + this.result.r + ' R cards, ' + this.result.sr + ' SR cards, ' + this.result.ssr + ' SSR cards;');
                this.reset();
                break;
            }
        }
    }
}
