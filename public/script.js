'use strict';


/***********************************     APP CODE      ***********************************/

$(window).on('load',function() {
    $("#colbut").on('click',function(){
        $("#rectangular").css("background-color", $('#colorValue').val());
        $('#colorValue').focus();
    });
    $('#colorValue').on('keypress',function(e){
        if (e.keyCode==13) {$("#colbut").click();} //if you press enter
    });            
});

let subscribeButtonTimesClicked = 0;
$("#subscribeButton").on('click',function(){
    window.PWA.subscribeToPush();
    subscribeButtonTimesClicked++;
    if (subscribeButtonTimesClicked==3) {
    this.textContent = "force send!";
    } else if (subscribeButtonTimesClicked==4) {
        // creates a (new) database entry with the same push subscription content! 
        window.storePushSubscription();
        console.log("subscription sent again");
        $(this).hide();
    }
});