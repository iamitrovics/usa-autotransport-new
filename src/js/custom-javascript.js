(function($) {
	jQuery(document).ready(function() {
	    // desktop multilevel menu
        $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
            if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
            }
            var $subMenu = $(this).next(".dropdown-menu");
            $subMenu.toggleClass('show');
            $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
            });
            return false;
        });;
        //sticky header
        jQuery(window).scroll(function() {
            if ($(this).scrollTop() > 50){  
                $('#menu_area').addClass("sticky");
            }
            else{
                $('#menu_area').removeClass("sticky");
            }
        });

        //faq accordion
        $(document).ready(function() {
            $(".faq__accordion .faq-wrap > .accordion-heading").on("click", function(e) {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this)
                    .siblings(".faq__accordion .content")
                    .slideUp(200);
                } else {
                    $(".faq__accordion .faq-wrap > .accordion-heading").removeClass("active");
                    $(this).addClass("active");
                    $(".faq__accordion .content").slideUp(200);
                    $(this)
                    .siblings(".faq__accordion .content")
                    .slideDown(200);
                }
                e.preventDefault();
            });
        });
        $('#cities-slider ul').slick({
            infinite: true,
            speed: 300,
            rows:7,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            arrows: true,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        infinite: false,
                        dots: false,
                        arrows: true,
                    }
                },
            ]
        });

        $('#nav-slider').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            autoplay: true,
            infinite: true,
            autoplaySpeed: 4000,
            responsive: [{
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },

                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                },

            ]
        });        

        
        $('#timeline-slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            autoplay: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: false,
                        infinite: true,
                        dots: false,
                        arrows: true,
                    }
                },
            ]
        });
        $('#reviews-slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            autoplay: false
        });
        $('#testimonial-slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            autoplay: false
        });


        $('#process-slider').slick({
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            autoplay: false
        });
        $('#cities-area .btn-prev').click(function(e){
            $('#process-slider').slick('slickPrev');
            e.preventDefault();
          })
          
          $('#cities-area .btn-next').click(function(e){
            $('#process-slider').slick('slickNext');
            e.preventDefault();
          })


        // Menu
        $('.menu-btn').click(function(){
            $('.main-menu-sidebar').addClass("menu-active");
            $('.menu-overlay').addClass("active-overlay");
            $('body').addClass("body-scroll");
            $(this).toggleClass('open');
        });
  
        // Menu
        $('.close-menu-btn').click(function(){
            $('.main-menu-sidebar').removeClass("menu-active");
            $('.menu-overlay').removeClass("active-overlay");
            $('body').removeClass("body-scroll");
        });
  
            $(function() {
        
            var menu_ul = $('.nav-links > li.has-menu  ul'),
                menu_a  = $('.nav-links > li.has-menu  small');
            
            menu_ul.hide();
            
            menu_a.click(function(e) {
                e.preventDefault();
                if(!$(this).hasClass('active')) {
                menu_a.removeClass('active');
                menu_ul.filter(':visible').slideUp('normal');
                $(this).addClass('active').next().stop(true,true).slideDown('normal');
                } else {
                $(this).removeClass('active');
                $(this).next().stop(true,true).slideUp('normal');
                }
            });
            
            });
            
        $(".nav-links > li.has-menu  small ").attr("href","javascript:;");
    
        var $menu = $('#menu');
  
        $(document).mouseup(function (e) {
          if (!$menu.is(e.target) // if the target of the click isn't the container...
          && $menu.has(e.target).length === 0) // ... nor a descendant of the container
          {
            $menu.removeClass('menu-active');
            $('.menu-overlay').removeClass("active-overlay");
          }
        });

    //modal
    setTimeout(function () {
        jQuery('.modal-overlay').addClass('show');
    }, 1000);
    $('.zebra_tooltips_below').click(function (e) {
        var myEm = $(this).attr('data-my-element');
        var modal = $('.modal-overlay[data-my-element = ' + myEm + '], .modal[data-my-element = ' + myEm + ']');
        e.preventDefault();
        modal.addClass('active');
        $('html').addClass('fixed');
    });
    $('.close-modal').click(function () {
        var modal = $('.modal-overlay, .modal');
        $('html').removeClass('fixed');
        modal.removeClass('active');
    });        

        
        $(".date-picker-input").datepicker({
            minDate: '0'
        });
        $('.selectpicker').selectpicker();

        $(document).on('click', '.scroll-down a', function(event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top-100
            }, 500);
        });
        $('#reviews-area .col-lg-6').matchHeight();
        $('#gallery-photos [data-fancybox="gallery"]').fancybox();
    });
})(jQuery);
