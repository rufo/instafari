document.addEventListener('keydown', function(event){
  if (event.metaKey && event.altKey && (event.keyCode == 82)) {
    safari.self.tab.dispatchMessage("readlater");
  } else {
    return false;
  }
}, false);
