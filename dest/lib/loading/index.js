define("loading/index",function(e,n,t){function d(){this.create()}d.prototype={destroy:function(){var e=this;setTimeout(function(){document.body.removeChild(e.node)},e.delay)},create:function(){var e=this;e.nodeid="loading_"+(new Date).getTime(),e.node=document.createElement("div"),e.node.setAttribute("class","loading_style"),e.node.id=e.nodeid,e.node.innerHTML="加载中...",document.body.appendChild(e.node)}},t.exports=d});