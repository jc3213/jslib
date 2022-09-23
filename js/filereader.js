class PromiseFileReader {
    constructor (file) {
        this.file = file;
    }
    reader (method) {
        var {file} = this;
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (event) {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader[method](file);
        });
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
        return this.reader('readAsText').then(function (string) {
            return JSON.parse(string);
        });
    }
    base64 () {
        return this.reader('readAsDataURL').then(function (string) {
            return string.slice(string.indexOf(',') + 1);
        });
    }
}
