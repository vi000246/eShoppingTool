function displayDropdownList(el){
	var dropdown = el.next('.fx-dropdown-list');
    $('.fx-dropdown-list').removeClass('fx-show');

    dropdown.addClass('fx-show');

    var p = dropdown.offset();
    if(p.left + dropdown.outerWidth() > $('body').innerWidth()){
        dropdown.addClass('fx-dropdown-offscreen-right');
    }
}
    var is_mobile = false;
$(function(){
  $('html').attr('dir', 'ltr');

    /*
     * BEGIN drop-down functionality
     */
	    $(document).on('click', function(e) {
	        if(!$(e.target).closest('.fx-dropdown').length) {
	            $('.fx-dropdown-list:not(.fx-prevent-closing)').removeClass('fx-show');
	        }
	        if(!$(e.target).closest('.fx-select').length){
	            $('.fx-select-list').removeClass('fx-show');
	        }

	    });
	    
	
	    if ($('.fx-mobile-check').css('display')=="block"){
	        is_mobile = true;
	    }
	    if (is_mobile == false){
            if($('.fx-dropdown-list').length) {
		    var w = $('body').innerWidth();
		    $(window).on('resize',function(){
		        w = $(window).innerWidth();
		        var dropdown = $('.fx-dropdown-list');
		        var p = dropdown.offset();
		        if(p.left + dropdown.outerWidth() > w){
		            dropdown.addClass('fx-dropdown-offscreen-right');
		        }
		        else{
		            dropdown.removeClass('fx-dropdown-offscreen-right');
		        }
		    });
            }
	    }
	    
	    $('.fx-dropdown-toggle:not(.fx-ignore-default)').click(function(e){
	        e.preventDefault();
	         displayDropdownList($(this));
	    });
	    $('.fx-dropdown-list').click(function(e){
	        $('.fx-dropdown-list').siblings().removeClass('fx-show');
	    });
    /*
     * END drop-down functionality
     */
	       
    $('.fx-tab').click(function(e){
        e.preventDefault();
        $(this).addClass('fx-active');
        $(this).siblings().removeClass('fx-active');
        var open_tab = $(this).attr('fx-tab-trigger');
        var to_open = $(this).parents('.fx-tab-container').find('[fx-tab="' + open_tab  + '"]');
        
        $('.fx-tab[fx-tab-trigger="' + open_tab + '"]').addClass('fx-active');
        $('.fx-tab[fx-tab-trigger="' + open_tab + '"]').siblings().removeClass('fx-active');
		$(this).parents('.fx-horizontal-scrollview').scrollLeft( $(this).position().left);
         $(this).addClass('fx-active');
        $(this).siblings().removeClass('fx-active');
        $(to_open).addClass('fx-show');
        $(to_open ).siblings().removeClass('fx-show');
    });
   $('.fx-ext-tab-trigger').click(function(e){
        e.preventDefault();
        var open_tab = $(this).attr('fx-tab-trigger');
        var to_open = $('[fx-tab="' + open_tab  + '"]');
		
        var if_another_tab = $(this).parents('.fx-tab-container').find('.fx-tab.fx-active').attr('fx-tab-trigger');
        
        $('.fx-tab[fx-tab-trigger="' + open_tab + '"]').addClass('fx-active').trigger('click');
        $('.fx-tab[fx-tab-trigger="' + if_another_tab + '"]').click();
        $('.fx-tab[fx-tab-trigger="' + open_tab + '"]').siblings().removeClass('fx-active');
        $(to_open).addClass('fx-show');
        $(to_open ).siblings().removeClass('fx-show');
       
       return false;
    });

    $('.fx-sorting-button').click(function(){
        var sort_el = $(this).attr('fx-sort-trigger').str.split(/[ ,]+/).join(',');
        $(sort_el).fadeIn(200);
        $(sort_el).siblings().hide();
    });




    $('.fx-collapsible-toggle').click(function(e){
        e.preventDefault();
        $(this).parents('.fx-collapsible').toggleClass('fx-show');
    });
    



    $('.fx-popup-open').click(function(e){
        var target = $(this).attr('href') + '.fx-popup';
        e.preventDefault();
        $(target).addClass('fx-show');
        $('.fx-popup-overlay').fadeIn(200);
    });

    $('.fx-popup-overlay').click(function(){
        $('.fx-popup').removeClass('fx-show');
        $('.fx-popup-overlay').fadeOut(200);
    })
     $('.fx-popup-close').click(function(){
        $(this).parents('.fx-popup').removeClass('fx-show');
        $('.fx-popup-overlay').fadeOut(200);
    });
    $('.fx-mobile-close').click(function(e){
        e.preventDefault();
        $(this).parents('.fx-mobile-popup').removeClass('fx-show');
        $(this).parents('.fx-mobile-window').removeClass('fx-show');
    });

     $('.fx-overlay').click(function(){
        $('.general-search.fx-mobile').removeClass('fx-show');
        $('.fx-overlay').removeClass('fx-show');
        $('.fx-side-nav').removeClass('fx-show');
        $('html,body').removeClass('fx-show');
     });
    $('.fx-side-nav-toggle').click(function(e){
        e.preventDefault();
        $('.fx-overlay').toggleClass('fx-show');
        $('.fx-side-nav').toggleClass('fx-show');
        $('html,body').toggleClass('fx-show');
        $('.fx-overlay').css('z-index', '4');
     });


    function fx_select(){
        $(".fx-select").click(function(){
            $(this).children('.fx-select-list').addClass('fx-show');
        });
        $('.fx-select-list .fx-select-option').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            var current_selectbox_list = $(this).parent();
            var current_selected = $(this).parents('.fx-select').children('.fx-select-selected');
            $(current_selected).val($(this).text());
            $(current_selectbox_list).removeClass('fx-show');

            $(this).addClass('fx-active');
            $(this).trigger('fxactivated');//SM: custom trigger to detect the activation of this item 
            $(this).siblings().removeClass('fx-active');
        });
        $('.fx-select-list a').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            var current_selectbox_list = $(this).parent();
            $(current_selectbox_list).removeClass('fx-show');
        });
    }
    fx_select();
    $(document).on("scroll", onScroll);
    function onScroll(event){
		 
    	var scrollPos = $(document).scrollTop();
        $('.categories-list.fx-sticky a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top - 100 <= scrollPos && refElement.position().top + refElement.height() - 80 > scrollPos) {
                $('.categories-list.fx-sticky a').removeClass("fx-active");
                currLink.addClass("fx-active");
            }
            else{
                currLink.removeClass("fx-active");
            }
        });
    }
    $(' .fx-smooth-scroll  a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 500);
            return false;
          }
        }
    });


  
    // STICKY SIDE PANEL
    if ($('.fx-side-panel').length){
        var footTop = $('.footer-top').position().top ;

        var maxY = footTop - $('.fx-side-panel').outerHeight() - 90;
        var top = $('.fx-side-panel').offset().top - 70;
        $(window).scroll(function(evt) {

            var y = $(this).scrollTop();
            if (y > top) {
                if (y < maxY) {
                    $('.fx-side-panel').addClass('fx-fixed-position').removeAttr('style');
                } else {
                    $('.fx-side-panel').removeClass('fx-fixed-position').css({
                        position: 'absolute',
                        top: (maxY - top) + 'px'
                    });
                }
            } else {
                $('.fx-side-panel').removeClass('fx-fixed-position');
            }
        });
    }

    $('.fx-open-button').click(function(e){
        e.preventDefault();
        var to_open = $(this).attr('href');
        $(to_open).addClass('fx-show');
        $('.fx-backdrop-element').addClass('fx-show');
        $('.fx-overlay').addClass('fx-show');
        $('body, html').css('overflow', 'hidden');
        $(this).parents('.fx-side-nav.fx-show').removeClass('fx-show');
    });
     $('.fx-close-current').click(function(e){
        e.preventDefault();
        var to_close = $(this).parents('.fx-show');
        $(to_close ).removeClass('fx-show');
        $('.fx-backdrop-element').removeClass('fx-show');
        $('.fx-overlay').removeClass('fx-show');
        $('body, html').css('overflow', 'initial');
    });

});


