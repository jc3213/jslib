class PromiseFileReader {
    reader (file, method) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (event) {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader[method](file);
        });
    }
    text (file) {
        return this.reader(file, 'readAsText');
    }
    dataURL (file) {
        return this.reader(file, 'readAsDataURL');
    }
    arrayBuffer (file) {
        return this.reader(file, 'readAsArrayBuffer');
    }
    binaryString (file) {
        return this.reader(file, 'readAsBinaryString');
    }
    json (file) {
        return this.reader(file, 'readAsText').then(function (string) {
            return JSON.parse(string);
        });
    }
    base64 (file) {
        return this.reader(file, 'readAsDataURL').then(function (string) {
            return string.slice(string.indexOf(',') + 1);
        });
    }
}
