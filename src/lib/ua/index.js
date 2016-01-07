define("ua/index", function (require, exports, module) {
    var UA = {
        isMobile: function (callback) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        },
        isWeiXin: function () {
            if (/MicroMessenger/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        },
        isWeibo: function () {
            if (/Weibo/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        },
        isIphone: function () {
            if (/iPhone/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        },
        isAndroid: function () {
            if (/Android/i.test(navigator.userAgent)) {
                return true;
            } else {
                return false;
            }
        }
    }
    module.exports = UA;
});
