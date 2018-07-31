
var spoilerItemsList = {};
var listOfItems = document.getElementById("list");
// chrome.storage.sync.get("spoiler", function(res) {
// 	spoilerItemsList = res;
	if (spoilerItemsList['spoiler'] == null) {
		spoilerItemsList = {
			'spoiler': [] //initialize spoilerItemsList object
		};
//		saveSpoilerList();
	}
// });

saveSpoilerList = function() {
	chrome.storage.sync.set({
		'spoiler': spoilerItemsList['spoiler']
	}, function(result) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error);
		}
	});
}

window.onload = runOnPageLoad;

function runOnPageLoad() {
	updateList();
	//searchPageForSpoilers();

	document.addEventListener('click', function(event) {
		var itemClicked = event.target;
		if (itemClicked.className === 'spoilerListItem') {
			itemClicked.parentNode.parentNode.removeChild(itemClicked.parentNode);
			spoilerItemsList['spoiler'].splice(spoilerItemsList['spoiler'].indexOf(itemClicked.text), 1);
		}
	});
	var submitButton = document.getElementById("enter");
	var input = document.getElementById("blocker");
	var clearButton = document.getElementById("clear-button");

	clearButton.addEventListener("click", clearList);
	submitButton.addEventListener("click", getSpoilerText);
	input.addEventListener("keypress", getSpoilerTextAfterKeyPress);

	function runPageSearch() {
		//saveSpoilerList();
		input.value = '';
		updateList();
		//searchPageForSpoilers();
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
		spoilerItemsList = {
			'spoiler': []
		};console.log('works');
		runPageSearch();
	}
	function createElement() {
		spoilerItemsList['spoiler'].push(input.value);
		console.log(spoilerItemsList);
		runPageSearch();
	}
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

function saveSpoilerList() {
	chrome.storage.sync.set({
		'spoiler': spoilerItemsList['spoiler']
	}, function(result) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error);
		}
	});
}



