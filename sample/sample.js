var jsUI = new JSUI();
var jsTable = new FlexTable();
var filereader = new PromiseFileReader();

jsUI.css.innerText +=`body {margin: auto; width: 600px;}
#dropzone {min-height: 100px; margin: 10px auto; border: 1px outset #000;}
textarea {width: 100%; resize: none;}
.jsui-manager {border: 1px solid #000;}
.jsui-table {height: 400px; border: none;}
.jsui-click-cell {background-color: #23ade5; color: #fff; line-height: 24px;}`;

document.querySelector('#filereader').addEventListener('change', async function (event) {
    var file = event.target.files[0];
    var {test_en, test_ch, test_ja} = await filereader.json(file);
    entry.value = test_en + '\r\n' + test_ch + '\r\n' + test_ja;
    event.target.value = '';
})

var menu = jsUI.menulist([
    {text: '按钮1', onclick: clickBtnA, attributes: getAttributes('btn1', '中文')},
    {text: 'button2', onclick: clickBtnB, attributes: getAttributes('btn2', 'English')},
    {text: 'ボタン3', onclick: clickBtnC, attributes: getAttributes('btn3', '日本語')}
], false);

function getAttributes(id, title) {
    return [
        {name: 'id', value: id},
        {name: 'title', value: title}
    ];
}

function clickBtnA(event) {
    jsUI.notification({message: '按钮1', timeout: 3000});
    entry.value = '按钮1';
}

function clickBtnB(event) {
    jsUI.notification({message: 'Button2', timeout: 3000});
    entry.value = 'Button2';
}

function clickBtnC(event) {
    jsUI.notification({message: 'ボタン3', onclick: function() {
        alert('ボタン3');
    }, timeout: 3000});
    entry.value = 'ボタン3';
}

var entry = document.createElement('textarea');
entry.rows = '6';

var dropzone = document.querySelector('#dropzone');

var manager = document.createElement('div');
manager.className = 'jsui-manager';
manager.append(menu, entry /*, jsTable.table*/);

jsUI.dragndrop(entry, [dropzone, manager]);
dropzone.addEventListener('drop', event => {
    entry.value = 'Drag\'n\'Drop Complete\n已成功完成拖拽\nドラッグアンドドロップ成功';
});
manager.addEventListener('drop', function (event) {
    menu.after(entry);
    entry.value = 'Restored Position\n回到原来的位置\n元の位置に戻りました'
});

jsTable.parentNode = manager;
//jsTable.head = ['测试标题', 'Test Title', 'テストタイトル'];
jsTable.add(['测试标题', 'Test Title', 'テストタイトル'], [clickTabCelA]);

document.body.appendChild(manager);

jsTable.add(['中文1', 'English1', '日本語1'], [clickTabCelA]);
jsTable.add(['中文2', 'English2', '日本語2', 'Español2']);

function clickTabCelA(event) {
    jsUI.notification({message:'测试1\nTest 1\nテスト1'});
    entry.value = '测试1\nTest 1\nテスト1';
}
