/*
---
description: This plugin MooTools provides functionality for displaying simple binary clock  on a page.

authors:
  - Adrian Statescu (http://thinkphp.ro)

license:
  - MIT-style license

requires:
  core/1.3: '*'

provides:
  - BinaryClock
...
*/

var BinaryClock=new Class({initialize:function(ID){this.main_canvas=document.id(ID);this.context=this.main_canvas.getContext("2d");this.currentTime=new Date();this._update_time();this._update_time.periodical(1000,this)},_toBin:function(nr){var out=[];for(var i=5;i>=0;i--){out.push((nr>>i)&1)}return out}.protect(),_update_time:function(){this.currentTime=new Date();var hours=this.currentTime.getHours(),minutes=this.currentTime.getMinutes(),seconds=this.currentTime.getSeconds();hours=hours>12?hours-12:hours;var binary_seconds=this._toBin(seconds),binary_minutes=this._toBin(minutes),binary_hours=this._toBin(hours);this._update_canvas(binary_hours,binary_minutes,binary_seconds)},_update_canvas:function(hours,minutes,seconds){this.context.beginPath();this.context.fillStyle="rgb(10,10,10)";this.context.fillRect(0,0,520,240);var pos_h=5;for(var h=hours.length-1;h>=2;h--){location_x=-55+pos_h*90;location_y=50;if(hours[h]==1){this._on(location_x,location_y)}else{this._off(location_x,location_y)}pos_h-=1}var pos_m=5;for(var m=minutes.length-1;m>=0;m--){location_x=35+pos_m*90;location_y=120;if(minutes[m]==1){this._on(location_x,location_y)}else{this._off(location_x,location_y)}pos_m-=1}var pos_s=5;for(var k=seconds.length-1;k>=0;k--){location_x=35+pos_s*90;location_y=190;if(seconds[k]==1){this._on(location_x,location_y)}else{this._off(location_x,location_y)}pos_s-=1}}.protect(),_on:function(x,y){this.context.beginPath();this.context.fillStyle="rgb(10,150,10)";this.context.arc(x,y,25,0,Math.PI*2,true);this.context.fill();this.context.closePath()}.protect(),_off:function(x,y){this.context.beginPath();this.context.strokeStyle="rgb(10,150,10)";this.context.arc(x,y,25,0,Math.PI*2,true);this.context.stroke();this.context.closePath()}.protect()});