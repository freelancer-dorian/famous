/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var EventHandler = require('famous/core/EventHandler');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var Surface = require('famous/core/Surface');
    var GridLayout = require('famous/views/GridLayout');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');
    var View = require('famous/core/View');


    Transitionable.registerMethod('spring',SpringTransition);



/****************************************/
// origin code

    // // create the main context
    // var mainContext = Engine.createContext();

    // // your app here
    // var logo = new ImageSurface({
    //     size: [200, 200],
    //     content: '/content/images/famous_logo.png',
    //     classes: ['backfaceVisibility']
    // });

    // var initialTime = Date.now();
    // var centerSpinModifier = new Modifier({
    //     origin: [0.5, 0.5],
    //     transform : function() {
    //         return Transform.rotateY(.002 * (Date.now() - initialTime));
    //     }
    // });
    // mainContext.add(centerSpinModifier).add(logo);
/****************************************/





/****************************************/
    
    // Exercise of surface, transition, positioning surface

    // var grid = new GridLayout({
    //     dimensions : [4, 2]
    // });

    // var surfaces = [];
    // grid.sequenceFrom(surfaces);

    // for(var i = 0; i < 8; i++) {
    //     surfaces.push(new Surface({
    //         content : "panel " + (i + 1),
    //         size : [undefined, undefined],
    //         properties : {
    //             backgroundColor : "hsl(" + (i * 360/8) + ", 100%, 50%",
    //             color : "#404040",
    //             lineHeight : "200px",
    //             textAlign : "center"
    //         }
    //     }));
    // }

    // mainContext.add(grid);

    // var firstSurface = new Surface({
    //     size:[100, 100],
    //     content: 'modified surface',
    //     properties: {
    //         color: 'white',
    //         textAlign: 'center',
    //         backgroundColor: '#FA5C4F'
    //     }
    // });


    // // = new StateModifier({
    // //     transform: Transform.translate(150, 100,0)
    // //     { duration : 1000, curve: 'easeInOut' }
    // // });

    // // var rotateMod = new StateModifier({
    // //     transform: Transform.rotateZ(Math.PI/4)
    // // });

    // // var modifier = new StateModifier({
    // //     align: [0.5, 0.5],
    // //     origin: [0.5, 0.5]
    // // })
    
    // var state = new StateModifier();
    // // {
    // //     transform : Transform.translate(150, 100, 0)
    // // });


    // var rotate = new StateModifier({
    //     transform : Transform.rotateZ(Math.PI/5)
    // });

    // mainContext.add(state).add(firstSurface);
    
    // // state.setTransform(
    // //   Transform.translate(100, 300, 0),
    // //   { duration : 1000, curve: Easing.inOutBack }
    // // );

    // var spring = {
    //     method : 'spring',
    //     duration : 2000,
    //     dampingRatio : 0.3
    // };

    // state.setTransform(
    //     Transform.translate(0,450,0), spring);

    // firstSurface.on('click', function() {
    //     state.halt();
    //     firstSurface.setContent('halted');
    //     state.setTransform(
    //         Transform.translate(0, 600, 0),
    //         {duration : 1000, curve : Easing.outBounce}
    //     );
    // });
/****************************************/

/****************************************/
// start of event

    // var mainContext = Engine.createContext();
    // var eventHA = new EventHandler();
    // var eventHB = new EventHandler();


    // var _surface = new Surface({
    //     content : "Using to test Event",
    //     size : [200, 200],
    //     properties : {
    //         backgroundColor : 'gray',
    //         color : 'white',
    //         textAlign : 'center'
    //     }

    // });

    // var secSurface = new Surface({
    //     content : "waiting",
    //     size : [200, 200],
    //     properties : {
    //         backgroundColor : 'gray',
    //         color : 'white',
    //         textAlign : 'center'
    //     }
    // });

    // var position = new StateModifier({
    //     origin : [1,1],
    //     align : [1,1]
    // });

    // mainContext.add(position).add(secSurface);



    // mainContext.add(_surface);

    // _surface.on('click',function(){
    // //     _surface.setContent('Clicked');
    // //     _surface.setProperties({
    // //         backgroundColor : 'red',
    // //     });
    // //     _surface.setSize([100, 100]);
    //     eventHA.emit('hello');

    // });

    // eventHB.subscribe(eventHA);

    // eventHB.on('hello', function() {
    //     secSurface.setContent('heared');
    // });

    // Engine.on('keydown', function(e){
    //     _surface.setContent(e.which);
    // });

    // var thirdSur = new Surface({
    //     content : "test for View Event",
    //     size : [150, 150],
    //     properties : {
    //         backgroundColor : "green",

    //     }
    // })

    // var thirdState = new StateModifier({
    //     origin : [0.5, 0.5],
    //     align : [0.5, 0.5]
    // });

    // mainContext.add(thirdState).add(thirdSur);

    // var view = new View();
    // thirdSur.pipe(view);

    // view._eventInput.on('click', function(){
    //     view._eventOutput.emit('hello');
    // });

    // view.on('hello', function(){
    //     thirdSur.setContent("hello");
    // });
// end of event
/****************************************/

    var mainContext = Engine.createContext();

    var layout;

    createLayout();
    addHeader();
    addFooter();
    addContent();


    function createLayout() {
        layout = new HeaderFooterLayout({
            headerSize : 100,
            footerSize : 50,
        });

        mainContext.add(layout);
    };

    function addHeader() {
        layout.header.add(new Surface({
            content: "Header",
            properties: {
              lineHeight: "100px",
              backgroundColor : "gray",
              textAlign: "center"
            }
        }));
    };

    function addFooter() {
        layout.footer.add(new Surface({
            content: "Footer",
            properties: {
              lineHeight: "50px",
              backgroundColor : "gray",
              textAlign: "center"
            }
        }));
    };

    function addContent() {
        layout.content.add(createGrid());
    };

    function createGrid() {
        var grid = new GridLayout({
          dimensions: [4, 8]
        });

        var surfaces = [];
        grid.sequenceFrom(surfaces);

        for(var i = 0; i < 32; i++) {
          surfaces.push(new Surface({
            // content: "panel " + (i + 1),
            size: [undefined, undefined],
            properties: {
              backgroundColor: "hsl(" + (i * 360 / 32) + ", 100%, 50%)",
              color: "#404040",
              textAlign: 'center'
            }
          }));
        }

        return grid;
    }
});



