var spoilerItemsList ;
var text;
var CLEAR_MESSAGE = 'clear';
var REMOVE_ITEM_MESSAGE = 'remove';
var SEARCH_PAGE_MESSAGE = 'search';
var firstItem = true;

chrome.storage.sync.get("spoiler", function (results) {
    spoilerItemsList = results;
    if (spoilerItemsList['spoiler'] == null) {
        spoilerItemsList = {
            'spoiler': []
        };
        save();
    }
});

window.onload = setUpObserver();

function setUpObserver() {
	console.log('here2');
   	var observer = new MutationObserver(function (mutations, observer) {
    // fired when a mutation occurs
    console.log('here also');
    mutations.forEach(function(mutation) {
        searchForSpoilers();
    });

 });
    observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
    });

}

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {

	// if (firstItem) {
	// 	setUpObserver();
	// }
	// firstItem = false;
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
