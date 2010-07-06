var keyboard_shortcut;

function messageHandler(event) {
  if (event.name === "keyboard_shortcut") {
    keyboard_shortcut = event.message;
  } else if (event.name === "get_selection") {
    safari.self.tab.dispatchMessage("returnSelection", window.getSelection().toString());
  }
}

document.addEventListener('keydown', function(event){
  var sendMessage = false;
  
  var tag = event.target.tagName;
  if (tag === 'TEXTAREA' || tag === 'INPUT' || tag === 'SELECT') {
    return;
  }
    
  if (keyboard_shortcut === "mac") {
    if (event.metaKey && event.altKey && (event.keyCode == 82)) {
      sendMessage = true;
    }
  } else if (keyboard_shortcut === "windows") {
    if (event.ctrlKey && event.altKey && (event.keyCode == 82)) {
      sendMessage = true;
    }
  }
  
  if (sendMessage) {
     safari.self.tab.dispatchMessage("readlater");
     event.stopPropagation();
     event.preventDefault();
     return true;
  }
}, false);

safari.self.addEventListener("message", messageHandler, false);
safari.self.tab.dispatchMessage("getSettings", "keyboard_shortcut");