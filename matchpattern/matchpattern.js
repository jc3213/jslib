class MatchPattern {
    constructor (hosts) {
        hosts?.forEach((host) => this.caches[host] = this.add(host));
    }
    add (host) {
        if (this.caches[host] !== undefined) {
            return this.caches[host];
        }
        let result;
        let [tld, sld, sbd, ...useless] = host.split('.').reverse();
        if (sld === undefined) {
            result = host;
        }
        else if (sld in this.tlds) {
            result = '*.' + sbd + '.' + sld + '.' + tld;
        }
        else {
            result = '*.' + sld + '.' + tld;
        }
        this.caches[host] = result;
        this.hosts.push(host);
        this.matchpatterns.push(result);
        this.make();
        return result;
    }
    remove (host) {
        if (this.caches[host] === undefined) {
            return;
        }
        const index = this.hosts.indexOf(host);
        this.hosts.splice(index, 1);
        this.matchpatterns.splice(index, 1);
        delete this.caches[host];
        this.make();
    }
    make () {
        this.regexp = this.matchpatterns.length === 0 ? /!/ : new RegExp('^(' + this.matchpatterns.join('|').replace(/\./g, '\\.').replace(/\\?\.?\*\\?\.?/g, '.*') + ')$');
    }
    match (host) {
        return this.regexp.test(host);
    }
    hosts = [];
    caches = {};
    matchpatterns = [];
    tlds = {
        'aero': true,
        'app': true,
        'arpa': true,
        'asia': true,
        'biz': true,
        'cat': true,
        'co': true,
        'com': true,
        'coop': true,
        'dev': true,
        'edu': true,
        'eu': true,
        'gov': true,
        'info': true,
        'int': true,
        'io': true,
        'jobs': true,
        'ltd': true,
        'ltda': true,
        'mil': true,
        'mobi': true,
        'museum': true,
        'name': true,
        'ne': true,
        'net': true,
        'org': true,
        'post': true,
        'pro': true,
        'si': true,
        'tel': true,
        'test': true,
        'travel': true,
        'web': true,
        'xxx': true,
        'xyz': true
    };
}
