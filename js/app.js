function alert(text, title, icon){
    console.log("bruh")

    console.log(text, title, icon)

    $( '.alert-title' ).html(title)
    $( '.alert-text' ).html(text)
    $( '.alert-icon' ).addClass( 'icon_' + icon )
    $( ".overlay-box" ).css("display", "flex").hide().fadeIn();
    
}
$( '.overlay-box' ).click(function(){
    $( this ).fadeOut()
})


