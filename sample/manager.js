var jsMenu = new JSUI_Menu();
var jsTable = new JSUI_Table(['测试标题', 'Test Title', 'テストタイトル']);
var jsNotify = new JSUI_Notify();

jsNotify.cssText = '.jsui_manager {border: 1px solid #000; width: 500px; margin: 0px auto;}\
.jsui_manager > * {width: 100%; resize: none;}\
.jsui_table {height: 400px; border: none;}\
.jsui_menu_item, .jsui_cell_btn {background-color: #23ade5; color: #fff; line-height: 24px;}';

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

var manager = document.createElement('div');
manager.className = 'jsui_manager';
manager.append(menu, entry /*, jsTable.table*/);

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