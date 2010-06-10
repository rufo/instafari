var keyboard_shortcut;

function getSettings(event) {
  if (event.name === "keyboard_shortcut") {
    keyboard_shortcut = event.message;
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

safari.self.addEventListener("message", getSettings, false);
safari.self.tab.dispatchMessage("getSettings", "keyboard_shortcut");