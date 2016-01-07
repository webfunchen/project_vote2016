/*
 **抓取url参数
 */
define("geturlparam/index", [], function (require, exports, module) {
    function getUrl(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    module.exports = getUrl;
});
