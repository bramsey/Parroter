var bodyText = document.body.innerText;

chrome.extension.sendRequest({bodyText: bodyText}, function(response) {});
