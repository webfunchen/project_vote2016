define('zeptotest/index', ['zepto'], function (require, exports, module) {
    //请勿在元素上添加上下边距，否则checkline为真时会计算不准确
    var $ = Zepto;
    (function ($) {
        $.fn.splitLetter = function (opt) {
            opt = opt || {
                "letters": 3,
                "lineheight": 30,
                "lines": 2,
                "checklines": true
            };
            var self = this;
            this.checkAll = function () {
                self.each(function (k, v) {
                    var letter = $(v).text();
                    if (opt.checklines == true) {
                        $(v).css('line-height', opt.lineheight + "px")
                        var lines = self.checklines($(v));
                        console.log(lines);
                        if (lines > opt.lines) {
                            $(v).height(opt.lineheight * opt.lines).css('overflow', "hidden");
                        }
                    } else {
                        if (typeof (letter) != "string") {
                            console.warn("the text is not String");
                        } else if (letter.length > opt.letters) {
                            $(v).text(letter.slice(0, opt.letters) + "...");
                        }
                    }

                });
            }
            this.checklines = function (item) {
                var allheight = $(item).height(),
                    oneheight = opt.lineheight || 2,
                    alllines = Math.floor(allheight / oneheight);
                console.warn(allheight);
                return alllines;
            }
            this.checkAll();


        }
    })($)
});
