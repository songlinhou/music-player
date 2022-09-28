function getSongItemHTML(idx, name, artist, image){
    let html = `<div class="song-item" style="margin-bottom: 12px;">
    <div class="row">
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
                    <div data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-top:12px; margin-right:12px;">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    <ul class="dropdown-menu" tabindex="-1">
                        <li><a class="dropdown-item" href="#">Copy YouTube Link</a></li>
                        <li><a class="dropdown-item" href="#">Copy Player Link</a></li>
                        <li><a class="dropdown-item" href="#">Download</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Delete</a></li>
                      </ul>
                </div>
        </div>
        
    </div>


</div>`;
    return html;
}