/*** AppView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var SlidesshowView = require('views/SlidesshowView');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');

    // Constructor function for our AppView class
    function AppView() {

        // Applies View's constructor function to AppView class
        View.apply(this, arguments);
        _createCamera.call(this);
        _createSlideshow.call(this);
    }

    // Establishes prototype chain for AppView class to inherit from View
    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    // Default options for AppView class
    AppView.DEFAULT_OPTIONS = {
        size: [450, 500],
        data: undefined,
        lightboxOpts: {},
        cameraWidth : window.innerHeight * 0.5
    };
    
    AppView.DEFAULT_OPTIONS.slideWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth;
    AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
    AppView.DEFAULT_OPTIONS.slidePosition = 0.77 * AppView.DEFAULT_OPTIONS.cameraWidth;


    function _createCamera() {
        var camera = new ImageSurface({
            size : [this.options.cameraWidth, true],
            content : 'src/img/camera.png',
            properties : {
                width : '100%'
            }
        });

        var cameraModifier = new StateModifier({
            origin : [0.5, 0],
            align : [0.5, 0],
            transform : Transform.behind
        });

        this.add(cameraModifier).add(camera);

    }

    function _createSlideshow() {
        var slideshowView = new SlidesshowView({
            size: [this.options.slideWidth, this.options.slideHeight],
            data: this.options.data
        });

        var slideshowModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.slidePosition, 0)
        });
        
        var container = new ContainerSurface({
            properties : {
                overflow : 'hidden'
            }
        });

        this.add(slideshowModifier).add(slideshowView);
        container.add(slideshowView);
    }

    // Define your helper functions and prototype methods here
    module.exports = AppView;
});
