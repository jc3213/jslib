var jsMenu = new FlexMenu();
var jsTable = new FlexTable(['测试标题', 'Test Title', 'テストタイトル']);
var jsNotify = new Notify();
var filereader = new PromiseFileReader();

var css = document.createElement('style');
css.innerText = `body {margin: auto; width: 600px;}
#dropzone {min-height: 100px; margin: 10px auto; border: 1px outset #000;}
textarea {width: 100%; resize: none;}
.jsui-manager {border: 1px solid #000;}
.jsui-table {height: 400px; border: none;}
.jsui-menu-item, .jsui-click-cell {background-color: #23ade5; color: #fff; line-height: 24px;}`;
document.head.appendChild(css)

document.querySelector('#filereader').addEventListener('change', async function (event) {
    filereader.file = event.target.files[0];
    var {test_en, test_ch, test_ja} = await filereader.json();
    entry.value = test_en + '\r\n' + test_ch + '\r\n' + test_ja;
    event.target.value = '';
})

var dropzone = document.querySelector('#dropzone');

var menu = jsMenu.menu([
    {label: '按钮1', onclick: clickBtnA},
    {label: 'button2', onclick: clickBtnB},
    {label: 'ボタン3', onclick: clickBtnC}
], false)

function clickBtnA(event) {
    jsNotify.popup({message: '按钮1', timeout: 3000});
    entry.value = '按钮1';
}

function clickBtnB(event) {
    jsNotify.popup({message: 'Button2'});
    entry.value = 'Button2';
}

function clickBtnC(event) {
    jsNotify.popup({message: 'ボタン3', onclick: function() {
        alert('ボタン3');
    }});
    entry.value = 'ボタン3';
}

var entry = document.createElement('textarea');
entry.rows = '6';
var dragdrop = new DragDrop(entry, dropzone);
dragdrop.ondragend = function (event) {
    entry.value = 'Drag\'n\'Drop Complete\n拖拽成功\nドラッグドロップ成功'
}

var manager = document.createElement('div');
manager.className = 'jsui-manager';
manager.append(menu, entry /*, jsTable.table*/);
dragdrop.dropover = manager;
manager.addEventListener('drop', function (event) {
    menu.after(entry);
});

jsTable.parentNode = manager;

document.body.appendChild(manager);

jsTable.add([
    {label: '中文1', onclick: clickTabCelA},
    'English1',
    '日本語1'
]);
jsTable.add(['中文2', 'English2', '日本語2', 'Español2']);

function clickTabCelA(event) {
    jsNotify.popup({message:'测试1\nTest 1\nテスト1'});
    entry.value = '测试1\nTest 1\nテスト1';
}
