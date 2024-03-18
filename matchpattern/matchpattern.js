class MatchPattern {
    constructor (hosts) {
        hosts?.forEach((host) => this.add(host));
    }
    add (host) {
        const result = this.make(host);
        this.hosts.push(host);
        this.matchpatterns.push(result);
        this.generator();
        return result;
    }
    remove (host) {
        const index = this.hosts.indexOf(host);
        if (index === -1) {
            return;
        }
        this.hosts.splice(index, 1);
        this.matchpatterns.splice(index, 1);
        this.generator();
    }
    make (host) {
        if (this.caches[host]) {
            return this.caches[host];
        }
        if (/((25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])\.){3}25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9]/.test(host)) {
            return this.ipv4(host);
        }
        let result;
        let [tld, sld, sub, ...useless] = host.split('.').reverse();
        if (sld === undefined) {
            result = hostname;
        }
        else if (sld in this.tlds) {
            result = '*.' + sub + '.' + sld + '.' + tld;
        }
        else {
            result = '*.' + sld + '.' + tld;
        }
        this.caches[host] = result;
        return result;
    }
    ipv4 (ipv4) {
        let [network, host, ...useless] = ipv4.split('.');
        let result = network + '.' + host + '.*';
        this.caches[host] = result;
        return result;
    }
    generator () {
        if (this.matchpatterns.length === 0) {
            this.regexp = /!/;
        }
        else {
            const patterns = [...new Set(this.matchpatterns)];
            this.regexp = new RegExp('^(' + patterns.join('|').replace(/\./g, '\\.').replace(/\\?\.?\*\\?\.?/g, '.*') + ')$');
        }
    }
    match (host) {
        return this.regexp.test(host);
    }
    caches = {};
    hosts = [];
    matchpatterns = [];
    regexp = /!/;
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
