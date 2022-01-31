/* =================================
------------------------------------
	expertplat - Education Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';


$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
			Badge
		--------------------*/
	// $("#badgevisibility").hide();
	$(".clickme").click(function() {
	$("#badgevisibility").fadeOut(300).hide()
	$("#cartBadgevisibility").fadeOut(300).hide()
	});


	/*------------------
		Gallery item
	--------------------*/
	if($('.course-items-area').length > 0 ) {
		var containerEl = document.querySelector('.course-items-area');
		// var mixer = mixitup(containerEl);
		var mixer = mixitup(containerEl, {
			selectors: {
				// target: '[data-ref~="mixitup-target"]',
				control: '[data-mixitup-control]'
			}
		});
	}

	
		/*------------------
				Add Section
			--------------------*/



			// $(document).ready(function () {
			// 	var mycontent = '';
			// 	$(".collapsed").attr('href').each(function () {
			// 		mycontent = cardIdName;
			// 	});
			// 	$(".collapsed").attr('href').remove();
			// 	$(".collapsed").append(mycontent);
			// })
			$(document).ready(function(){
				$('a[href^="http://"]').each(function(){ 
					var oldUrl = $(this).attr("href"); // Get current url
					var newUrl = oldUrl.replace("http://", "https://"); // Create new url
					$(this).attr("href", newUrl); // Set herf value
				});

				$('.nav-toggle').click(function () {
					var collapse_content_selector = $(this).attr('href');
					var toggle_switch = $(this);
					$(collapse_content_selector).toggle(function () {
						if ($(this).css('display') == 'none') {
							// toggle_switch.find($(".nav-toggle i.fas")).toggleClass('fa-chevron-up fa-chevron-down');
							toggle_switch.html('Show More');

							
						} else {
							// toggle_switch.find($(".nav-toggle i.fas")).toggleClass('fa-chevron-down fa-chevron-up');
							toggle_switch.html('Show Less');
							// $('i.fa-chevron-down').removeClass('.fa-chevron-up');
							// $('i.fa-chevron-down').addClass('.fa-chevron-up');
						}
					});
					
					// $("i", this).toggleClass("fa-chevron-down fa-chevron-up");
				});

			});

			// $('.accordion').each(function(key, item) {

			// 	var cardIdName = 'collapse' + key;
				
			// 	// console.log(cardIdName);
			// 	$('.moreCollapse')[key].id = cardIdName;

				// var allLinks = $('.moreCollapse').map( function() {
				// 	return $(this).attr('href');
				// }).get();

				var allLinks = $('.accordion').find('.collapsed').each(function(key) {

					var cardIdName = 'collapse' + key;
				
				$('.moreCollapse')[key].id = cardIdName;

					$(this).attr('href', "#"+cardIdName)
					
					console.log($(this).attr('href'));
				});

				console.log(allLinks);
				// var oldUrl = $(".collapsed").attr("href"); // Get current url
				// console.log(oldUrl);
				// var newUrl = oldUrl.replace("http://", "https://"); // Create new url
				// $(".collapsed").attr('href', "#"+ cardIdName )
				// 	var mycontent = cardIdName;

				// 	console.log(mycontent);
				// $(".collapsed").attr('href').replace(mycontent);
				// // $(".collapsed").append(mycontent);

			// });
				

});

(function($) {

	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});

	// $(".nav-tabs li.nav-item").click(function() {
	// 	$(".nav-tabs li.nav-item").removeClass('active');
	//   });


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Realated courses
	--------------------*/
    $('.rc-slider').owlCarousel({
		autoplay:true,
		loop: true,
		nav:true,
		dots: false,
		margin: 30,
		navText: ['', '<i class="fa fa-angle-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			576:{
				items:2
			},
			990:{
				items:3
			},
			1200:{
				items:4
			}
		}
	});



    /*------------------
		Accordions
	--------------------*/
	$(document).ready(function(){
		// Add minus icon for collapse element which is open by default
		$(".collapse.show").each(function(){
		  $(this).prev(".card-header").find(".fa").addClass("fa-minus").removeClass("fa-plus");
		});
		// Toggle plus minus icon on show hide of collapse element
		$(".collapse").on('show.bs.collapse', function(){
		  $(this).prev(".card-header").find(".fa").removeClass("fa-plus").addClass("fa-minus");
		}).on('hide.bs.collapse', function(){
		  $(this).prev(".card-header").find(".fa").removeClass("fa-minus").addClass("fa-plus");
		});
	  });

	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cptitle = $(this).data("cptitle");
		var cpid 	= $(this).data("cpid");

		$(this).append('<div class="'+ cpid +'"></div><div class="progress-info"><h2>'+ cpvalue +'%</h2><p>'+ cptitle +'</p></div>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 176,
				thickness: 9,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 176,
				thickness: 9,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}

	});


	/*------------------
			Back to top
		--------------------*/
		/*Scroll to top when arrow up clicked BEGIN*/
		$(window).scroll(function() {
			var height = $(window).scrollTop();
			if (height > 100) {
				$('#myBtn').fadeIn();
			} else {
				$('#myBtn').fadeOut();
			}
		});
		$(document).ready(function() {
			$("#myBtn").click(function(event) {
				event.preventDefault();
				$("html, body").animate({ scrollTop: 0 }, "slow");
				return false;
			});

		});
		/*Scroll to top when arrow up clicked END*/

		
    // ============================================================== 
    // Notification list
    // ============================================================== 
    if ($(".notification-list").length) {

        $('.notification-list').slimScroll({
            height: '250px'
        });

    }

    // ============================================================== 
    // Menu Slim Scroll List
    // ============================================================== 


    if ($(".menu-list").length) {
        $('.menu-list').slimScroll({

        });
    }

    // ============================================================== 
    // Sidebar scrollnavigation 
    // ============================================================== 

    if ($(".sidebar-nav-fixed a").length) {
        $('.sidebar-nav-fixed a')
            // Remove links that don't actually link to anything

            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                    location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();
                        $('html, body').animate({
                            scrollTop: target.offset().top - 90
                        }, 1000, function() {
                            // Callback after animation
                            // Must change focus!
                            var $target = $(target);
                            $target.focus();
                            if ($target.is(":focus")) { // Checking if the target was focused
                                return false;
                            } else {
                                $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                                $target.focus(); // Set focus again
                            };
                        });
                    }
                };
                $('.sidebar-nav-fixed a').each(function() {
                    $(this).removeClass('active');
                })
                $(this).addClass('active');
            });

    }

    // ============================================================== 
    // tooltip
    // ============================================================== 
    if ($('[data-toggle="tooltip"]').length) {
            
            $('[data-toggle="tooltip"]').tooltip()

        }

     // ============================================================== 
    // popover
    // ============================================================== 
       if ($('[data-toggle="popover"]').length) {
            $('[data-toggle="popover"]').popover()

    }
     // ============================================================== 
    // Chat List Slim Scroll
    // ============================================================== 
        

        if ($('.chat-list').length) {
            $('.chat-list').slimScroll({
            color: 'false',
            width: '100%'


        });
    }

})(jQuery);

