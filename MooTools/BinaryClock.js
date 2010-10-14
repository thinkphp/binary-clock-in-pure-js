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

var BinaryClock = new Class({
 
        /* Constructor of class 
         * @param (String) ID - ID of the canvas element html.
         * @public
         */
        initialize: function(ID){
 
               //the <canvas> is initially blank

               //we retrieve the canvas DOM node using document.id method.
               this.main_canvas = document.id(ID);
    
               //the canvas element has a DOM method called 'getContext' 
               //used to optain the rendering context and its drawing functions.
               //this method takes one parameter, the type of context.
               //now we can access the drawing context
               this.context = this.main_canvas.getContext('2d');

               //define time
               this.currentTime = new Date();

               //call instantly update_time
               this._update_time(); 

               //update time!!!
               this._update_time.periodical(1000,this);
        },

        /* 
         * Convert hex to binary (1=>001, 2=>010, 3=>011)
         * @param (Number) number to convert in binary
         * @return (Array) ex: return [0,0,0,1,0];
         * @private
         */
        _toBin: function(nr) {
              var out = [];
              for(var i=5;i>=0;i--) {
                  out.push((nr>>i)&1);        
              }
          return out;
        }.protect(),

        /* Update time
         * @param none.
         * @return none.
         * @private
         */
        _update_time: function() {

           //get current time
           this.currentTime = new Date();
           //get hours
           var hours = this.currentTime.getHours(),
               //get minutes
               minutes = this.currentTime.getMinutes(),
               //get seconds
               seconds = this.currentTime.getSeconds(); 

            //if hours > 12 then decreases 12 from hours for clean time
            hours = hours > 12 ? hours-12 : hours;

            //convert seconds into binary  
            var binary_seconds = this._toBin(seconds),

            //convert minutes into binary
            binary_minutes = this._toBin(minutes),

            //convert hours into binary
            binary_hours = this._toBin(hours);

            //update canvas with current format binary time
            this._update_canvas(binary_hours, binary_minutes, binary_seconds); 
        },

        /* Update canvas with current binary time
         * @param (number) hours (mandatory) current hour
         * @param (number) minutes (mandatory) current minute
         * @param (number) seconds (mandatory) current second
         * @return none.  
         * @private
         */
         _update_canvas: function(hours, minutes, seconds) {

               //the first step is to create a path for drawing a shape.  
               this.context.beginPath();
               //fills rectangle with black color
               this.context.fillStyle = "rgb(10,10,10)";  
               //render a fill rectangle 
               this.context.fillRect(0,0,520,240);  

               //set gap between bits
               var pos_h = 5;
                   for(var h=hours.length-1;h>=2;h--) {
                       location_x = -55 + pos_h*90; 
                       location_y = 50;
                       if(hours[h] == 1) {
                          this._on(location_x,location_y);
                       } else {
                          this._off(location_x,location_y);
                       }     
                       pos_h -= 1;             
                    }

                //set gap between bits
                var pos_m = 5;
                   for(var m=minutes.length-1;m>=0;m--) {
                       location_x = 35+pos_m*90; 
                       location_y = 120;
                       if(minutes[m] == 1) {
                          this._on(location_x,location_y);
                       } else {
                          this._off(location_x,location_y);
                       }     
                       pos_m -= 1;             
                    }

                 //set gap between bits
                 var pos_s = 5;
                    for(var k=seconds.length-1;k>=0;k--){
                        location_x = 35+pos_s*90; 
                        location_y = 190;
                        if(seconds[k] == 1) {
                           this._on(location_x,location_y);
                        } else {
                           this._off(location_x,location_y);
                        }     
                        pos_s -= 1;  
                     }                
        }.protect(),

        /* 
         * Set bit ON at position (x,y)         
         *   
         * For drawing circles we use the 'arc' method
         * ctx.arc(x,y,radius,startAngle,endAngle, anticlockwise);
         * This method takes five arguments:
         * x and y are the coordinates of the circle's center.
         * r - radius 
         * the 'startAngle' and 'endAngle' parameters define the start
         * and end points of the arc in radians.
         * the 'anticlockwise' is Boolean value, which when true draws the arc anticlockwise
         * otherwise in a clockwise direction.
         *  
         * @param x (number) right x-coordonate
         * @param y (number) right y-coordonate
         * @return none. update canvas with these positions.
         * @private
         */
        _on: function(x,y) {
                 this.context.beginPath();
                 this.context.fillStyle = "rgb(10,150,10)";
                 this.context.arc(x, y, 25, 0, Math.PI*2, true); 
                 this.context.fill();
                 this.context.closePath();
        }.protect(),

        /* 
         * Set bit OFF at position (x,y) 
         * For drawing circles we use the 'arc' method
         * ctx.arc(x,y,radius,startAngle,endAngle, anticlockwise);
         * This method takes five arguments:
         * x and y are the coordinates of the circle's center.
         * r - radius 
         * the 'startAngle' and 'endAngle' parameters define the start
         * and end points of the arc in radians.
         * the 'anticlockwise' is Boolean value, which when true draws the arc anticlockwise
         * otherwise in a clockwise direction.
         * @param x (number) right x-coordonate
         * @param y (number) right y-coordonate
         * @return none. update canvas with these positions.
         * @private
         */
        _off: function(x,y) {
                 this.context.beginPath();
                 this.context.strokeStyle = "rgb(10,150,10)";
                 this.context.arc(x,y,25,0,Math.PI*2,true); 
                 this.context.stroke();
                 this.context.closePath();
        }.protect()

});//end class BinaryClock

