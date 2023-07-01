var jsUI = new JSUI();
var filereader = new PromiseFileReader();
var url_components = new URLComponents();
var url_result = jsUI.get('#urlcomponents > .result');
var url_template = jsUI.get('.template > div');

jsUI.css.add(`body {margin: auto; width: 600px;}
body > div:not(.jsui-notify-overlay) {margin: 10px auto; border: 1px outset #000;}
.template {display: none;}
#urlcomponents {padding: 3px;}
#url {width: calc(100% - 61px); margin-right: 3px;}
.result > * {display: flex; margin-top: 5px;}
.result input {flex: 7;}
.result label {flex: 1;}
textarea {width: 100%; resize: none;}
.jsui-manager {border: 1px solid #000;}
.jsui-table {height: 400px;}
.jsui-menu-item, .jsui-menu-cell {background-color: #23ade5; color: #fff;}`);

jsUI.get('#filereader').onchange(async (event) => {
    var file = event.target.files[0];
    var text = await filereader.text(file);
    jsUI.get('#reader').value = text;
});

jsUI.get('#submit').onclick(function (event) {
    var url = jsUI.get('#url').value;
    url_result.body();
    var result = url_components.get(url);
    getURLComponnents(result);
});

function getURLComponnents(components) {
    Object.keys(components).forEach((key) => {
        var value = components[key];
        var list = url_template.cloneNode(true);
        var label = list.querySelector('label');
        var input = list.querySelector('input');
        input.id = key;
        label.innerText = key.charAt(0).toUpperCase() + key.slice(1);
        input.value = value;
        url_result.appendChild(list);
    });
}

var manager = jsUI.new().class('jsui-manager').parent(document.body);

var menu = jsUI.menu().parent(manager);
menu.add('按钮1').attr({id: 'btn1', title: '中文'}).onclick((event) => {
    jsUI.notification('按钮1', 3000);
    entry.value = '按钮1';
});
menu.add('button2').attr({id: 'btn2', title: 'English'}).onclick((event) => {
    jsUI.notification('Button2', 3000);
    entry.value = 'Button2';
});
menu.add('ボタン3').attr({id: 'btn3', title: '日本語'}).onclick((event) => {
    jsUI.notification('ボタン3', 3000).onclick(event => alert('ボタン3を押しました！'));
    entry.value = 'ボタン3';
});

var entry = jsUI.new('textarea').attr('rows', 6).parent(manager);

var dropzone = jsUI.get('#dropzone');

jsUI.dragndrop(entry, [dropzone, manager]);
dropzone.addEventListener('drop', event => {
    entry.value = 'Drag\'n\'Drop Complete\n已成功完成拖拽\nドラッグアンドドロップ成功';
});
manager.addEventListener('drop', (event) => {
    menu.after(entry);
    entry.value = 'Restored Position\n回到原来的位置\n元の位置に戻りました';
});

var table = jsUI.table(['测试标题', 'Test Title', 'テストタイトル']).parent(manager);

table.add([
    {text: '中文1', onclick: clickTabCelA},
    {text: 'English1'},
    '日本語1'
]);
table.add(['中文2', 'English2', '日本語2', 'Español2']);

function clickTabCelA(event) {
    jsUI.notification('测试1\nTest 1\nテスト1');
    entry.value = '测试1\nTest 1\nテスト1';
}
