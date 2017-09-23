/** Made by kurwa Kerai
 * chcesz rozpowszechniac? podawaj źródło
 * chcesz cos zmieniac? wszystkie komentarze pisz
 * w komentarzach wieloliniowych, bo sie moze popsuc pod chrome i opera... */

var whitespace = "-\/|.,!:;'\" \t\n\r{}[]()";
var stack = [];
var curNIndex = 0;
var curNode = null;
var curIndex = -1;
var state = 1;
var lastword = '';
String.prototype.startsWith = function (prefix) {
    return this.indexOf(prefix) === 0;
};
String.prototype.endsWith = function (suffix) {
    return this.match(suffix + "$") == suffix;
};

/* Nie moge tak robić niestety */
function kurwizeLink(url) {
    if (url.startsWith('javascript:')) return url;
    /* chyba niewiele moge zrobic kurwa */
    if (url.startsWith('#')) return url;
    if (url.startsWith('http://kurwa.keraj.net/?url=')) return url;
    /* no, bo kurwa, bez jaj ;p */
    var base = '';
    if (!url.startsWith('http')) {
        base = location.protocol + "://" + location.host;
        if (!url.startsWith('/')) {
            var pathname = location.pathname;
            base += pathname.substring(0, pathname.lastIndexOf('/'));
        }
    }
    return 'http://kurwa.keraj.net/?url=' + base + url;
};

function nextLetter() {
    if (curNode == null) return null;
    if (curIndex >= curNode.data.length) {
        curNode = stack[++curNIndex];
        curIndex = -1;
        if (curNode == null) return null;
    }
    curIndex++;
    if (curIndex >= curNode.data.length) {
        return ' ';
    }
    return curNode.data[curIndex];
};

function nextAfterWord() {/* lastword = ''; */
    /* szukamy poczatku kurwa wyrazu */
    dupa:while (true) {
        do {
            var let = nextLetter();
            if (let == null) return false;
        } while (whitespace.indexOf(let) != -1);
        if (state == 1) {/* byliszmy na poczatku, teraz kurwa bedziemy szukac konca wyrazu */
            state = 2;
            return true;
        }
        ;state = 3;
        var starting = curIndex;
        do {
            var let = nextLetter();
            if (let == null) return false;
            if (state == 1) continue dupa;
        } while (whitespace.indexOf(let) == -1);
        /* ostatni wyraz, moze sie kurwa przydac pozniej zeby nasz algorytm byl bardziej inteligentny */
        /* trza to jeszcze kurwa usprawnic */
        lastword = curNode.data.substr(starting, curIndex - starting).toLowerCase();
        return true;
    }
};

function putHere(text) {
    if (curNode == null) return;
    /** oj, trzeba to kurwa fixnąć kiedyś */
    curNode.data = curNode.data.substr(0, curIndex) + (state != 2 ? ' ' : '') + text + (state == 2 ? ' ' : '') + curNode.data.substr(curIndex);
    curIndex += text.length + 2;
};

function replaceLast(text) {
    var s2 = curNode.data.substr(curIndex);
    curIndex -= lastword.length;
    var s1 = curNode.data.substr(0, curIndex);
    curIndex += text.length;
    curNode.data = s1 + text + s2;
}

/** rekurencyjnie szukamy tylko tekstu kurwa */
function przelec(node) {
    if (typeof node != "object" || typeof node.childNodes != "object") return;
    var children = node.childNodes;
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        /* nie IFRAME, bo sie moze kurwa crashn%C4%85%C4%87, nie SCRIPT... wiadomo, nie PRE - bo to moze byc kurwa kod %C5%BAr%C3%B3d%C5%82owy... chocia%C5%BC mo%C5%BCe fajnie by by%C5%82o widzie%C4%87 co%C5%9B w stylu std:kurwa:cout */
        if (child.nodeType == 1 && child.tagName != "SCRIPT" && child.tagName != "IFRAME" /*&& child.tagName!="PRE"*/) {
            przelec(child);
        }
        ;
        if (child.nodeType == 3) {
            stack.push(child);
        }
        ;
        if (child.tagName == "A") { /* child.href=kurwizeLink(child.href+''); */
        };
    };
};
if ((typeof DONT_KURWA) === "undefined" || !DONT_KURWA) {
    przelec(document.body);
    curNode = stack[0];
    var i = Math.floor(Math.random() * 9);
    var forpe = window.location.href.indexOf("4programmers") > -1;
    /* a tak se sprawdzimy :D if(forpe){while(nextAfterWord()) {var word = 'Adam Boduch';var rnd = Math.random() * 5;if(rnd<1)word = "Adam";else if(rnd<2) word = "Boduch";else if(rnd<3)word = "klacze";replaceLast(word);}return;} */
    while (nextAfterWord()) {
        if (i-- <= 0) {
            if (lastword == 'na') continue;
            if (lastword == 'do') continue;
            if (lastword == 'jak') continue;
            if (forpe) {
                if (lastword == 'i') continue;
                if (lastword == 'o') continue;
                if (lastword == 'w') continue;
                if (lastword == 'z') continue;
                if (lastword == 'a') continue;
                if (lastword == 'u') continue;
                if (lastword == 'si%C4%99') continue;
                if (lastword.startsWith('niekt')) continue;
                if (lastword.startsWith('r%C3%B3%C5%BCn')) continue;
                if (lastword == 'boduch') {
                    replaceLast('( %CD%A1%C2%B0 %CD%9C%CA%96 %CD%A1%C2%B0)');
                } else {
                    replaceLast('Adam Boduch');
                }
            } else {
                if (lastword == 'nie') continue;
                if (lastword == 'kurwa') continue;
                putHere('kurwa');
            }
            var i = 2 + Math.floor(Math.random() * 8);
        }
        ;
    }
    ;
} else {
    alert("Ta strona nie lubi być wulgaryzowana :(");
}