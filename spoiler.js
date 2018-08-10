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
}

function searchForSpoilers() {

	var nodes = document.getElementsByClassName('userContentWrapper');

		// for (let j = 0; j < spoilerItemsList['spoiler'].length; j++) {
		// 	for (let i = 0, n = nodes.length; i < n; i++) {
		// 		let itemText = nodes[i] ? nodes[i].textContent.toLowerCase() : "";
		// 		if (nodes[i].style.filter === "blur(5px)" && itemText)
		// 	}
		// }

		for (let j = 0; j < spoilerItemsList['spoiler'].length; j++) {
			for (let i = 0, n = nodes.length; i < n; i++) {
				let searchItem = spoilerItemsList['spoiler'][j];
				let itemText = nodes[i] ? nodes[i].textContent.toLowerCase() : "";
				if (RegExp('\\b' + searchItem + '\\b', 'i').test(itemText)) {
					nodes[i].style.filter = "blur(5px)";
				}
			}
		}
	}
