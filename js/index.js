
var smallWindow;

jQuery(document).ready(function($) {

    /*----------------------------------------------------*/
    /* Collapse navigation bar
     ------------------------------------------------------ */

    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });


    /*----------------------------------------------------*/
    /* Smooth Scrolling
     ------------------------------------------------------ */

    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });


    });

    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
     ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#nav-wrap a");

    sections.waypoint({

        handler: function(event, direction) {

            var active_section;

            //active_section = $(this);
            active_section = this.element
            if (direction === "up") active_section = active_section.prev();

            //var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');
            var active_link = $('#nav-wrap a[href="#' + active_section.id + '"]');

            navigation_links.parent().removeClass("active");
            active_link.parent().addClass("active");
        },
        offset: '15%'

    });

    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
     ------------------------------------------------------*/

    $(window).on('scroll', function() {
        var h = $('.logo-section').height();
        var y = $(window).scrollTop();
        var nav = $('#nav-wrap');

        if ( (y > h * 0.1) && (y < h * 0.8) && ($(window).outerWidth() > 768 ) ) {
            nav.fadeOut('fast');
        } else {
            nav.fadeIn('fast');
        }
    });


    /*----------------------------------------------------*/
    /*	Check if FAQ should be collapsed
     ------------------------------------------------------*/

    //TODO: bug when the window is resized - the angles should be brought back to inital state

    function checkWidth() {
        var windowSize = $(window).width();
        if (windowSize < 768) {
            smallWindow = true;
            $(".faq-section p").slideUp(0);
        } else {
            $(".faq-section p").slideDown(0);
            smallWindow = false;
        }
    }
    checkWidth();
    $(window).resize(checkWidth);

    $(".faq-section h4").click(function(){
        if (smallWindow) {
            var element = $(this).next();
            var angle = $(this).find('i');
            if (element.is(":visible")){
                element.slideUp(500);
                angle.toggleClass('down');
            } else {
                $(".faq-item-selected").parent().find('i').toggleClass('down');
                $(".faq-item-selected").slideUp(500).removeClass("faq-item-selected");
                element.slideDown(500);
                element.addClass("faq-item-selected");
                angle.toggleClass('down');
            }
        }

    });

});