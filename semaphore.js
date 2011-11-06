var semaphore = function(options) {
    if(typeof options.url != "string") throw "Must provide a URL to test server state.";

    var running = false;

    var opts = {
        interval: 5000,
        timeout: 10000,
        timealert: 5000,
        onlineText: "ONLINE",
        offlineText: "OFFLINE",
        slowText: "SLOW",
        onlineColor: "darkgreen",
        offlineColor: "darkred",
        slowColor: "goldenrod"
    };

    if(typeof options == "object"){
        for(var i in options) {
            opts[i] = options[i];
        }
    }

    var div = document.createElement("div");
    div.className = "x-semaphore";
    div.style.width="92px";
    div.style.height='20px';
    div.style.padding='5px';
    div.style.backgroundColor="#fff";
    div.style.border="1px #aaa solid";
    div.style.position="absolute";
    div.style.zIndex="10";
    div.style.top="12px";
    div.style.right="12px";

    var light = document.createElement("div");
    light.className = "x-semaphore-light";
    light.style.width="20px";
    light.style.height='20px';
    light.style.backgroundColor=opts.offlineColor;
    light.style.borderRadius="15px";
    light.style.float="left";
    div.appendChild(light);

    var text = document.createElement("div");
    text.innerHTML=opts.offlineText;
    text.className = "x-semaphore-text";
    text.style.float="right";
    text.style.color=opts.offlineColor;
    text.style.fontFamily='Verdana';
    text.style.fontSize="16px";
    div.appendChild(text);

    var base = document.body;
    if(typeof opts.element == "string") base = document.getElementById(opts.element);
    base.appendChild(div);

    function setRed() {
        text.innerHTML = opts.offlineText;
        text.style.color = opts.offlineColor;
        light.style.backgroundColor = opts.offlineColor;
    }

    function setYellow() {
        text.innerHTML = opts.slowText;
        text.style.color = opts.slowColor;
        light.style.backgroundColor = opts.slowColor;
    }

    function setGreen() {
        text.innerHTML = opts.onlineText;
        text.style.color = opts.onlineColor;
        light.style.backgroundColor = opts.onlineColor;
    }

    function fire(event,req) {
        if(req.readyState == 4 || req.readyState == 0) running = false;
        var evt = "on"+event;
        if(typeof opts[evt] == "function") {
            var fn = opts[evt];
            fn(req.response);
        }
    }

    function checkTimes(req) {
        setTimeout(function(){
            if(req.readyState != 4) {
                setYellow();
                fire("timealert",req,opts);
            }
        },opts.timealert);

        setTimeout(function(){
            if(req.readyState != 4) {
                req.abort();
                setRed();
                fire("timeout",req,opts);
            }
        },opts.timeout);
    }

    function check() {
        if(running) return;
        running = true;
        var req = new XMLHttpRequest() ;
        req.open("GET",opts.url,true);
        req.onreadystatechange = function () {
            if (req.readyState != 4) return;
            if (req.status == 200 && req.response == "ok") {
                setGreen();
                fire("success",req,opts);
            } else {
                setRed();
                fire("error",req,opts);
            }
        };
        checkTimes(req,opts);
        req.send(null);
    }

    check(opts);
    setInterval(function(){ check(opts) }, opts.interval);

}

