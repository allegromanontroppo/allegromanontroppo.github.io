!function(i,t,e,n){"use strict";Foundation.libs.clearing={name:"clearing",version:"5.0.0",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close",init:!1,locked:!1},init:function(t,e,n){var s=this;Foundation.inherit(this,"throttle loaded"),this.bindings(e,n),i(this.scope).is("[data-clearing]")?this.assemble(i("li",this.scope)):i("[data-clearing]",this.scope).each(function(){s.assemble(i("li",this))})},events:function(e){var n=this;i(this.scope).off(".clearing").on("click.fndtn.clearing","ul[data-clearing] li",function(t,e,s){var e=e||i(this),s=s||e,a=e.next("li"),r=e.closest("[data-clearing]").data("clearing-init"),l=i(t.target);t.preventDefault(),r||(n.init(),r=e.closest("[data-clearing]").data("clearing-init")),s.hasClass("visible")&&e[0]===s[0]&&a.length>0&&n.is_open(e)&&(s=a,l=i("img",s)),n.open(l,e,s),n.update_paddles(s)}).on("click.fndtn.clearing",".clearing-main-next",function(i){n.nav(i,"next")}).on("click.fndtn.clearing",".clearing-main-prev",function(i){n.nav(i,"prev")}).on("click.fndtn.clearing",this.settings.close_selectors,function(i){Foundation.libs.clearing.close(i,this)}).on("keydown.fndtn.clearing",function(i){n.keydown(i)}),i(t).off(".clearing").on("resize.fndtn.clearing",function(){n.resize()}),this.swipe_events(e)},swipe_events:function(){var t=this;i(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(t){t.touches||(t=t.originalEvent);var e={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:n};i(this).data("swipe-transition",e),t.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(e){if(e.touches||(e=e.originalEvent),!(e.touches.length>1||e.scale&&1!==e.scale)){var n=i(this).data("swipe-transition");if("undefined"==typeof n&&(n={}),n.delta_x=e.touches[0].pageX-n.start_page_x,"undefined"==typeof n.is_scrolling&&(n.is_scrolling=!!(n.is_scrolling||Math.abs(n.delta_x)<Math.abs(e.touches[0].pageY-n.start_page_y))),!n.is_scrolling&&!n.active){e.preventDefault();var s=n.delta_x<0?"next":"prev";n.active=!0,t.nav(e,s)}}}).on("touchend.fndtn.clearing",".visible-img",function(t){i(this).data("swipe-transition",{}),t.stopPropagation()})},assemble:function(t){var e=t.parent();if(!e.parent().hasClass("carousel")){e.after('<div id="foundationClearingHolder"></div>');var n=i("#foundationClearingHolder"),s=e.data("clearing-init"),a=e.detach(),r={grid:'<div class="carousel">'+a[0].outerHTML+"</div>",viewing:s.templates.viewing},l='<div class="clearing-assembled"><div>'+r.viewing+r.grid+"</div></div>";return n.after(l).remove()}},open:function(t,e,n){var s=n.closest(".clearing-assembled"),a=i("div",s).first(),r=i(".visible-img",a),l=i("img",r).not(t);this.locked()||(l.attr("src",this.load(t)).css("visibility","hidden"),this.loaded(l,function(){l.css("visibility","visible"),s.addClass("clearing-blackout"),a.addClass("clearing-container"),r.show(),this.fix_height(n).caption(i(".clearing-caption",r),t).center(l).shift(e,n,function(){n.siblings().removeClass("visible"),n.addClass("visible")})}.bind(this)))},close:function(t,e){t.preventDefault();var n,s,a=function(i){return/blackout/.test(i.selector)?i:i.closest(".clearing-blackout")}(i(e));return e===t.target&&a&&(n=i("div",a).first(),s=i(".visible-img",n),this.settings.prev_index=0,i("ul[data-clearing]",a).attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),n.removeClass("clearing-container"),s.hide()),!1},is_open:function(i){return i.parent().prop("style").length>0},keydown:function(t){var e=i("ul[data-clearing]",".clearing-blackout");39===t.which&&this.go(e,"next"),37===t.which&&this.go(e,"prev"),27===t.which&&i("a.clearing-close").trigger("click")},nav:function(t,e){var n=i("ul[data-clearing]",".clearing-blackout");t.preventDefault(),this.go(n,e)},resize:function(){var t=i("img",".clearing-blackout .visible-img");t.length&&this.center(t)},fix_height:function(t){var e=t.parent().children();return e.each(function(){var t=i(this),e=t.find("img");t.height()>e.outerHeight()&&t.addClass("fix-height")}).closest("ul").width(100*e.length+"%"),this},update_paddles:function(t){var e=t.closest(".carousel").siblings(".visible-img");t.next().length>0?i(".clearing-main-next",e).removeClass("disabled"):i(".clearing-main-next",e).addClass("disabled"),t.prev().length>0?i(".clearing-main-prev",e).removeClass("disabled"):i(".clearing-main-prev",e).addClass("disabled")},center:function(i){return i.css(this.rtl?{marginRight:-(i.outerWidth()/2),marginTop:-(i.outerHeight()/2)}:{marginLeft:-(i.outerWidth()/2),marginTop:-(i.outerHeight()/2)}),this},load:function(i){if("A"===i[0].nodeName)var t=i.attr("href");else var t=i.parent().attr("href");return this.preload(i),t?t:i.attr("src")},preload:function(i){this.img(i.closest("li").next()).img(i.closest("li").prev())},img:function(t){if(t.length){var e=new Image,n=i("a",t);e.src=n.length?n.attr("href"):i("img",t).attr("src")}return this},caption:function(i,t){var e=t.data("caption");return e?i.html(e).show():i.text("").hide(),this},go:function(t,e){var n=i(".visible",t),s=n[e]();s.length&&i("img",s).trigger("click",[n,s])},shift:function(i,t,e){var n,s=t.parent(),a=this.settings.prev_index||t.index(),r=this.direction(s,i,t),l=parseInt(s.css("left"),10),c=t.outerWidth();t.index()===a||/skip/.test(r)?/skip/.test(r)&&(n=t.index()-this.settings.up_count,this.lock(),n>0?s.animate({left:-(n*c)},300,this.unlock()):s.animate({left:0},300,this.unlock())):/left/.test(r)?(this.lock(),s.animate({left:l+c},300,this.unlock())):/right/.test(r)&&(this.lock(),s.animate({left:l-c},300,this.unlock())),e()},direction:function(t,e,n){var s,a=i("li",t),r=a.outerWidth()+a.outerWidth()/4,l=Math.floor(i(".clearing-container").outerWidth()/r)-1,c=a.index(n);return this.settings.up_count=l,s=this.adjacent(this.settings.prev_index,c)?c>l&&c>this.settings.prev_index?"right":c>l-1&&c<=this.settings.prev_index?"left":!1:"skip",this.settings.prev_index=c,s},adjacent:function(i,t){for(var e=t+1;e>=t-1;e--)if(e===i)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},off:function(){i(this.scope).off(".fndtn.clearing"),i(t).off(".fndtn.clearing")},reflow:function(){this.init()}}}(jQuery,this,this.document);