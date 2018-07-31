
 var spoilerItemsList = {};

// chrome.storage.sync.get("spoiler", function(res) {
// 	spoilerItemsList = res;
// 	if (spoilerItemsList['spoiler'] == null) {
// 		spoilerItemsList = {
// 			'spoiler': [] //initialize spoilerItemsList object
// 		};
// 		saveSpoilerList();
// 	}
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
	console.log('works');
	//updateList();
	//searchPageForSpoilers();
	var submitButton = document.getElementById("enter");
	var input = document.getElementById("blocker");
	var clearButton = document.getElementById("clear-button");
	clearButton.addEventListener("click", clearList);
	submitButton.addEventListener("click", getSpoilerText);
	input.addEventListener("keypress", getSpoilerTextAfterKeyPress);

	function runPageSearch() {
		//saveSpoilerList();
		input.value = '';
		//updateList();
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
		};
		runPageSearch();
	}
	function createElement() {
		console.log(input.value);
		spoilerItemsList.push(input.value);
		runPageSearch();
	}
}
