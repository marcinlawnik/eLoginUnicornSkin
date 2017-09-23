//Inject snow script
var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/snow.js');
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);


//Replace PP logo
//top-menu-bar-left-column
//big one
var big_src = chrome.extension.getURL('/images/modified/put_logo_text.png');
//small one
var small_src = chrome.extension.getURL('/images/modified/put_logo.png');
window.onload = function () {
    document.querySelector(".top-menu-bar-left-column a .hide-on-small-screen").src=big_src;
    document.querySelector(".top-menu-bar-left-column a .show-on-small-screen").src=small_src;
};

//Inject kurwa script
var s = document.createElement('script');
s.src = chrome.extension.getURL('/js/kurwa.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);