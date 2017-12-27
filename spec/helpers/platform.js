// return all of the global variables
function globals() { return this; }
function varsList() {
  return Object.getOwnPropertyNames(globals());
}

function isBrowser() {
  return (typeof document !== 'undefined' && typeof window !== 'undefined');
}

function inBrowser(func) {
  if (isBrowser()) {
    func();
  }
}
function inNode(func) {
  if (!isBrowser()) {
    func();
  }
}

// define as global in node
if (typeof global !== 'undefined') {
  global.inNode = inNode;
  global.inBrowser = inBrowser;
  global.isBrowser = isBrowser;
}
// Note: jasmine global exists

//console.log(varsList());
