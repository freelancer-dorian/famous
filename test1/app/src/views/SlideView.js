define(function(require, exports, module){

	// import other modules
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Transform = require('famous/core/Transform');
	var SlideData = require('data/SlideData')
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Transitionable = require('famous/transitions/Transitionable');
	var SpringTransition = require('famous/transitions/SpringTransition');

	Transitionable.registerMethod('spring', SpringTransition);


	// constructor
	function SlideView() {
		View.apply(this,arguments);

		this.rootModifier = new StateModifier({
			size : this.options.size
		});

		this.mainNode = this.add(this.rootModifier);

		_createBackground.call(this);
		_createFilm.call(this);
		_createPhoto.call(this);
	}

	// super class
	SlideView.prototype = Object.create(View.prototype);
	SlideView.prototype.constructor = SlideView;

	// default options
	SlideView.DEFAULT_OPTIONS = {
		size : [400, 450],
		filmBorder : 15,
		photoBorder : 3,
		data : undefined,
		// photoUrl : SlideData.defaultImage,
		angle : -0.2,

	}

	SlideView.prototype.fadeIn = function() {
		this.photoModifier.setOpacity(1, {duration : 1000, curve : 'easeIn'});
		this.shake();
	}

	SlideView.prototype.shake = function() {
		this.rootModifier.halt();

		this.rootModifier.setTransform(
			Transform.rotateX(this.options.angle),
			{duration : 200, curce : 'easeOut'}
		);

		this.rootModifier.setTransform(Transform.identity, {
			method : 'spring', period : 600, dampingRatio : 0.15
		});
	}

	// customize some IF here
	function _createBackground() {
		var background = new Surface({
			properties : {
				backgroundColor : '#FFFFF5',
				boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
				cursor : 'pointer'
			}
		});

		background.on('click', function() {
			this._eventOutput.emit('click');
		}.bind(this));

		this.mainNode.add(background);
	}

	function _createFilm() {
		this.filmSize = this.options.size[0] - 2 * this.options.filmBorder;

		var film = new Surface({
			size : [this.filmSize, this.filmSize],
			properties : {
				backgroundColor : '#222',
				zIndex : 1,
				pointerEvents : 'none'
			}
		});

		var filmModifier = new StateModifier({
			align : [0.5, 0],
			origin : [0.5, 0],
			transform : Transform.translate(0, this.options.filmBorder)
		});

		this.mainNode.add(filmModifier).add(film);

	}

	function _createPhoto() {
		var photoSize = this.filmSize - 2 * this.options.photoBorder;

		var photo = new ImageSurface({
			size : [photoSize, photoSize],
			content : this.options.photoUrl,
			properties : {
				zIndex : 2,
				pointerEvents : 'none'
			}
		});

		this.photoModifier = new StateModifier({
			align : [0.5, 0],
			origin : [0.5, 0],
			transform : Transform.translate(0, this.options.filmBorder + this.options.photoBorder),
			opacity : 0.01
		});

		this.mainNode.add(this.photoModifier).add(photo);
	}

	module.exports = SlideView;

});