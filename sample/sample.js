var jsUI = new JSUI();
var filereader = new PromiseFileReader();
var url_components = new URLComponents();
var url_result = document.querySelector('#urlcomponents > .result');
var url_template = document.querySelector('.template > div');

var js_overlay = jsUI.new().class('jsui-notify-overlay');
document.body.append(js_overlay);
function notification(message) {
    var {clientWidth} = document.documentElement;
    var popup = jsUI.new().class('jsui-notify-popup').text(message).onclick(event => popup.remove());
    js_overlay.append(popup);
    popup.css('left', (clientWidth - popup.offsetWidth) / 2 + 'px');
    return popup;
}

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

var menu = jsUI.new().class('jsui-basic-menu');
var chi = jsUI.new().class('jsui-menu-item').text('按钮1').attr({id: 'btn1', title: '中文'}).onclick(clickBtnA);
var eng = jsUI.new().class('jsui-menu-item').text('button2').attr({id: 'btn2', title: 'English'}).onclick(clickBtnB);
var jpn = jsUI.new().class('jsui-menu-item').text('ボタン3').attr({id: 'btn3', title: '日本語'}).onclick(clickBtnC);
menu.append(chi, eng, jpn);

function clickBtnA(event) {
    notification('按钮1').delay(3000).then(popup => popup.remove());
    entry.value = '按钮1';
}

function clickBtnB(event) {
    notification('Button2').delay(3000).then(popup => popup.remove());
    entry.value = 'Button2';
}

function clickBtnC(event) {
    notification('ボタン3').onclick(event => alert('ボタン3を押しました！')).delay(3000).then(popup => popup.remove());
    entry.value = 'ボタン3';
}

var entry = document.createElement('textarea');
entry.rows = '6';

var dropzone = document.querySelector('#dropzone');

var manager = document.createElement('div');
manager.className = 'jsui-manager';
manager.append(menu, entry);
document.body.appendChild(manager);

/** unfixed
jsUI.dragndrop(entry, [dropzone, manager]);
dropzone.addEventListener('drop', event => {
    entry.value = 'Drag\'n\'Drop Complete\n已成功完成拖拽\nドラッグアンドドロップ成功';
});
manager.addEventListener('drop', function (event) {
    menu.after(entry);
    entry.value = 'Restored Position\n回到原来的位置\n元の位置に戻りました';
});
**/

var table = jsUI.new().class('jsui-table').html('<div class="jsui-table-title"><div>测试标题</div><div>Test Title</div><div>テストタイトル</div></div>');
manager.append(table);

var colA = jsUI.new().class('jsui-table-column');
var caa = jsUI.new().text('中文1').class('jsui-menu-cell').onclick(clickTabCelA);
var cab = jsUI.new().text('English1');
var cac = jsUI.new().text('日本語1');
colA.append(caa, cab, cac);

var colB = jsUI.new().class('jsui-table-column');
var cba = jsUI.new().text('中文2');
var cbb = jsUI.new().text('English2');
var cbc = jsUI.new().text('日本語2');
var cbd = jsUI.new().text('Español2');
colB.append(cba, cbb, cbc, cbd);

table.append(colA, colB);

function clickTabCelA(event) {
    notification('测试1\nTest 1\nテスト1');
    entry.value = '测试1\nTest 1\nテスト1';
}
