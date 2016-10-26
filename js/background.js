
chrome.contextMenus.create({
    "title": "Browse history",
    "contexts": [ "page","selection", "link"],
    "onclick" : mycallback
  });




  function mycallback(info, tab) {
    console.log(info);
    console.log(tab);
      chrome.tabs.sendMessage(tab.id, info.selectionText, function(clickedEl) {

      });
  }
