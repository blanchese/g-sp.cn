/* js Document */
/* Author: zq */
/* Time: 2016/1/5*/

$(function(){
	
	var four_more = function(){
		
		$('.four_adlist').addClass('cur0')
		
		}
	
	$(window).load(function(){
		
		four_more()
		
		})
		
	/*four-add*/
	$('.four_adlist li').hover(function(){
		
		var m = $(this).index()
		var n = m+1
		$(this).parents('.four_adlist').attr('class','four_adlist cur'+n)
		
		})
	
	/*top*/	
	$(window).scroll(function(){
		
		var scroll_top = $(this).scrollTop()
		
		if(scroll_top>150){
			
			$('.top').fadeIn(350)
			
			}
			else{
				
				$('.top').fadeOut(350)
				
				}
		})
		
		/*pro-view*/
	$(".showArea li").hover(function(){
		
		$(this).addClass('cur').siblings().removeClass('cur')
		
		})
	var v = $(".showArea li").length;
   				 	
    $(".showArea ul").width(288 * v);

    var newsIndex_2 = 1;
    $("#gobottom").click(function () {
        if (newsIndex_2 < v) {
            var $wrap = $('.showArea ul')
            $wrap.stop(true, true).animate({
                marginLeft: -newsIndex_2 * 72
            }, 800);
            newsIndex_2++
        }
       
    });

    $("#gotop").click(function () {
        if (newsIndex_2 > 1) {
            var $wrap = $('.showArea ul')
            $wrap.stop(true, true).animate({
                marginLeft: -(newsIndex_2-2) * 72
            }, 800);
            newsIndex_2--
        }
        
    })	

	/*购物车全选*/
		$('.buy_check').click(function(){
			
			if($(this).attr('checked')=="checked"){
				
				$(this).parents('.buy_table').find('.buy_rel .buy_hacheck').attr("checked","checked")
				
				}
				
				else{
					
					$(this).parents('.buy_table').find('.buy_rel .buy_hacheck').attr("checked",false)
					
					}
			
			})	
	
	/*文本框当前*/
	$('.com_text,.buy_adSel,.mem_sel').focus(function(){
		
		$(this).addClass('cur')
		
		})	
	
	$('.com_text,.buy_adSel,.mem_sel').blur(function(){
		
		$(this).removeClass('cur')
		
		})					
	
	/*登录*/	
	$('.com_lgtext').focus(function(){
		
		$(this).parents('.login_text').addClass('cur')
		
		})	
	
	$('.com_lgtext').blur(function(){
		
		$(this).parents('.login_text').removeClass('cur')
		
		})	
		

		
	/*会员中心*/
	$('.mem_adHave .mem_adRel:odd').addClass('cur')		
	$('.mem_adHave .mem_adRel').hover(function(){
		
		$(this).find('.mem_adSz').show()
		
		},function(){
			
			$(this).find('.mem_adSz').hide()
			
			})					    
	
	})