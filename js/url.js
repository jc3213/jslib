class URLComponents {
    get (url) {
        var protocolIndex = url.indexOf('://');
        if (protocolIndex === -1) {
            throw new Error('Invalid URL format!');
        }
        var protocol = url.slice(0, protocolIndex);
        var result = url.slice(protocolIndex + 3);
        var hostIndex = result.indexOf('/');
        var pathname = result.slice(hostIndex);
        var temp = result.slice(0, hostIndex);
        var userIndex = temp.indexOf('@');
        if (userIndex === -1) {
            var host = temp;
            var username = '';
            var password = '';
        }
        else {
            var user = temp.slice(0, userIndex);
            var passIndex = user.indexOf(':');
            host = temp.slice(userIndex + 1);
            username = user.slice(0, passIndex);
            password = user.slice(passIndex + 1);
        }
        var origin = protocol + '://' + host;
        var portIndex = host.lastIndexOf(':');
        if (portIndex === -1) {
            var hostname = host;
            var port = '';
        }
        else if (host[0] === '[') {
            if (host[portIndex - 1] === ']') {
                var hostname = host.slice(0, portIndex);
                var port = host.slice(portIndex + 1);
            }
            else {
                var hostname = host;
                var port = '';
            }
        }
        else {
            var hostname = host.slice(0, portIndex);
            var port = host.slice(portIndex + 1);
        }
        return {protocol, pathname, host, origin, username, password, hostname, port};
    }
    set (components) {
        var {protocol, pathname, host, origin, username, password, hostname, port} = components;
        if (!host && !hostname) {
            throw new Error('Invalid URL components!');
        }
        var url = protocol + '://';
        if (username && password) {
            url += username + ':' + password + '@';
        }
        if (host) {
            url += host;
        }
        else if (hostname) {
            url += hostname;
            if (port) {
                url += ':' + port;
            }
        }
        if (!pathname) {
            url += '/';
        }
        else {
            url += pathname;
        }
        return url;
    }
}
