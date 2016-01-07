define("zeptotoast/index", ['zepto'], function (require, exports, module) {
    require('zepto');
    var $ = Zepto;

    function _toast(text, expiretime) {
        this.text = text;
        this.expiretime = expiretime || 2000;
        this.showtoast();
    }
    _toast.prototype = {
        showtoast: function () {
            var self = this;
            var time = new Date().getTime();
            $("body").append('<div class="toast toast_' + time + '" style="position:fixed;z-index:99;background:rgba(0,0,0,0.8);color:#fff;width:60%;padding:0.5rem 5%;font-size:0.45rem;text-align:center;left:15%;top:40%;border-radius:30px;line-height:40px;box-shadow:0 0 10px #333;">' + self.text + '</div>');
            setTimeout(function () {
                $('.toast_' + time).remove();
            }, self.expiretime)
        }
    };
    return _toast;
});
