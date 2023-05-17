var jsUI = new JSUI();
var filereader = new PromiseFileReader();
var url_components = new URLComponents();
var url_result = document.querySelector('#urlcomponents > .result');
var url_template = document.querySelector('.template > div');

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

document.querySelector('#filereader').addEventListener('change', async function (event) {
    var file = event.target.files[0];
    var text = await filereader.text(file);
    document.querySelector('#reader').value = text;
})

document.querySelector('#submit').addEventListener('click', function (event) {
    var url = document.querySelector('#url').value;
    url_result.innerHTML = '';
    url_components.get(url).then(getURLComponnents).catch(errorURLFormat);
});

function getURLComponnents(components) {
    Object.entries(components).forEach(function (entry) {
        var [key, value] = entry;
        var list = url_template.cloneNode(true);
        var label = list.querySelector('label');
        var input = list.querySelector('input');
        input.id = key;
        label.innerText = key.charAt(0).toUpperCase() + key.slice(1);
        input.value = value;
        url_result.appendChild(list);
    });
}

function errorURLFormat(error) {
    var warn = jsUI.new().text(error.message);
    url_result.append(warn);
}

var menu = jsUI.menu();
menu.add('按钮1').attr({id: 'btn1', title: '中文'}).onclick(clickBtnA);
menu.add('button2').attr({id: 'btn2', title: 'English'}).onclick(clickBtnB);
menu.add('ボタン3').attr({id: 'btn3', title: '日本語'}).onclick(clickBtnC);

function clickBtnA(event) {
    jsUI.notification('按钮1', 3000);
    entry.value = '按钮1';
}

function clickBtnB(event) {
    jsUI.notification('Button2', 3000);
    entry.value = 'Button2';
}

function clickBtnC(event) {
    jsUI.notification('ボタン3', 3000).onclick(event => alert('ボタン3を押しました！'));
    entry.value = 'ボタン3';
}

var entry = jsUI.new('textarea');
entry.rows = '6';

var dropzone = document.querySelector('#dropzone');

var manager = jsUI.new().class('jsui-manager');
manager.append(menu, entry);

document.body.appendChild(manager);

jsUI.dragndrop(entry, [dropzone, manager]);
dropzone.addEventListener('drop', event => {
    entry.value = 'Drag\'n\'Drop Complete\n已成功完成拖拽\nドラッグアンドドロップ成功';
});
manager.addEventListener('drop', function (event) {
    menu.after(entry);
    entry.value = 'Restored Position\n回到原来的位置\n元の位置に戻りました';
});

var table = jsUI.table(['测试标题', 'Test Title', 'テストタイトル']);
manager.append(table);

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
