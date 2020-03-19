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


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.intro-slider').owlCarousel({
        loop:true,
        nav:false,
        items: 1,
        dots: true,
        animateIn: "fadeIn",
        animateOut: "fadeOut",
        mouseDrag: false,
    });

    $('.gallery-slider').owlCarousel({
        loop:true,
        nav:false,
        items: 3,
        dots: true,
        margin: 22,
        autoWidth: true,
        dotsEach: 3
    });

    $('.product-slider').owlCarousel({
        loop:false,
        nav:false,
        autoHeight: true,
        items: 1,
        thumbs: true,
        dots: true,
        thumbsPrerendered: true,
        thumbItemClass: 'product-nav',
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

    $('.gallery-slide').photoswipe();

    $('.preloader').fadeOut();


    $('.spinner-amount').on('click', 'button', function(e){
        var parent = $(this).parents('.spinner-amount');
        var input = parent.find('.amount');
        var amount = input.val();
        var btn = parent.siblings('.btn');

        if (!$(this).is('.down')) {
            amount++
        } else {
            if (amount > 1) amount--
        }

        input.val(amount).attr('value', amount);
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });

    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $('.value-div.delivery').click(function(){
        var th = $(this);
        var value = th.data('value');

        th.addClass('active').siblings('.value-div').removeClass('active');
        $('#delivery-type').val(value);
    });


    $('.value-div.payment').click(function(){
        var th = $(this);
        var value = th.data('value');

        th.addClass('active').siblings('.value-div').removeClass('active');
        $('#payment-type').val(value);
    });

    $('input[type="checkbox"]').styler();

    $('#check-all').change( function(){
        if(this.checked) {
            $('.cart-item').each(function(){
                $(this).find('.cart-item-check .jq-checkbox').addClass('checked');
                $(this).find('.cart-item-check input').prop('checked', true);
                $(this).addClass('ready-for-deletion');
            })
        } else {
            $('.cart-item').each(function(){
                $(this).find('.cart-item-check .jq-checkbox').removeClass('checked');
                $(this).find('.cart-item-check input').prop('checked', false);
                $(this).removeClass('ready-for-deletion');
            })
        }
    });

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



    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }


    function initMap() {
        ymaps.ready(function(){
            var mapId = $('#map'),
                attitude = mapId.data("att"),
                longtitude = mapId.data("long"),
                zoom = mapId.data("zoom"),
                marker = mapId.data("marker"),
                map = new ymaps.Map("map", {
                    center: [attitude, longtitude],
                    controls: ['zoomControl'],
                    zoom: zoom
                }),
                myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                    // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: marker,
                    // Размеры метки.
                    iconImageSize: [30, 45],
                });

            // Открываем балун на карте (без привязки к геообъекту).
            map.balloon.open(map.getCenter(), "<strong>Наш адрес:</strong> <br> г. Москва, ул. Илимская д.1Б", {
                // Опция: не показываем кнопку закрытия.
                closeButton: false
            });

            if ($(window).width()<415) {
                map.geoObjects.add(myPlacemark);
            }
        });
    }

    if( $('#map').length )         // use this if you are using id to check
    {
        setTimeout(function(){
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                initMap();
            });
        }, 2000);
    }
});
