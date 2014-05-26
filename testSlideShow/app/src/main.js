define(function(require, exports, module) {
	var Engine  = require('famous/core/Engine');
	var Views = require('views/AppView');
	var SlideData = require('data/SlideData');
	var Utility = require('famous/utilities/Utility');


	var mainContext = Engine.createContext();

	Utility.loadURL(SlideData.getUrl(),initApp);

	function initApp(data) {
		data = SlideData.parse(data);
		var appView = new Views({data : data});
		mainContext.add(appView);
		// mainContext.setPerspetive(1000);
	}

});