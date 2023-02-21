var stats = document.querySelector('#stats');
var activeStat = document.querySelector('#active.stats');
var waitingStat = document.querySelector('#waiting.stats');
var stoppedStat = document.querySelector('#stopped.stats');
var downloadStat = document.querySelector('#download.stats');
var uploadStat = document.querySelector('#upload.stats');
var queue = document.querySelector('#queue');
var activeQueue = queue.querySelector('.active');
var waitingQueue = queue.querySelector('.waiting');
var pausedQueue = queue.querySelector('.paused');
var completeQueue = queue.querySelector('.complete');
var removedQueue = queue.querySelector('.removed');
var errorQueue = queue.querySelector('.error');
var sessionLET = document.querySelector('.template > .session');
var fileLET = document.querySelector('.template > .file');
var uriLET = document.querySelector('.template > .uri');
var activeId;

document.querySelectorAll('#stats > button').forEach((tab, index) => {
    var style = tab.id.slice(0, tab.id.length === 10 ? 3 : 4);
    tab.addEventListener('click', event => {
        stats.className = queue.className = stats.className !== style ? style : '';
    });
});

document.querySelector('#download_btn').addEventListener('click', async event => {
    var entry = prompt('Download Url');
    try {
        var json = JSON.parse(entry);
        if (!Array.isArray(json)) {
            json = [json];
        }
        json.forEach(({url, options}) => {
            aria2RPC.call('aria2.addUri', [[url], options]);
        });
    }
    catch(error) {
        var urls = entry.match(/(https?:\/\/|ftp:\/\/|magnet:\?)[^\s;\|]+/g);
        var options = { 'user-agent': navigator.userAgent };
        if (urls) {
            urls.forEach(url => {
                aria2RPC.call('aria2.addUri', [[url], options]);
            });
        }
    }
});

document.querySelector('#purge_btn').addEventListener('click', async event => {
    await aria2RPC.call('aria2.purgeDownloadResult');
    completeQueue.innerHTML = removedQueue.innerHTML = errorQueue.innerHTML = '';
    stoppedStat.innerText = '0';
    if (stoppedTask.includes(activeId)) {
        activeId = null;
    }
});

document.querySelector('#options_btn').addEventListener('click', event => {
    localStorage.jsonrpc = jsonrpc = prompt('JSON-RPC URI', jsonrpc) ?? jsonrpc;
    localStorage.secret = secret = prompt('Secret Token', secret) ?? secret;
    localStorage.refresh = refresh = prompt('Refresh Interval', refresh) ?? refresh;
    location.reload();
});

var {
    jsonrpc = 'http://localhost:6800/jsonrpc',
    secret = '',
    refresh = 5000
} = localStorage;
aria2StartUp();

function aria2StartUp() {
    activeTask = [];
    waitingTask = [];
    stoppedTask = [];
    aria2RPC = new Aria2(jsonrpc, secret);
    aria2RPC.batch([
        {method: 'aria2.getGlobalStat'},
        {method: 'aria2.tellActive'},
        {method: 'aria2.tellWaiting', params: [0, 999]},
        {method: 'aria2.tellStopped', params: [0, 999]}
    ]).then(result => {
        var [{downloadSpeed, uploadSpeed}, active, waiting, stopped] = result;
        [...active, ...waiting, ...stopped].forEach(printSession);
        downloadStat.innerText = getFileSize(downloadSpeed);
        uploadStat.innerText = getFileSize(uploadSpeed);
        aria2Client();
    }).catch(error => {
        activeStat.innertext = waitingStat.innerText = stoppedStat.innerText = downloadStat.innerText = uploadStat.innerText = '0';
        activeQueue.innerHTML = waitingQueue.innerHTML = completeQueue.innerHTML = error.message;
        pausedQueue.innerHTML = removedQueue.innerHTML = errorQueue.innerHTML = '';
    });
}

function aria2Client() {
    aria2Alive = setInterval(updateManager, refresh);
    aria2Socket = new WebSocket(jsonrpc.replace('http', 'ws'));
    aria2Socket.onmessage = async event => {
        var {method, params: [{gid}]} = JSON.parse(event.data);
        if (method !== 'aria2.onBtDownloadComplete') {
            addSession(gid);
            if (method === 'aria2.onDownloadStart' && waitingTask.includes(gid)) {
                removeSession('waiting', gid);
            }
            else if (method !== 'aria2.onDownloadStart' && activeTask.includes(gid)) {
                removeSession('active', gid);
            }
        }
    };
}

async function updateManager() {
    var download = 0;
    var upload = 0;
    var active = await aria2RPC.call('aria2.tellActive');
    active.forEach(result => {
        printSession(result);
        download += result.downloadSpeed | 0;
        upload += result.uploadSpeed | 0;
    });
    downloadStat.innerText = getFileSize(download);
    uploadStat.innerText = getFileSize(upload);
}

function updateSession(task, status) {
    if (status === 'active') {
        var type = 'active';
    }
    else if ('waiting,paused'.includes(status)) {
        type = 'waiting';
    }
    else {
        type = 'stopped';
    }
    self[status + 'Queue'].appendChild(task);
    return type;
}

async function addSession(gid) {
    var result = await aria2RPC.call('aria2.tellStatus', [gid]);
    var task = printSession(result);
    var {status} = result;
    var type = task.type = updateSession(task, status);
    if (self[type + 'Task'].indexOf(gid) === -1) {
        self[type + 'Stat'].innerText ++;
        self[type + 'Task'].push(gid);
    }
}

function removeSession(type, gid, task) {
    self[type + 'Stat'].innerText --;
    self[type + 'Task'].splice(self[type + 'Task'].indexOf(gid), 1);
    if (task) {
        task.remove();
    }
    if (activeId === gid) {
        activeId = null;
    }
}

function printSession({gid, status, files, bittorrent, completedLength, totalLength, downloadSpeed, uploadSpeed, connections, numSeeders}) {
    var task = document.getElementById(gid) ?? parseSession(gid, status, bittorrent);
    task.querySelector('#name').innerText = getDownloadName(bittorrent, files);
    task.querySelector('#local').innerText = getFileSize(completedLength);
    task.querySelector('#remote').innerText = getFileSize(totalLength);
    var time = (totalLength - completedLength) / downloadSpeed;
    var days = time / 86400 | 0;
    var hours = time / 3600 - days * 24 | 0;
    var minutes = time / 60 - days * 1440 - hours * 60 | 0;
    var seconds = time - days * 86400 - hours * 3600 - minutes * 60 | 0;
    task.querySelector('#day').innerText = days > 0 ? days : '';
    task.querySelector('#hour').innerText = hours > 0 ? hours : '';
    task.querySelector('#minute').innerText = minutes > 0 ? minutes : '';
    task.querySelector('#second').innerText = seconds > 0 ? seconds : '';
    task.querySelector('#connect').innerText = bittorrent ? numSeeders + ' (' + connections + ')' : connections;
    task.querySelector('#download').innerText = getFileSize(downloadSpeed);
    task.querySelector('#upload').innerText = getFileSize(uploadSpeed);
    var ratio = (completedLength / totalLength * 10000 | 0) / 100;
    task.querySelector('#ratio').innerText = ratio;
    task.querySelector('#ratio').style.width = ratio + '%';
    if (activeId === gid && status === 'active') {
        printTaskFiles(task, files);
    }
    return task;
}

function parseSession(gid, status, bittorrent) {
    var task = sessionLET.cloneNode(true);
    task.id = gid;
    if (bittorrent) {
        task.classList.add('p2p');
    }
    else {
        task.classList.add('http');
    }
    task.querySelector('#remove_btn').addEventListener('click', async event => {
        var status = task.parentNode.className;
        if ('active,waiting,paused'.includes(status)) {
            await aria2RPC.call('aria2.forceRemove', [gid]);
            if (status !== 'active') {
                removeSession('waiting', gid, task);
            }
        }
        else {
            await aria2RPC.call('aria2.removeDownloadResult', [gid]);
            removeSession('stopped', gid, task);
        }
    });
    task.querySelector('#invest_btn').addEventListener('click', async event => {
        if (activeId === gid) {
            activeId = closeTaskDetail();
        }
        else {
            if (activeId) {
                closeTaskDetail();
            }
            var [files, options] = await getTaskDetail(gid);
            task.querySelectorAll('[name]').printOptions(options);
            printTaskFiles(task, files);
            task.classList.add('extra');
            activeId = gid;
        }
    });
    task.querySelector('#retry_btn').addEventListener('click', async event => {
        var [files, options] = await getTaskDetail(gid);
        var {uris, path} = files[0];
        var url = [...new Set(uris.map(({uri}) => uri))];
        if (path) {
            var li = path.lastIndexOf('/');
            options['dir'] = path.slice(0, li);
            options['out'] = path.slice(li + 1);
        }
        var [id] = await aria2RPC.batch([
            {method: 'aria2.addUri', params: [url, options]},
            {method: 'aria2.removeDownloadResult', params: [gid]}
        ]);
        addSession(id);
        removeSession('stopped', gid, task);
    });
    task.querySelector('#meter').addEventListener('click', async event => {
        var status = task.parentNode.className;
        if ('active,waiting'.includes(status)) {
            await aria2RPC.call('aria2.forcePause', [gid]);
        }
        else if (status === 'paused') {
            await aria2RPC.call('aria2.unpause', [gid]);
        }
    });
    task.querySelector('#options').addEventListener('change', event => {
        var {name, value} = event.target;
        aria2RPC.call('aria2.changeOption', [gid, {[name]: value}]);
    });
    task.querySelector('#save_btn').addEventListener('click', async event => {
        var files = [];
        task.querySelectorAll('#files #index').forEach(index => {
            if (index.className === 'active') {
                files.push(index.innerText);
            }
        });
        await aria2RPC.call('aria2.changeOption', [gid, {'select-file': files.join()}]);
        event.target.style.display = 'none';
    });
    task.querySelector('#append_btn').addEventListener('click', async event => {
        var uri = event.target.previousElementSibling;
        await aria2RPC.call('aria2.changeUri', [gid, 1, [], [uri.value]]);
        uri.value = '';
    });
    var type = task.type = updateSession(task, status);
    self[type + 'Stat'].innerText ++;
    self[type + 'Task'].push(gid);
    return task;
}

function getTaskDetail(gid) {
    return aria2RPC.batch([
        {method: 'aria2.getFiles', params: [gid]},
        {method: 'aria2.getOption', params: [gid]}
    ]);
}

function closeTaskDetail() {
    var task = document.getElementById(activeId);
    task.classList.remove('extra');
    task.querySelector('#files').innerHTML = task.querySelector('#uris').innerHTML = '';
    task.querySelector('#save_btn').style.display = 'none';
}

function printFileCell(task, list, {index, path, length, selected, uris}) {
    var column = fileLET.cloneNode(true);
    var tile = column.querySelector('#index');
    tile.innerText = index;
    tile.className = selected === 'true' ? 'checked' : 'suspend';
    column.querySelector('#name').innerText = path.slice(path.lastIndexOf('/') + 1);
    column.querySelector('#name').title = path;
    column.querySelector('#size').innerText = getFileSize(length);
    if (uris.length === 0) {
        tile.addEventListener('click', event => {
            if (task.type !== 'stopped') {
                tile.className = tile.className === 'checked' ? 'suspend' : 'checked';
                task.querySelector('#save_btn').style.display = 'block';
            }
        });
    }
    else {
        printTaskUris(task, uris);
    }
    list.appendChild(column);
    return column;
}

function printTaskFiles(task, files) {
    var fileList = task.querySelector('#files');
    var columns = fileList.childNodes;
    files.forEach((file, index) => {
        var column = columns[index] ?? printFileCell(task, fileList, file);
        var {length, completedLength} = file;
        column.querySelector('#ratio').innerText = (completedLength / length * 10000 | 0) / 100;
    });
}

function printUriCell(list, uri) {
    var column = uriLET.cloneNode(true);
    column.addEventListener('click', event => {
        if (event.ctrlKey) {
            aria2RPC.call('aria2.changeUri', [activeId, 1, [uri], []]);
        }
        else {
           navigator.clipboard.writeText(uri);
        }
    });
    list.appendChild(column);
    return column;
}

function printTaskUris(task, uris) {
    var uriList = task.querySelector('#uris');
    var columns = uriList.childNodes;
    var used;
    var wait;
    var idx = -1;
    uris.forEach(({uri, status}) => {
        var column = columns[idx] ?? printUriCell(uriList, uri);
        var link = column.querySelector('#uri');
        var {innerText} = link;
        if (innerText !== uri) {
            link.innerText = link.title = uri;
            used = column.querySelector('#used');
            wait = column.querySelector('#wait');
            idx ++;
        }
        if (status === 'used') {
            used.innerText ++;
        }
        else {
            wait.innerText ++;
        }
    });
    columns.forEach((column, index) => {
        if (index > idx) {
            column.remove();
        }
    });
}

function getFileSize(bytes) {
    if (isNaN(bytes)) {
        return '?? ';
    }
    else if (bytes < 1024) {
        return bytes;
    }
    else if (bytes < 1048576) {
        return (bytes / 10.24 | 0) / 100 + 'K';
    }
    else if (bytes < 1073741824) {
        return (bytes / 10485.76 | 0) / 100 + 'M';
    }
    else if (bytes < 1099511627776) {
        return (bytes / 10737418.24 | 0) / 100 + 'G';
    }
    else {
        return (bytes / 10995116277.76 | 0) / 100 + 'T';
    }
}
