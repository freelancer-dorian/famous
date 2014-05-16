/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');


    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var Surface = require('famous/core/Surface');
    var GridLayout = require('famous/views/GridLayout');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var logo = new ImageSurface({
        size: [200, 200],
        content: '/content/images/famous_logo.png',
        classes: ['backfaceVisibility']
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        transform : function() {
            return Transform.rotateY(.002 * (Date.now() - initialTime));
        }
    });

    // mainContext.add(centerSpinModifier).add(logo);
    var grid = new GridLayout({
        dimensions : [4, 2]
    });

    var surfaces = [];
    grid.sequenceFrom(surfaces);

    for(var i = 0; i < 8; i++) {
        surfaces.push(new Surface({
            content : "panel " + (i + 1),
            size : [undefined, undefined],
            properties : {
                backgroundColor : "hsl(" + (i * 360/8) + ", 100%, 50%",
                color : "#404040",
                lineHeight : "200px",
                textAlign : "center"
            }
        }));
    }

    mainContext.add(grid);
});
