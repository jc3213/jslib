class PromiseFileReader {
    constructor (files) {
        this.files = files;
    }
    reader (method) {
        var files = [...this.files];
        var promises = files.map(function (file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader[method](file);
            });
        });
        return Promise.all(promises);
    }
    text () {
        return this.reader('readAsText');
    }
    dataURL () {
        return this.reader('readAsDataURL');
    }
    arrayBuffer () {
        return this.reader('readAsArrayBuffer');
    }
    binaryString () {
        return this.reader('readAsBinaryString');
    }
    json () {
        return this.reader('readAsText').then(function (array) {
            return array.map(function (string) {
                return JSON.parse(string);
            });
        });
    }
    base64 () {
        return this.reader('readAsDataURL').then(function (array) {
            return array.map(function (string) {
                return string.slice(string.indexOf(',') + 1);
            });
        });
    }
}
