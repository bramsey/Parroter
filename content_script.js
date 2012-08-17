// This job of this script is to get the current site privacy policy's text
// and send it to the background script for analysis.

var bodyText = document.body.innerText;

chrome.extension.sendMessage({bodyText: bodyText}, function(response) {
    console.log(response);
});
