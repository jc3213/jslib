var usedLang = {
    'en': {
        'extension_manager': 'Task Manager - Download with Aria2',
        'common_default': 'Default',
        'popup_active': 'Active',
        'popup_waiting': 'Waiting',
        'popup_stopped': 'Stopped',
        'popup_create': 'New Download',
        'popup_purge': 'Purge',
        'popup_options': 'Options',
        'popup_download': 'Download Speed',
        'popup_upload': 'Upload Speed',
        'aria2_proxy': 'Proxy Server',
        'aria2_http_split': 'Download Sections',
        'aria2_http_size': 'Section Size',
        'aria2_bt_ratio': 'Seeding Ratio',
        'aria2_bt_seed': 'Seeding Time',
        'aria2_bt_remove': 'Remove Unselected Files',
        'aria2_files': 'Download Files',
        'aria2_uris': 'Download Uris',
        'aria2_true': 'True',
        'aria2_false': 'False',
        'time_day': 'd',
        'time_hour': 'h',
        'time_minute': 'm',
        'time_second': 's',
        'task_save': 'Save',
    },
    'zh': {
        'extension_manager': '任务管理器 - 通过 Aria2 下载',
        'common_default': '默认',
        'popup_active': '下载中',
        'popup_waiting': '等待中',
        'popup_stopped': '已停止',
        'popup_create': '新下载',
        'popup_purge': '清理',
        'popup_options': '选项',
        'popup_download': '下载速度',
        'popup_upload': '上传速度',
        'aria2_proxy': '代理服务器',
        'aria2_http_split': '多线程',
        'aria2_http_size': '线程容量',
        'aria2_bt_ratio': '分享率',
        'aria2_bt_seed': '分享时间',
        'aria2_bt_remove': '删除未选定文件',
        'aria2_files': '下载文件',
        'aria2_uris': '下载链接',
        'aria2_true': '是',
        'aria2_false': '否',
        'time_day': '日',
        'time_hour': '时',
        'time_minute': '分',
        'time_second': '秒',
        'task_save': '保存',
    }
};
var userLang = navigator.language.slice(0, 2);
var i18n = usedLang[userLang] ?? usedLang.en;

document.querySelectorAll('[i18n]').forEach(item => {
    item.innerText = i18n[item.innerText];
});

document.querySelectorAll('[title]').forEach(item => {
    item.title = i18n[item.title];
});
