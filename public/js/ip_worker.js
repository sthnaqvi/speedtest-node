var settings = {
    mpot: false, //set to true when in MPOT mode
    url_getIp: "/v1/ip",
    getIp_ispInfo: true, //if set to true, the server will include ISP info with the IP address
    getIp_ispInfo_distance: "km", //km or mi=estimate distance from server in km/mi; set to false to disable distance estimation. getIp_ispInfo must be enabled in order for this to work
};

var clientIp;

function url_sep(url) {
    return url.match(/\?/) ? "&" : "?";
};

this.addEventListener("message", function (e) {
    var message = e.data;
    if (message === 'start') {
        getIp()
    };
    if (message === 'status') {
        postMessage(JSON.stringify({ clientIp }))
    };
});

function getIp() {
    xhr = new XMLHttpRequest();
    xhr.onload = function () {
        try {
            var data = JSON.parse(xhr.responseText);
            clientIp = data.processedString;
            ispInfo = data.rawIspInfo;
        } catch (e) {
            clientIp = xhr.responseText;
            ispInfo = "";
        }

    };
    xhr.open("GET", settings.url_getIp + url_sep(settings.url_getIp) + (settings.mpot ? "cors=true&" : "") + (settings.getIp_ispInfo ? "isp=true" + (settings.getIp_ispInfo_distance ? "&distance=" + settings.getIp_ispInfo_distance + "&" : "&") : "&") + "r=" + Math.random(), true);
    xhr.send();
}