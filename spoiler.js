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