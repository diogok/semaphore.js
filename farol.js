var farol = function(options) {

    var red = "darkred";
    var green = "darkgreen";
    var yellow = 'goldenrod';
    
    var div = document.createElement("div");
    div.class= "x-farol";
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
    light.class = "x-farol-light";
    light.style.width="20px";
    light.style.height='20px';
    light.style.backgroundColor=red;
    light.style.borderRadius="15px";
    light.style.float="left";
    div.appendChild(light);

    var text = document.createElement("div");
    text.innerHTML="OFFLINE";
    text.class = "x-farol-text";
    text.style.float="right";
    text.style.color=red;
    text.style.fontFamily='Verdana';
    text.style.fontSize="16px";
    div.appendChild(text);

    function setRed() {
        text.innerHTML = "OFFLINE";
        text.style.color = red;
        light.style.backgroundColor = red;
    }

    function setYellow() {
        text.innerHTML = "SLOW";
        text.style.color = yellow;
        light.style.backgroundColor = yellow;
    }

    function setGreen() {
        text.innerHTML = "ONLINE";
        text.style.color = green;
        light.style.backgroundColor = green;
    }


    function check(opts) {
        var req = new XMLHttpRequest() ;
        req.open("GET",opts.url,true);
        req.onreadystatechange = function () {
            if (req.readyState != 4) return;
            if (req.status == 200 && req.response == "ok") {
                setGreen();
            } else {
                setRed();
            }
        };
        req.send(null);
        setTimeout(function(){
            if(req.readyState != 4) {
                setYellow();
            }
        },opts.timealert);
        setTimeout(function(){
            if(req.readyState != 4) {
                req.abort();
                setRed();
            }
        },opts.timeout);
    }

    var opts = {
        interval: 5000,
        timeout: 10000,
        timealert: 5000,
    };

    if(typeof options == "object"){
        for(var i in options) {
            opts[i] = options[i];
        }
    }

    if(typeof opts.url != "string") {
        throw "Must provide a URL to test server state.";
    }

    var base = document.body;
    if(typeof opts.element == "string") {
        base = document.getElementById(opts.element);
    }
    base.appendChild(div);

    check(opts);
    setInterval(function(){ check(opts) }, opts.interval);

}

