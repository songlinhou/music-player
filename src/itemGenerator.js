function getSongItemHTML(idx, name, artist, image, code, canDelete=true, subclass='liked-item'){
    let subHTML = "";
    if(canDelete){
        subHTML = `<li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item song-dropdown-btn" action-type="delete" style="color:red">Delete</a></li>`;
    }
    let html = `<div class="song-item ${subclass}" style="margin-bottom: 12px;" code="${code}">
    <div class="row song-item-row" style="padding-top: 6px;padding-bottom: 6px;">
        <div class="col-10">
            <div class="d-flex justify-content-left song-click-area" song-idx="${idx}">
            <img style="border-radius: 12%; height: 45px; width: 45px; object-fit:cover; padding: 0px; margin-left: 12px;" src="${image}">
            <div class="col" style="margin-left: 12px;">
                <h6 style="color: white;margin-bottom: 0px;">${name}</h6>
                <div style="color: #999; font-size: 16px;">${artist}</div>
            </div>
        </div>
        </div>

        <div class="col song-option-area dropdown" song-idx="${idx}">
                <div class="d-flex justify-content-end btn-group dropstart">
                    <div data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-top:12px; margin-right:12px; padding-left: 20px;">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    <ul class="dropdown-menu" tabindex="-1">
                        <li><a class="dropdown-item song-dropdown-btn" action-type="copy-youtube">Copy YouTube Link</a></li>
                        <li><a class="dropdown-item song-dropdown-btn" action-type="copy-player">Copy Player Link</a></li>
                        <li><a class="dropdown-item song-dropdown-btn" action-type="download">Download</a></li>
                        ${subHTML}
                      </ul>
                </div>
        </div>
        
    </div>


</div>`;
    return html;
}

function getSettingItemHTML(id, mainTitle, description, iconClass){
    let html = `
    <div class="row align-items-center setting-item" style="color: white; margin-left: 12px; margin-top: 12px;" id=${id}>
                <div class="col-1">
                    <i class="fa-solid ${iconClass} fa-xl"></i>
                </div>
                <div class="col" style="margin-left: 32px;">
                    <div class="row" style="font-size: 18px;">${mainTitle}</div>
                    <div class="row" style="font-size: 14px; color: gray;">${description}</div>
                </div>
            </div>
    `.trim();
    return html;
}