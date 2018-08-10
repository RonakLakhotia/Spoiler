var spoilerItemsList ;
var listOfItems = document.getElementById("list");
var REMOVE_SPOILER_ITEM_MESSAGE = 'remove';

   chrome.storage.sync.get("spoiler", function (results) {
    spoilerItemsList = results;
    updateList();	
    if (spoilerItemsList['spoiler'] == null) {
        spoilerItemsList = {
            'spoiler': []
        };
        save();
    }
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
	document.addEventListener('click', function(event) {
		var itemClicked = event.target;
		if (itemClicked.className === 'spoilerListItem') {
			itemClicked.parentNode.parentNode.removeChild(itemClicked.parentNode);
			spoilerItemsList['spoiler'].splice(spoilerItemsList['spoiler'].indexOf(itemClicked.text), 1);
		    searchPageForSpoilers(REMOVE_SPOILER_ITEM_MESSAGE);
		}
	});

	var submitButton = document.getElementById("enter");
	var input = document.getElementById("blocker");
	var clearButton = document.getElementById("clear-button");

	clearButton.addEventListener("click", clearList);
	submitButton.addEventListener("click", getSpoilerText);
	input.addEventListener("keypress", getSpoilerTextAfterKeyPress);

	function runPageSearch(type) {
		save();
		input.value = '';
		updateList();	
		searchPageForSpoilers(type);
	}

	function getSpoilerText() {
		if (input.value.length > 0) {
			createElement();
		}
	}

	function getSpoilerTextAfterKeyPress(event) {
		if (input.value.length > 0 && event.keyCode === 13) {
			createElement();
		}
	}

	function clearList() {
		let CLEAR = "clear";
		spoilerItemsList = {
			'spoiler': []
		};
		runPageSearch(CLEAR);
	}

	function createElement() {
		spoilerItemsList['spoiler'].push(input.value);
		runPageSearch(input.value);
	}

	function updateList() {
	if (spoilerItemsList['spoiler'] != null) {
		listOfItems.innerHTML = "";
		var html = "<ul>";
		for (let i = 0; i < spoilerItemsList['spoiler'].length; i++) {
			html += '<li><a class="spoilerListItem" href="#">' + spoilerItemsList['spoiler'][i] + '</a></li>';
		}
		html += "</ul>";
		listOfItems.innerHTML = html;
	}
}
	function searchPageForSpoilers(type) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: type}, function(response) {});  
		});
	}
