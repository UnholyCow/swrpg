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
		$('html, body').animate({scrollTop : 0},200);
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

	/* PC site navigation =======================  */
	//Open the dropdown menus.
	$('.toggle-groups-nav').mouseenter(function(e) {
		e.preventDefault();
		$(this).next('ul').show();
		if ($('#rules-nav').is(':visible')) {
			$('#rules-nav').hide();
		}
	});

	$('.toggle-rules-nav').mouseenter(function(e) {
		e.preventDefault();
		$(this).next('ul').show();
		if ($('#groups-nav').is(':visible')) {
			$('#groups-nav').hide();
		}
	});

	//Close the dropdown menus.
	$('#groups-nav').mouseleave(function(e) {
		$('#groups-nav').hide();
	});

	$('#rules-nav').mouseleave(function(e) {
		$('#rules-nav').hide();
	});
	
	/* DM site navigation ====================  */
	//Open the dropdown menus.
	$('.toggle-adv-nav').mouseenter(function(e) {
		e.preventDefault();
		$(this).next('ul').show();
	});

	//Close the dropdown menus.
	$('#adv-nav').mouseleave(function(e) {
		$('#adv-nav').hide();
	});

	//Mobile nav including prepending landing pages for players and rules.
	$('.toggle-groups-nav').bind('touchstart', function(e) {
		e.preventDefault();
		if ($('#groups-nav li').length == 6) {
			$('#groups-nav').prepend('<li><a href="http://www.unholycow.com/swrpg/groups/monarch/overview.html">Overview</a></li>');
		}
		$('#rules-nav').hide();
		$('#groups-nav').toggle();
	});

	$('.toggle-rules-nav').bind('touchstart', function(e) {
		e.preventDefault();
		if ($('#rules-nav li').length == 3) {
			$('#rules-nav').prepend('<li><a href="http://www.unholycow.com/swrpg/rules.html">Basics</a></li>');
		}
		$('#groups-nav').hide();
		$('#rules-nav').toggle();
	});

});