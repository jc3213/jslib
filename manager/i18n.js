var languages = {
    en: {
        extension_manager: 'Task Manager - Download with Aria2',
        common_default: 'Default',
        common_disabled: 'Disabled',
        time_day: 'd',
        time_hour: 'h',
        time_minute: 'm',
        time_second: 's',
        popup_newdld: 'New DL',
        popup_queue: 'Task Queue',
        popup_purge: 'Purge',
        popup_options: 'Options',
        popup_active: 'Downloading',
        popup_waiting: 'Wait in Queue',
        popup_paused: 'Download Paused',
        popup_complete: 'Completed',
        popup_removed: 'Download Stopped',
        popup_error: 'Error Occured',
        popup_active_queue: 'Active',
        popup_waiting_queue: 'Waiting',
        popup_stopped_queue: 'Stopped',
        popup_download_speed: 'DL Speed',
        popup_upload_speed: 'UL Speed',
        task_submit: 'Submit',
        task_referer: 'Referer',
        task_batch: 'Download Urls',
        task_base64: 'Upload',
        task_download: 'Max Download Speed',
        task_upload: 'Max Upload Speed',
        task_proxy: 'Proxy Server',
        task_save: 'Save',
        task_files: 'Download Files',
        task_urls: 'Download Urls',
        aria2_adv_dir: 'Download Folder',
        aria2_http_split: 'Download Sections',
        aria2_http_size: 'Section Size',
        aria2_max_connection: 'Max Connections per Server',
        aria2_bt_ratio: 'Seeding Ratio',
        aria2_bt_seed: 'Seeding Time',
        aria2_bt_remove: 'Remove Unselected Files',
        aria2_true: 'True',
        aria2_false: 'False',
        option_jsonrpc_uri: 'JSON-RPC Address',
        option_jsonrpc_token: 'JSON-RPC Token',
        option_manager_interval: 'Refresh Interval',
        option_proxy_server: 'Proxy Server'
    },
    zh: {
        extension_manager: '任务管理器 - 通过 Aria2 下载',
        common_default: '默认',
        common_disabled: '禁用',
        time_day: '日',
        time_hour: '时',
        time_minute: '分',
        time_second: '秒',
        popup_newdld: '新下载',
        popup_queue: '任务队列',
        popup_purge: '清理',
        popup_options: '选项',
        popup_active: '正在下载',
        popup_waiting: '等待队列',
        popup_paused: '下载暂停',
        popup_complete: '已经完成',
        popup_removed: '下载停止',
        popup_error: '发生错误',
        popup_active_queue: '活跃',
        popup_waiting_queue: '等待',
        popup_stopped_queue: '停止',
        popup_download_speed: '下载速度',
        popup_upload_speed: '上传速度',
        task_submit: '确认',
        task_referer: '引用页',
        task_batch: '下载链接',
        task_base64: '上传',
        task_download: '最大下载速度',
        task_upload: '最大上传速度',        
        task_proxy: '代理服务器',
        task_save: '保存',
        task_files: '下载文件',
        task_urls: '下载链接',
        aria2_adv_dir: '下载文件夹',
        aria2_http_split: '多线程',
        aria2_http_size: '线程容量',
        aria2_max_connection: '每服务器最大连接数',
        aria2_bt_ratio: '分享率',
        aria2_bt_seed: '分享时间',
        aria2_bt_remove: '删除未选定文件',
        aria2_true: '是',
        aria2_false: '否',
        option_jsonrpc_uri: 'JSON-RPC 地址',
        option_jsonrpc_token: 'JSON-RPC 密钥',
        option_manager_interval: '更新间隔',
        option_proxy_server: '代理服务器'
    }
};
var browser_lang = navigator.language.slice(0, 2);
var i18n = languages[browser_lang] ?? languages.en;

document.querySelectorAll('[i18n]').forEach(item => {
    item.innerText = i18n[item.innerText];
});

document.querySelectorAll('[title]').forEach(item => {
    item.title = i18n[item.title];
});

var css = document.createElement('style');
css.innerText = `:root {
    --queue: "${i18n.popup_queue}";
    --active: "${i18n.popup_active_queue}";
    --waiting: "${i18n.popup_waiting_queue}";
    --stopped: "${i18n.popup_stopped_queue}";
    --download: "${i18n.popup_download_speed}";
    --upload: "${i18n.popup_upload_speed}";
    --day: "${i18n.time_day}";
    --hour: "${i18n.time_hour}";
    --minute: "${i18n.time_minute}";
    --second: "${i18n.time_second}";
}`;
document.head.append(css);
