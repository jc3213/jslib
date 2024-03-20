class PromiseFileReader {
    reader (file, method) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result);
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
        return this.reader(file, 'readAsText').then((string) => JSON.parse(string));
    }
    base64 (file) {
        return this.reader(file, 'readAsDataURL').then((string) => string.slice(string.indexOf(',') + 1));
    }
}
