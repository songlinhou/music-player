const settingItemList = [
    {
        'id': 'music-in-cloud-btn',
        'title': 'Music in Cloud',
        'desc': 'Manage songs in the cloud',
        'icon': 'fa-cloud'
    },
    {
        'id': 'history-btn',
        'title': 'History',
        'desc': 'Find songs you played before',
        'icon': 'fa-clock-rotate-left'
    },
    {
        'id': 'shared-with-me-btn',
        'title': 'Shared with me',
        'desc': 'Songs shared by others',
        'icon': 'fa-share-from-square'
    },
    {
        'id': 'timer-btn',
        'title': 'Timer',
        'desc': 'Control how you play songs',
        'icon': 'fa-clock'
    },
    {
        'id': 'statistics-btn',
        'title': 'Statistics',
        'desc': 'Discovery your interests',
        'icon': 'fa-signal'
    },
    {
        'id': 'feedback-btn',
        'title': 'Feedback and suggestion',
        'desc': 'We love to hear from you',
        'icon': 'fa-comment'
    },
];

function generateSettingItems(){
    let html = "";
    settingItemList.forEach(item=>{
        let itemHtml = getSettingItemHTML(item['id'], item['title'], item['desc'], item['icon']);
        html += itemHtml;
    });
    $("#user-center-list").html(html);
}