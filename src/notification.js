function showDebug(msg){
    $('.alert').html(msg);
    $('.alert').removeClass("d-none");
    $('.alert').fadeIn();
    $('.alert').off("click");
    $('.alert').on("click", ()=>{
        $('.alert').fadeOut();
    });
}