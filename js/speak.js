var pop_items = [];
var data_icon = 0;

addPopItem("Hello", "How are you doing?")

$( '#create-pop-up' ).on('click', function(){
   createPopUp()
})

$( '#add-pop-item' ).on('click', function(){
    var title = $( '#pop-title' ).val();
    var text = $( '#pop-text' ).val();
    
    if(text){
        if(title){
            addPopItem(title, text)
        }
        else{
            addPopItem("Message", text)
        }
    }
    else{
        alert("Please provide a message to create the speaking file!", "Message", 48)
    }
})

function preview(){
    var msg = new SpeechSynthesisUtterance();
    msg.text = $( '#pop-text' ).val();
    window.speechSynthesis.speak(msg);
}

function addPopItem(title, text){

    var obj = {
        text:text,
    }

    pop_items.push(obj);
    initList();

}

function initList(){
    const list =Object.values(pop_items).map(post => `
        

    <div class="pop-message-item">


    <div class="icon-item-wrap">
        <div class="icon-item" style="background-image: url(assets/icons/parrot.png);"></div>
    </div>
        <div class="item-content">
            <h2 class="message-item-title">Speak</h2>
            <h5 class="message-item-text">${post.text}</h2>
        </div>

        <div class="pop-item" data-index="<index-space>">
            <h6 class="move-up">Move up</h6>
            <h6 class="move-down">Move down</h6>
            <h6 class="delete-item">Delete</h6>
        </div>

    </div>

    `);

    var pushList = [];
    list.map((myArr, index) => {

        pushList.push(myArr.replaceAll('<index-space>', index))

    })

    pushList = Object.values(pushList).map( post => `${post}`)
    $( "#root-pop-list" ).html(pushList.join(''))
}

function createPopUp(){


    const code = Object.values(pop_items).map(post => `   
        objVoice.Speak "${post.text}"
    `)

    download('lol.vbs',"Set objVoice = CreateObject(\"SAPI.SpVoice\")" + code.join(''))

}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

$("#root-pop-list").on("click", ".pop-message-item", function(){
    $(this).find( '.pop-item' ).fadeIn();
});

function arraymove(arr, fromIndex, toIndex) {

    if(pop_items.length > 1){
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        initList();
    }
    else{
        alert('You must atleast have one item to move the message up or down', "Message", 48)
    }

}

$(document).mouseup(function (e) {
    var div = $(".pop-item");
    if (!div.is(e.target) && div.has(e.target).length === 0) 
    {
       div.fadeOut();
    }
});

function deleteMsg(ind){
    //var ind = $(this).attr('data-index');
    pop_items.splice(ind, 1);
    initList();
    console.log(pop_items)
}

$("#root-pop-list").on("click", ".delete-item", function(){ 
    
    if(pop_items.length > 1){
        var itemIndex = $(this).parent().attr('data-index');
        deleteMsg(itemIndex)
    }
    else{
        alert('You must atleast have one item to delete the message',"Message", 48)
    }

});

$("#root-pop-list").on("click", ".move-up", function(){   
    var itemIndex = $(this).parent().attr('data-index');
    arraymove(pop_items, itemIndex, itemIndex - 1)
    console.log(pop_items)
});

$("#root-pop-list").on("click", ".move-down", function(){   
    var itemIndex = $(this).parent().attr('data-index');
    arraymove(pop_items, itemIndex, itemIndex + 1)
    console.log(pop_items)
});

$( ".icon-sel" ).on("click", function(){
    $( ".icon-sel" ).removeClass( 'ic-active' );
    $( this ).addClass( 'ic-active' );
    data_icon =  $(this).attr('data-icon');
});