
var spoilerItemsList;

chrome.storage.sync.get("spoiler", function(res) {
	spoilerItemsList = res;
	if (spoilerItemsList['spoiler'] == null) {
		spoilerItemsList = {
			'spoiler': [] //initialize spoilerItemsList object
		};
		saveSpoilerList();
	}
});

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
	updateList();
	searchPageForSpoilers();
	var submitButton = document.getElementById("Submit_button");
	var input = document.getElementById("blocker");
	submitButton.addEventListener("click", getSpoilerText);

	function getSpoilerText(event) {
		if (input.value.length > 0 && event.keyCode === 13) {
			createElement();
		}
	}
	function createElement() {
		spoilerItemsList.push(input.value);
		saveSpoilerList();
		input.value = '';
		updateList();
		searchPageForSpoilers();
	}
}
