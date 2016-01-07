define("h5module/index", ['zepto', 'zeptotouch/index', 'zeptolazyload/index', 'arttemplate/index', 'zeptotoast/index'], function (require, exports, module) {
    var $ = Zepto;
    require("zeptolazyload/index");
    require("zeptotouch/index");
    var template = require("arttemplate/index");
    var toast = require('zeptotoast/index');

    function Mod() {
        this.init();
    };
    Mod.prototype = {
        zoomEvents: function () {
            var self = this;
            //渲染完成后绑定放大点击事件
            $(".show-bigimg").on("singleTap", function () {
                var href = $(this).attr('href');
                if (href.indexOf("http") > 0) {} else {
                    var sourceimg = $(this).attr('data-source');
                    var win = '<div class="be-bigpage canzoom">\
                            <p class="big-cel">\
                                <img src="' + sourceimg + '" class="be-sourceimg" alt="">\
                            </p>\
                            <a class="icon iconfont close-zoom" href="javascript:void(0)">&#xe600;</a>\
                        </div>';
                    $('body').append(win);
                    $('.be-sourceimg')[0].onload = function () {
                        if ($(".be-sourceimg").height() > $(window).height()) {
                            $(".big-cel").css("display", "block");
                            $(".big-cel").parent().css("display", "block");
                        }
                    }
                    $(".be-bigpage").trigger("swipeDown");
                    self.zoomBIg(sourceimg);
                }
            });
        },
        zoomBIg: function (src) {
            $(".be-sourceimg").doubleTap(function (e) {
                $("body").append('<div class="frameimg" style="position:fixed;left:0;top:0px;width:100%;height:100%;z-index:101;background:#000;"><div style="overflow:auto;-webkit-overflow-scrolling:touch;width:105%;height:100%;"><img src="' + src + '" style="width:auto;" /></div><a class="icon iconfont close-zoom" href="javascript:void(0)">&#xe600;</a></div>');
                $(".frameimg").find('div').scrollTop(300);
            });
        },
        getData: function () {
            var self = this;
            $.ajax({
                url: "./data/data.php",
                dataType: "json",
                success: function (d) {
                    var html = template('itemTmpl', d);
                    $(".be-list").html(html);
                    self.zoomEvents();
                    self.getVote();
                }
            });
        },
        getVote: function () {
            var self = this;
            $.ajax({
                url: "http://h5.yunplus.com.cn/vote/voteadmin/getvote.php",
                dataType: "jsonp",
                type: "get",
                data: {
                    key: "2015designwork"
                },
                success: function (d) {
                    d.data.forEach(function (v, k) {
                        var voteid = v.voteId,
                            votenum = v.voteNum;
                        $(".vote_" + voteid).html(votenum);
                    });
                    $(".be-wrap").css('display', 'block');
                    setTimeout(function () {
                        $('.j_lazy').picLazyLoad({
                            threshold: 100,
                            placeholder: 'http://image.yihaodianimg.com/front-homepage/global/images/blank.gif'
                        });

                    }, 10);

                }
            });
        },
        addVote: function (vid) {
            var self = this;
            $.ajax({
                url: "http://h5.yunplus.com.cn/vote/voteadmin/addvotenum.php?voteid=",
                dataType: "jsonp",
                type: "get",
                data: {
                    voteid: vid
                },
                success: function (d) {
                    if (d.success == true) {
                        self.getVotesingle(vid);
                    } else {
                        if(d.code=="E002")
                        {
                          new toast("每个作品一天只能投一次哦");
                        }
                        else
                        {
                          new toast(d.msg);
                        }
                        
                    }
                }
            });
        },
        getVotesingle: function (vid) {
            var self = this;
            $.ajax({
                url: "http://h5.yunplus.com.cn/vote/voteadmin/getvote.php",
                dataType: "jsonp",
                type: "get",
                data: {
                    key: vid
                },
                success: function (d) {
                    d.data.forEach(function (v, k) {
                        var voteid = v.voteId,
                            votenum = v.voteNum;
                        $(".vote_" + voteid).html(votenum);
                    });
                }
            });
        },
        bindEvents: function () {
            var self = this;
            $(document).delegate('.frameimg', 'doubleTap', function (e) {
                $(".frameimg").remove();
                e.preventDefault();
            });
            $(document).delegate(".frameimg", "singleTap", function (e) {
                $(".be-bigpage").remove();
                $(".frameimg").remove();
                return false;
                e.preventDefault();
            });
            $(document).delegate(".be-bigpage", "singleTap", function () {
                $(".be-bigpage").remove();
                $(".frameimg").remove();
            });
            $(document).delegate(".vote-btn", "touchstart", function () {
                $(this).css('background-color', 'rgba(0,0,0,0.8)');
            });
            $(document).delegate(".vote-btn", "touchend", function () {
                $(this).css('background-color', 'rgba(0,0,0,0)');
            });
            $(document).delegate(".vote-btn", "singleTap", function () {
                var voteid = $(this).attr('data-id');
                self.addVote(voteid);
            });

        },
        init: function () {
            var self = this;

            self.getData();
            self.bindEvents();

        }
    }
    return Mod;
});
