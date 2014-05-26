define(function(require, module, exports){

	// import other modules
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Transform = require('famous/core/Transform');

	// constructor
	function EmptyView() {
		View.apply(this,arguments);
	}

	// super class
	EmptyView.prototype = Object.create(View.prototype);
	EmptyView.prototype.constructor = EmptyView;

	// default options
	EmptyView.DEFAULT_OPTIONS = {}

	// customize some IF here


	module.exports = EmptyView;

});