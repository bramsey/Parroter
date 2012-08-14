function onRequest(request, sender, sendResponse) {
    var tabID = sender.tab.id;

    // regular expression test is simply a placeholder for classification.
    if (/privacy/.test(request.bodyText)) {
        chrome.pageAction.setIcon({path: "green.png", tabId: tabID});
        chrome.pageAction.setTitle({title: "This site can't sell your info.", 
                tabId: tabID});
    } else {
        chrome.pageAction.setIcon({path: "red.png", tabId: tabID});
        chrome.pageAction.setTitle({title: "This site can sell your info :(",
                tabId: tabID});
    }

    chrome.pageAction.show(tabID);

    // Return nothing to let the connection be cleaned up.
    sendResponse({});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onRequest.addListener(onRequest);
