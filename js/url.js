class URLComponents {
    get (url) {
        var regexp = /^([^\/]+)\/+(?:([^:]+):([^@]+)@)?(([^\/@:]+):?([^\/]+)?)(\/.*)$/;
        var result = url.match(regexp);
        var [uri, protocol, username = '', password = '', host, hostname, port = '', pathname] = result;
        var origin = protocol + '//' + host;
        return {protocol, pathname, host, origin, username, password, hostname, port};
    }
    set (components) {
        var {protocol, pathname, host, origin, username, password, hostname, port} = components;
        if (!protocol || !host && !hostname) {
            throw new Error('Invalid URL components!');
        }
        var url = protocol.replace(':', '') + '://';
        if (username && password) {
            url += username + ':' + password + '@';
        }
        url += host ? host : port ? hostname + port : hostname;
        url += '/' + pathname.replace('/', '');
        return url;
    }
}
