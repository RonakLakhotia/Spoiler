var spoilerItemsList ;
var text;
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
	if (spoilerItemsList['spoiler'] == null) {
	spoilerItemsList = {
		'spoiler': [] //initialize spoilerItemsList object
	};
	save();
}
  if (text === 'clear') {
	spoilerItemsList = {
		'spoiler': []
	};
  } else {
   spoilerItemsList['spoiler'].push(text);
   console.log(text);
  }
   save();
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
