class JSLib_FileReader {
    constructor (file) {
        var reader = function (method) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.onload = function (event) {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader[method](file);
            });
        }
        this.text = function () {
            return reader('readAsText');
        };
        this.dataURL = function () {
            return reader('readAsDataURL');
        };
        this.arrayBuffer = function () {
            return reader('readAsArrayBuffer');
        };
        this.binaryString = function () {
            return reader('readAsBinaryString');
        };
        this.json = function () {
            return reader('readAsText').then(function (string) {
                return JSON.parse(string);
            });
        };
        this.base64 = function () {
            return reader('readAsDataURL').then(function (string) {
                return string.slice(string.indexOf(',') + 1);
            });
        };
    }
}
