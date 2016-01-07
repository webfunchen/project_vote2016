//一个加载的loading函数,css样式名：loading_style
define("loading/index", function (require, exports, module) {
    function _loading() {
        this.create();
    }
    _loading.prototype = {
        destroy: function () {
            var self = this;
            setTimeout(function () {
                document.body.removeChild(self.node);
            }, self.delay);
        },
        create: function () {
            var self = this;
            self.nodeid = "loading_" + new Date().getTime();
            self.node = document.createElement('div');
            self.node.setAttribute("class", "loading_style")
            self.node.id = self.nodeid;
            self.node.innerHTML = "加载中..."
            document.body.appendChild(self.node);
        }
    }
    module.exports = _loading;
});
