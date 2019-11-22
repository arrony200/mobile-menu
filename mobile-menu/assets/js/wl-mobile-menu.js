jQuery(document).ready(function($){

if( jQuery( window ).width() < 992 ) {	
	
	jQuery("<a id='wl-menu-trigger' href='#'><span class='wl-menu-icon'></span></a>").clone().appendTo(".wl-menu"); 
	
	var $lateral_menu_trigger = $('#wl-menu-trigger'),
		$content_wrapper = $('.wl-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('.mainmenu').toggleClass('lateral-menu-is-open');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$content_wrapper.on('click', function(event){
		if( !$(event.target).is('#wl-menu-trigger, #wl-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$navigation.removeClass('lateral-menu-is-open');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			$('.mainmenu').removeClass('lateral-menu-is-open');
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});
	
	
	jQuery('.wl-menu nav ul ul').each(function() {
		jQuery(this).parent('li').addClass('menu-item-has-children');				
	});	
	
	
	jQuery("<span class='mean-expand'></span>").clone().appendTo(".menu-item-has-children"); 
	

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.menu-item-has-children').children('.mean-expand').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').prev('.sub-menu').slideToggle(200).end().parent('.menu-item-has-children');
	});
	
}	
	
});











