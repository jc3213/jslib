var jsMenu = new JSUI_Menu();
var jsTable = new JSUI_Table(['测试标题', 'Test Title', 'テストタイトル']);
var jsNotify = new JSUI_Notify();
var filereader = new PromiseFileReader();

jsNotify.cssText = `body {margin: auto; width: 600px;}
#dropzone {min-height: 100px; margin: 10px auto; border: 1px outset #000;}
textarea {width: 100%; resize: none;}
.jsui_manager {border: 1px solid #000;}
.jsui_table {height: 400px; border: none;}
.jsui_menu_item, .jsui_cell_btn {background-color: #23ade5; color: #fff; line-height: 24px;}`;

document.querySelector('#filereader').addEventListener('change', async function (event) {
    filereader.files = event.target.files;
    [{test_en, test_ch, test_ja}] = await filereader.json();
    entry.innerText = test_en + '\r\n' + test_ch + '\r\n' + test_ja;
    event.target.value = '';
})

var dropzone = document.querySelector('#dropzone');
dropzone.addEventListener('dragover', function (event) {
    event.preventDefault();
});
dropzone.addEventListener('drop', function (event) {
    dropzone.appendChild(entry);
});

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
var draggable = new DraggableElement(entry);
draggable.ondragdrop = function (event) {
    entry.value = 'Drag\'n\'Drop Complete\n拖拽成功\nドラッグドロップ成功'
}

var manager = document.createElement('div');
manager.className = 'jsui_manager';
manager.append(menu, entry /*, jsTable.table*/);
manager.addEventListener('dragover', function (event) {
    event.preventDefault();
});
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
jsTable.add(['中文2', 'English2', '日本語2']);

function clickTabCelA(event) {
    jsNotify.popup({message:'测试1\nTest 1\nテスト1'});
    entry.value = '测试1\nTest 1\nテスト1';
}