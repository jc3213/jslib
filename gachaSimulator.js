class Gacha {
    constructor(posibility, threshold) {
        this.posibility = posibility;
        this.threshold = threshold;
        this.reset();
    }
    reset () {
        this.count = 0;
        this.result = { r: 0, sr: 0, ssr: 0, pickup: 0 };
        this.pickup = [];
    }
    roll (number) {
        let time = number | 0;
        if (time < 1) { time = 1; }
        for (let i = 0; i < time; i++) {
            this.count++;
            let result = Math.random();
            if (result < this.posibility) {
                this.result.pickup ++;
                this.pickup.push(this.count);
                console.log('Got pickup card at ' + this.count);
            } else {
                let ssr = 0.05;
                let sr = 0.30;
                if (result > sr) {
                    this.result.r ++;
                    console.log('Got an R card!');
                } else if (result > ssr) {
                    this.result.sr ++;
                    console.log('Got an SR card!');
                } else {
                    this.result.ssr ++;
                    console.log('Got an SSR card!');
                }
            }
            if (this.count === this.threshold) {
                console.log('Gacha threshold at ' + this.threshold + 'rolls;\nGot ' + this.result.pickup + ' pickup cards at "' + this.pickup.join(', ') + '";\nGot ' + this.result.r + ' R cards, ' + this.result.sr + ' SR cards, ' + this.result.ssr + ' SSR cards;');
                this.reset();
                break;
            }
        }
    }
}
