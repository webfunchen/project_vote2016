//添加手机模拟的console,仅限于无线页面。pc页面会有兼容性问题
//引用这个模块后，移动端的console.log将不在控制台里显示，而是居顶的一个浮层上显示
define("mobileconsole/index", function () {
    (function () {
        var self = this;
        var idname = "mobile-consolelog";
        window.console.log = function (msg) {
            if (document.querySelectorAll("#" + idname).length <= 0) {
                var consolenode = document.createElement('div');
                consolenode.id = idname;
                consolenode.setAttribute('style', 'font-size:0.3rem;color:#56fb05;line-height:0.6rem;height:1.2rem;position:fixed;left:0;top:0;width:100%;margin:0;padding:0;overflow:auto;background:rgba(0,0,0,0.5)');
                document.body.appendChild(consolenode);
            }
            var html = document.querySelector("#" + idname).innerHTML;
            typeof (msg) == "object" ? msg = JSON.stringify(msg): "";
            document.querySelector("#" + idname).innerHTML = msg + "<br />" + html;
        }
    })()
});
