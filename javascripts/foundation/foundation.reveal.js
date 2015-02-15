!function(e,t,n,s){"use strict";Foundation.libs.reveal={name:"reveal",version:"5.0.3",locked:!1,settings:{animation:"fadeAndPop",animation_speed:250,close_on_background_click:!0,close_on_esc:!0,dismiss_modal_class:"close-reveal-modal",bg_class:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(e,t,n){Foundation.inherit(this,"delay"),this.bindings(t,n)},events:function(){var t=this;return e("[data-reveal-id]",this.scope).off(".reveal").on("click.fndtn.reveal",function(n){if(n.preventDefault(),!t.locked){var s=e(this),i=s.data("reveal-ajax");if(t.locked=!0,"undefined"==typeof i)t.open.call(t,s);else{var a=i===!0?s.attr("href"):i;t.open.call(t,s,{url:a})}}}),e(this.scope).off(".reveal").on("click.fndtn.reveal",this.close_targets(),function(n){if(n.preventDefault(),!t.locked){var s=e("[data-reveal].open").data("reveal-init"),i=e(n.target)[0]===e("."+s.bg_class)[0];if(i&&!s.close_on_background_click)return;t.locked=!0,t.close.call(t,i?e("[data-reveal].open"):e(this).closest("[data-reveal]"))}}),e("[data-reveal]",this.scope).length>0?e(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):e(this.scope).on("open.fndtn.reveal","[data-reveal]",this.settings.open).on("opened.fndtn.reveal","[data-reveal]",this.settings.opened).on("opened.fndtn.reveal","[data-reveal]",this.open_video).on("close.fndtn.reveal","[data-reveal]",this.settings.close).on("closed.fndtn.reveal","[data-reveal]",this.settings.closed).on("closed.fndtn.reveal","[data-reveal]",this.close_video),e("body").on("keyup.fndtn.reveal",function(t){var n=e("[data-reveal].open"),s=n.data("reveal-init");27===t.which&&s.close_on_esc&&n.foundation("reveal","close")}),!0},open:function(t,n){var s=this;if(t)if("undefined"!=typeof t.selector)var i=e("#"+t.data("reveal-id"));else{var i=e(this.scope);n=t}else var i=e(this.scope);var a=i.data("reveal-init");if(!i.hasClass("open")){var o=e("[data-reveal].open");if("undefined"==typeof i.data("css-top")&&i.data("css-top",parseInt(i.css("top"),10)).data("offset",this.cache_offset(i)),i.trigger("open"),o.length<1&&this.toggle_bg(i),"undefined"!=typeof n&&n.url){var d="undefined"!=typeof n.success?n.success:null;e.extend(n,{success:function(t,n,l){if(e.isFunction(d)&&d(t,n,l),i.html(t),e(i).foundation("section","reflow"),o.length>0){var r=o.data("reveal-init");s.hide(o,r.css.close)}s.show(i,a.css.open)}}),e.ajax(n)}else{if(o.length>0){var l=o.data("reveal-init");this.hide(o,l.css.close)}this.show(i,a.css.open)}}},close:function(t){var t=t&&t.length?t:e(this.scope),n=e("[data-reveal].open"),s=t.data("reveal-init");n.length>0&&(this.locked=!0,t.trigger("close"),this.toggle_bg(t),this.hide(n,s.css.close,s))},close_targets:function(){var e="."+this.settings.dismiss_modal_class;return this.settings.close_on_background_click?e+", ."+this.settings.bg_class:e},toggle_bg:function(t){t.data("reveal-init");0===e("."+this.settings.bg_class).length&&(this.settings.bg=e("<div />",{"class":this.settings.bg_class}).appendTo("body")),this.settings.bg.filter(":visible").length>0?this.hide(this.settings.bg):this.show(this.settings.bg)},show:function(n,s){if(s){var i=n.data("reveal-init");if(0===n.parent("body").length){var a=n.wrap('<div style="display: none;" />').parent();n.on("closed.fndtn.reveal.wrapped",function(){n.detach().appendTo(a),n.unwrap().unbind("closed.fndtn.reveal.wrapped")}),n.detach().appendTo("body")}if(/pop/i.test(i.animation)){s.top=e(t).scrollTop()-n.data("offset")+"px";var o={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return this.delay(function(){return n.css(s).animate(o,i.animation_speed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),i.animation_speed/2)}if(/fade/i.test(i.animation)){var o={opacity:1};return this.delay(function(){return n.css(s).animate(o,i.animation_speed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),i.animation_speed/2)}return n.css(s).show().css({opacity:1}).addClass("open").trigger("opened")}var i=this.settings;return/fade/i.test(i.animation)?n.fadeIn(i.animation_speed/2):n.show()},hide:function(n,s){if(s){var i=n.data("reveal-init");if(/pop/i.test(i.animation)){var a={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return this.delay(function(){return n.animate(a,i.animation_speed,"linear",function(){this.locked=!1,n.css(s).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),i.animation_speed/2)}if(/fade/i.test(i.animation)){var a={opacity:0};return this.delay(function(){return n.animate(a,i.animation_speed,"linear",function(){this.locked=!1,n.css(s).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),i.animation_speed/2)}return n.hide().css(s).removeClass("open").trigger("closed")}var i=this.settings;return/fade/i.test(i.animation)?n.fadeOut(i.animation_speed/2):n.hide()},close_video:function(){var t=e(this).find(".flex-video"),n=t.find("iframe");n.length>0&&(n.attr("data-src",n[0].src),n.attr("src","about:blank"),t.hide())},open_video:function(){var t=e(this).find(".flex-video"),n=t.find("iframe");if(n.length>0){var i=n.attr("data-src");if("string"==typeof i)n[0].src=n.attr("data-src");else{var a=n[0].src;n[0].src=s,n[0].src=a}t.show()}},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(jQuery,this,this.document);