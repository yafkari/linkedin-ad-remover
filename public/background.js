chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        if (tabId !== -1) {
            chrome.storage.local.get(['linkedin-remove-promoted'], function (result) {
                if (result['linkedin-remove-promoted'] == true) {
                    chrome.scripting.executeScript({
                        target: { tabId },
                        files: ['content_script.js'],
                    });
                }
            });
        }
    }
});
