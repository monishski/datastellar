// ------------------- Client Side Validation --------------------

// This on the client side, it ensures that at least 1 of the services is selected before submitting

$(document).ready(function () {
    $('.contactus__form--btn').click(function() {
        checked = $("input[type=checkbox]:checked").length;

        if(!checked) {
            alert("You must check at least one checkbox.");
            return false;
        }
    });
}); 