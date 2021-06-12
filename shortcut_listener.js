// See https://developer.chrome.com/docs/extensions/reference/tabGroups/

chrome.commands.onCommand.addListener(function(command) {
  switch (command) {

    // Open new tab in current tab group
    case "new-tab-in-current-group":
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(currentTabs) {
        var currentTab = currentTabs[0];
        chrome.tabs.create({
          index: currentTab.index + 1
        }, function(newTab) {
          chrome.tabs.group({
            tabIds: newTab.id,
            groupId: currentTab.groupId
          });
        });
      });
      break;

    // Create new group for current tab
    case "new-group-for-current-tab":
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(currentTabs) {
        var currentTab = currentTabs[0];
        chrome.tabs.group({
          tabIds: currentTab.id
        });
      });
      break;

    // Try getting here
    default:
      console.error("No can do.")
  }
});
