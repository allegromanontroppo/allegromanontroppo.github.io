!function(t){"use strict";Foundation.libs.tab={name:"tab",version:"5.0.3",settings:{active_class:"active",callback:function(){}},init:function(t,a,s){this.bindings(a,s)},events:function(){t(this.scope).off(".tab").on("click.fndtn.tab","[data-tab] > dd > a",function(a){a.preventDefault();var s=t(this).parent(),i=s.closest("[data-tab]"),n=t("#"+this.href.split("#")[1]),e=s.siblings(),c=i.data("tab-init");s.addClass(c.active_class).trigger("opened"),e.removeClass(c.active_class),n.siblings().removeClass(c.active_class).end().addClass(c.active_class),c.callback(s),i.trigger("toggled",[s])})},off:function(){},reflow:function(){}}}(jQuery,this,this.document);