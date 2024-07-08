class Gacha {
    constructor(posibility, threshold) {
        this.posibility = posibility;
        this.threshold = threshold;
        this.count = 0;
        this.pickup = [];
    }
    roll (number) {
        let time = number | 0;
        if (time < 1) { time = 1; }
        for (let i = 0; i < time; i ++) {
            this.count ++;
            if (Math.random() < this.posibility) {
                this.pickup.push(this.count);
                console.log('Gacha! at ' + this.count);
            }
            else if (this.count === this.threshold) {
                this.count = 0;
                this.pickup = [];
                console.log('Pickup! at ' + this.threshold);
                break;
            }
        }
    }
}
