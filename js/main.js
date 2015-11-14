$(document).ready(function(){
	
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn();
		} else {
			$('.back-to-top').fadeOut();
		}

		//Also sets top for mobile navigation, disabled unless needed
		// $scroll = window.pageYOffset;
		// $('nav').css({ top: $scroll });
	});
	
	//Click event to scroll to top
	$('.back-to-top').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});

	//Mobile CSS menu
	$('#hamburger').on('touchstart click', function(e) {

		e.preventDefault();

		//Declare menu to clean up code
		var $menu = $('.container, header'),
			$scroll = window.pageYOffset;

		//Define the animation type on click
		$menu.addClass('animate');
		$('nav').css({ top: $scroll });

		//Transition compatability
      	transitionEnd = 'transitionend webkitTransitionEnd otransitionend MSTransitionEnd';

		//Check if the menu is already visible and animate in the proper direction
		if ( $menu.hasClass('nav-visible') ) {
			$menu.addClass('close-nav');

		} else {
			$menu.addClass('open-nav');
		}

		//Clean up animations and toggle the nav being visible or not
		$menu.on( transitionEnd, function() {
			$menu
				.removeClass('animate close-nav open-nav')
				.toggleClass('nav-visible');

		$menu.off( transitionEnd );
		} );
	} );
	
});