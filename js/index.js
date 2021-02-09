const urlParams = new URLSearchParams(window.location.search);
const m = urlParams.get('mode');


if(m === 'speak'){
    $( '.sp' ).addClass( 'li-active' )
    $( '.iframe-wrap' ).html('<iframe class="main-frame" src="speak.html" frameborder="0"></iframe>')
}
else{
    $( '.pp' ).addClass( 'li-active' )
    $( '.iframe-wrap' ).html('<iframe class="main-frame" src="pop-up.html" frameborder="0"></iframe>')

}
