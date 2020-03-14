$(document).ready(function(){

    //*** mobile-mnu customization *****//
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            type: 'tabs',
            content: [ "<div class='logo-wrap'><img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/></div>",
                        "<a href='#mob-menu'>Меню</a>",
                        "<a href='#mob-catalog'>Продукция</a>"],

        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    //***** end mobile-mnu customization *****//



    $('.intro-slider').owlCarousel({
        loop:true,
        nav:false,
        items: 1,
        dots: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
    });

    function heightses() {
        if ($(window).width()>480) {
            $('.production-item-links').equalHeights();
            $('.production-item-content').equalHeights();
            $('.production-item-title').equalHeights();
        }

    }

    $(window).resize(function() {
        heightses();
    });

    heightses();

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});
