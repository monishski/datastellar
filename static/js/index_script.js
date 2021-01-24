// -------------------- Modal Logic ----------------------

// Source Code: https://www.w3schools.com/howto/howto_css_modals.asp
// https://stackoverflow.com/questions/42840250/how-can-i-close-a-pop-up-modal-once-button-is-clicked-with-cookies
// https://stackoverflow.com/questions/2304941/what-is-the-non-jquery-equivalent-of-document-ready

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

var modal = document.querySelector(".modal");
var btn = document.querySelector(".modal__btn");

document.addEventListener("DOMContentLoaded", function() {
    cookieFlag = getCookie('datastellar_modal_flag')
    if (!!cookieFlag) {
        modal.style.display = "none"
    }
})

btn.onclick = function () {
    var date = new Date();
    date.setTime(date.getTime() + (0.5*24*60*60*1000)) //half a day
    document.cookie = "datastellar_modal_flag=true; expires="+date.toUTCString();
    modal.style.display = "none"
};

// -------------------- Type Writer Logic ----------------------

// Source code: https://css-tricks.com/snippets/css/typewriter-effect/

document.addEventListener('DOMContentLoaded', function(event){

    if (document.querySelector(".core__text--h1")) {
        var texts = [ "We are datastellar." ];
        
        function typeWriter(text, i, callback) {
            if (i < text.length) { 
                var span = '<span class="core__text--span" aria-hidden="true"></span>'; // Border -> Cursor
                document.querySelector(".core__text--h1").innerHTML = text.substring(0, i+1) + span

                setTimeout(function() {
                    typeWriter(text, i+1, callback)
                }, 50);
            }      
            else if (typeof callback == 'function') { //?
                setTimeout(callback, 700); 
            }
        }

        function startTextAnimation(i) {
            if (typeof texts[i] == 'undefined'){
                setTimeout(function() {
                    startTextAnimation(0);
                }, 20000); //20s?
            }   
            if (texts[i]) {
                if (i < texts[i].length) { 
                    typeWriter(texts[i], 0, function(){ 
                        startTextAnimation(i+1); 
                    });
                }
            }
        }
        
        startTextAnimation(0); 
    }
});

    