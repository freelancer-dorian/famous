/*** SlidesshowView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var SlideView = require('views/SlideView');
    var Lightbox = require('famous/views/Lightbox');
    var Easing = require('famous/transitions/Easing');
    
    // Constructor function for our SlidesshowView class
    function SlidesshowView() {

        // Applies View's constructor function to SlidesshowView class
        View.apply(this, arguments);
        this.rootModifier = new StateModifier({
            size : this.options.size,
            origin : [0.5, 0],
            align : [0.5, 0]
        });

        this.mainNode = this.add(this.rootModifier);

        _createLightbox.call(this);
        _createSlideView.call(this);
    }

    // Establishes prototype chain for SlidesshowView class to inherit from View
    SlidesshowView.prototype = Object.create(View.prototype);
    SlidesshowView.prototype.constructor = SlidesshowView;

    // Default options for SlidesshowView class
    SlidesshowView.DEFAULT_OPTIONS = {
        size : [450, 500],
        lightboxOpts: {
            inOpacity: 1,
            outOpacity: 0,
            inOrigin: [0, 0],
            outOrigin: [0, 0],
            showOrigin: [0, 0],
            inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, -300]),
            outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]),
            inTransition: { duration: 650, curve: 'easeOut' },
            outTransition: { duration: 500, curve: Easing.inCubic }
        }

    };

    // Define your helper functions and prototype methods here
    function _createSlideView() {
        this.slides = [];
        this.currentIndex = 0;

        for (var i = 0; i < this.options.data.length; i++) {
            var slide = new SlideView({
                size : this.options.size,
                photoUrl : this.options.data[i]
            });
            this.slides.push(slide);

            slide.on('click', this.showNextSlide.bind(this));
        }

        this.showCurrentSlide();
        
    };

    SlidesshowView.prototype.showCurrentSlide = function() {
        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide);
    }

    SlidesshowView.prototype.showNextSlide = function() {
        this.currentIndex++;
        if (this.currentIndex === this.slides.length) {
            this.currentIndex = 0;
        }
        this.showCurrentSlide();
    }

    function _createLightbox() {
        this.lightbox = new Lightbox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }

    module.exports = SlidesshowView;
});
