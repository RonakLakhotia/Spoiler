var spoilerItemsList ;
var text;
var CLEAR_MESSAGE = 'clear';
var REMOVE_ITEM_MESSAGE = 'remove';

chrome.storage.sync.get("spoiler", function (results) {
    spoilerItemsList = results;
    if (spoilerItemsList['spoiler'] == null) {
        spoilerItemsList = {
            'spoiler': []
        };
        save();
    }
});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

  	text = msg.action;
	if (text === CLEAR_MESSAGE) {
	spoilerItemsList = {
		'spoiler': [] //initialize spoilerItemsList object
	};
	save();
	} else if (text === REMOVE_ITEM_MESSAGE) {
	spoilerItemsList['spoiler'].splice(spoilerItemsList['spoiler'].indexOf(text), 1);
	} else {
   spoilerItemsList['spoiler'].push(text);
  	}
   save();
   searchForSpoilers();
});
   function save() {
   		chrome.storage.sync.set({
		'spoiler': spoilerItemsList['spoiler']
	}, function(result) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error);
		}
	}); 
	alert(spoilerItemsList['spoiler']);
}
	
	function searchForSpoilers() {
		console.log(document);
	}
