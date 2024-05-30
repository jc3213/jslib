class MatchPattern {
    constructor (args) {
        this.rule = Array.isArray(args) ? args : [];
        this.cache = {};
        this.make();
    }
    add (rule) {
        if (this.cache[rule]) { return; }
        this.cache[rule] = true;
        this.rule.push(rule);
        this.make();
    }
    remove (rule) {
        if (!this.cache[rule]) { return; }
        this.rule.splice(this.rule.indexOf(rule), 1);
        this.cache[rule] = false;
        this.make();
    }
    make () {
        this.regexp = this.rule.length === 0 ? /!/ : new RegExp('^(' + this.rule.join('|').replace(/\./g, '\\.').replace(/\\?\.?\*\\?\.?/g, '.*') + ')$');
        this.result = {};
    }
    match (url) {
        let host = new URL(url).hostname;
        if (host in this.result) { return this.result[host]; }
        return this.result[host] = this.regexp.test(host);
    }
}
