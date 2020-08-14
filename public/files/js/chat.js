window.onbeforeunload = function() { return false; }

var obfuscators = [];
var styleMap = {
    '§0': 'color:#000000',
    '§1': 'color:#0000AA',
    '§2': 'color:#00AA00',
    '§3': 'color:#00AAAA',
    '§4': 'color:#AA0000',
    '§5': 'color:#AA00AA',
    '§6': 'color:#FFAA00',
    '§7': 'color:#AAAAAA',
    '§8': 'color:#555555',
    '§9': 'color:#5555FF',
    '§a': 'color:#55FF55',
    '§b': 'color:#55FFFF',
    '§c': 'color:#FF5555',
    '§d': 'color:#FF55FF',
    '§e': 'color:#FFFF55',
    '§f': 'color:#FFFFFF',
    '§l': 'font-weight:bold',
    // '§m': 'text-decoration:line-through',
    '§n': 'text-decoration:underline',
    '§o': 'font-style:italic',
};


function obfuscate(string, elem) {
    // var magicSpan,
    //     currNode;
    // if (string.indexOf('<br>') > -1) {
    //     elem.innerHTML = string;
    //     for (var j = 0, len = elem.childNodes.length; j < len; j++) {
    //         currNode = elem.childNodes[j];
    //         if (currNode.nodeType === 3) {
    //             magicSpan = document.createElement('span');
    //             magicSpan.innerHTML = currNode.nodeValue;
    //             elem.replaceChild(magicSpan, currNode);
    //             init(magicSpan);
    //         }
    //     }
    // } else {
    //     init(elem, string);
    // }

    // function init(el, str) {
    //     var i = 0,
    //         obsStr = str || el.innerHTML,
    //         len = obsStr.length;
    //     obfuscators.push(window.setInterval(function() {
    //         if (i >= len) i = 0;
    //         obsStr = replaceRand(obsStr, i);
    //         el.innerHTML = obsStr;
    //         i++;
    //     }, 0));
    // }

    // function randInt(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    // function replaceRand(string, i) {
    //     var randChar = String.fromCharCode(randInt(64, 95));
    //     return string.substr(0, i) + randChar + string.substr(i + 1, string.length);
    // }
}

function applyCode(string, codes) {
    var elem = document.createElement('span'),
        obfuscated = false;
    string = string.replace(/\x00*/g, '');
    for (var i = 0, len = codes.length; i < len; i++) {
        elem.style.cssText += styleMap[codes[i]] + ';';
        if (codes[i] === '§k') {
            obfuscate(string, elem);
            obfuscated = false;
        }
    }
    if (!obfuscated) elem.innerHTML = string;
    return elem;
}

function parseStyle(string) {
    var codes = string.match(/§.{1}/g) || [],
        indexes = [],
        apply = [],
        tmpStr,
        deltaIndex,
        noCode,
        final = document.createDocumentFragment(),
        i;
    string = string.replace(/\n|\\n/g, '<br>');
    for (i = 0, len = codes.length; i < len; i++) {
        indexes.push(string.indexOf(codes[i]));
        string = string.replace(codes[i], '\x00\x00');
    }
    if (indexes[0] !== 0) {
        final.appendChild(applyCode(string.substring(0, indexes[0]), []));
    }
    for (i = 0; i < len; i++) {
        indexDelta = indexes[i + 1] - indexes[i];
        if (indexDelta === 2) {
            while (indexDelta === 2) {
                apply.push(codes[i]);
                i++;
                indexDelta = indexes[i + 1] - indexes[i];
            }
            apply.push(codes[i]);
        } else {
            apply.push(codes[i]);
        }
        if (apply.lastIndexOf('§r') > -1) {
            apply = apply.slice(apply.lastIndexOf('§r') + 1);
        }
        tmpStr = string.substring(indexes[i], indexes[i + 1]);
        final.appendChild(applyCode(tmpStr, apply));
    }
    return final;
}

function clearObfuscators() {
    var i = obfuscators.length;
    for (; i--;) {
        clearInterval(obfuscators[i]);
    }
    obfuscators = [];
}

function initParser(input, output) {
    clearObfuscators();
    var input,
        output = document.getElementById(output),
        parsed = parseStyle(input);
    output.innerHTML = '';
    return parsed;
}

function loginUser(username, password, serverIP, serverPort, serverVersion) {
    window.userData = {
        "username": username,
        "password": password,
        "serverIP": serverIP,
        "serverPort": serverPort,
        "serverVersion": serverVersion,
    }
}
var response = "";
var pingme = "";
var username = "";

function loadPings() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            response = this.responseText.toLowerCase().toString()
            pingme = response.split("\r\n")
        }
    };
    xhttp.open("GET", "/configuration/alert_list.txt", true);
    xhttp.send();

}

function loadUsername() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
            response = this.responseText.toString()
            array = response.split("\r\n")
            username = array[3];
            console.log("Username set to: " + username)
        }
    };
    xhttp.open("GET", "/configuration/login_details.txt", true);
    xhttp.send();
}

window.onload = function() {

    loadPings()
    loadUsername()

    var messages = [],
        socketID,
        field = document.getElementById("field"),
        prisonButton = document.getElementById("prison"),
        skyblockoneButton = document.getElementById("skyblockone"),
        skyblocktwoButton = document.getElementById("skyblocktwo"),
        skyblockthreeButton = document.getElementById("skyblockthree"),
        skyblockfourButton = document.getElementById("skyblockfour"),
        skyblockfiveButton = document.getElementById("skyblockfive"),
        skyblocksixButton = document.getElementById("skyblocksix"),
        factionsButton = document.getElementById("factions"),
        kitpvpButton = document.getElementById("kitpvp"),
        creativeButton = document.getElementById("creative"),
        townyoneButton = document.getElementById("townyone"),
        townythreeButton = document.getElementById("townythree"),
        townytwoButton = document.getElementById("townytwo"),
        survivalButton = document.getElementById("survival"),
        hubButton = document.getElementById("hub"),
        hidemeButton = document.getElementById("hideme"),
        ontimeButton = document.getElementById("ontime"),
        logoutButton = document.getElementById("logout"),
        content = document.getElementById("content"),
        sendmessage = document.getElementById("sendmessage"),
        notification = document.getElementById("notification");
    socket = io();

    socket.emit('loginUser', { data: window.userData });
    socket.on('private message', function(data) {
        socketID = data;
        console.log(socketID);
    });

    // notification.play();
    socket.on('message', function(data) {
        if (data.message) {
            console.log("Message from: " + data.clientID);
            var atBottom = content.scrollHeight - content.clientHeight <= content.scrollTop + 1;
            messages.push(data.message);
            latestmessages = messages.slice(Math.max(messages.length - 150, 0))

            var html = '';

            for (var i = 0; i < latestmessages.length; i++) {
                html += latestmessages[i] + '<br>';
            }
            content.appendChild(initParser(html, "content"));


            if (atBottom) {
                content.scrollTop = content.scrollHeight - content.clientHeight;
            }



            // Caps check
            uppers = (data.message.replace(/[^A-Z]/g, "").length);
            pct = uppers / data.message.length;
            if (pct >= 0.5) {
                console.log(pct + ";" + uppers + "/" + data.message.length)
                notification.play()
            }

            // Words to ping
            for (var i = 0; i < pingme.length; i++) {
                // console.log("Checking '" + pingme[i] + "'")
                if (data.message.toLowerCase().includes(pingme[i])) {
                    // if (data.message.toLowerCase().includes('staff') && data.message.toLowerCase().includes('apply')) {
                    //     console.log("PSA - no ping")
                    // }
                    console.log("Ping word fired!" + "'" + pingme[i] + "' - Playing notification...")
                    notification.play();
                }
            }

            sendmessage.onclick = function() {
                var text = field.value;
                window.lastInput = text;
                socket.emit('send', { message: text, clientID: socketID });
                field.value = "";
            };


        } else {
            console.log("There is a problem:", data);
        }
    });
    ontimeButton.onclick = function() {
        var text = "/ontime " + username;
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    logoutButton.onclick = function() {
        socket.emit('logoutUser', { clientID: socketID });
        window.location = "/";
    };



    //My buttons woo!
    prisonButton.onclick = function() {
        var text = "/gserver ms-opprison-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    skyblockoneButton.onclick = function() {
        var text = "/gserver ms-skyblock-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    skyblocktwoButton.onclick = function() {
        var text = "/gserver ms-skyblock-2";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    skyblockthreeButton.onclick = function() {
        var text = "/gserver ms-skyblock-3";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    skyblockfourButton.onclick = function() {
        var text = "/gserver ms-skyblock-4";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    skyblockfiveButton.onclick = function() {
        var text = "/gserver ms-skyblock-5";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    skyblocksixButton.onclick = function() {
        var text = "/gserver ms-skyblock-6";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    factionsButton.onclick = function() {
        var text = "/gserver ms-opfactions-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    kitpvpButton.onclick = function() {
        var text = "/gserver ms-kitpvp-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    creativeButton.onclick = function() {
        var text = "/gserver ms-creative-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    townyoneButton.onclick = function() {
        var text = "/gserver ms-towny-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    townythreeButton.onclick = function() {
        var text = "/gserver ms-towny-3";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    townytwoButton.onclick = function() {
        var text = "/gserver ms-optowny-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    survivalButton.onclick = function() {
        var text = "/gserver ms-survival-1";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    hubButton.onclick = function() {
        var text = "/hub";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
    };
    hidemeButton.onclick = function() {
        var text = "/vanish on";
        window.lastInput = text;
        socket.emit('send', { message: text, clientID: socketID });
        field.value = "";
        var text2 = "/gmsp";
        window.lastInput = text2;
        socket.emit('send', { message: text2, clientID: socketID });
        field.value = "";
    };

    // end of custom buttons.





    field.onkeydown = function(e) {
        var key = e.keyCode || e.which;
        if (key == 38 && window.lastInput) {
            document.getElementById("field").value = window.lastInput;
        }
        if (key == 13) {
            var text = field.value;
            window.lastInput = text;
            socket.emit('send', { message: text, clientID: socketID });
            field.value = "";
        }
    }
}