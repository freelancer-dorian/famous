define(function(require, exports, module){

	// import other modules
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Transform = require('famous/core/Transform');
	var SlideshowView = require('views/SlideshowView');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
	var ImageSurface = require('famous/surfaces/ImageSurface');

	// constructor
	function AppView() {
		View.apply(this,arguments);

		_createCamera.call(this);
		_createSlideshow.call(this);
	}

	// super class
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;

	// default options
	AppView.DEFAULT_OPTIONS = {
		cameraWidth : window.innerHeight * 0.5,
		data : undefined
	}

	AppView.DEFAULT_OPTIONS.slideWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth;
	AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
	AppView.DEFAULT_OPTIONS.slidePosition = 0.77 * AppView.DEFAULT_OPTIONS.cameraWidth;



	// customize some IF here

	function _createCamera() {
		var camera = new ImageSurface({
			size : [this.options.cameraWidth,true],
			content : 'src/img/camera.png',
			properties : {
				width : '100%'
			}
		});

		var cameraModifer = new StateModifier({
			origin : [0.5, 0],
			align : [0.5, 0],
			transform : Transform.behind
		});

		this.add(cameraModifer).add(camera);
	}

	function _createSlideshow() {

		var slideshow = new SlideshowView({
			size : [this.options.slideWidth, this.options.slideHeight],	
			data : this.options.data
		});

		var slideshowModifier = new StateModifier({
			origin : [0.5, 0],
			align : [0.5, 0],
			transform : Transform.translate(0, this.options.slidePosition, 0)
		});

		var slideshowContainer = new ContainerSurface({
			properties : {
				overflow : 'hidden'
			}
		});

		this.add(slideshowModifier).add(slideshowContainer);
		slideshowContainer.add(slideshow);
		slideshowContainer.context.setPerspective(1000);
	}

	module.exports = AppView;

});

