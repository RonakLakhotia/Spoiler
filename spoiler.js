
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
}
