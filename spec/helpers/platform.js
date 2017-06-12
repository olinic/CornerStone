// print all of the globals
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

console.log("hello bacon")

// define as global in node
if (typeof global !== 'undefined') {
  global.inNode = inNode;
  global.inBrowser = inBrowser;
}
// Note: jasmine global exists

//console.log(varsList());
