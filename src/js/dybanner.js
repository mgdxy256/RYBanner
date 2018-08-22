var RYBanner = (function () {
    var RYBanner = function () {
        return new RYBanner.fn.init();
    }

    RYBanner.fn = RYBanner.prototype = {
        constructor: RYBanner,
        registerEventListener: function() {
            var reference = this;
            function resizeEvent(obj) {
                // 浏览器窗口大小改变,重新绘制空间 一般发生在PC上,手机很少发生
                obj.onDraw();
            }
            function mouseupEvent(e, obj) {
                var dx = 0;
                if(typeof e == "MouseEvent") {
                    dx = e.x - obj.x;
                } else {
                    if(e.changedTouches) {
                        dx = e.changedTouches[0].pageX - obj.x;
                    }                    
                }
                if (dx < 0) {
                    obj.onNext();
                } else {
                    obj.onPrevious();
                }
                obj.x = 0;
            }
            function mousedownEvent(e, obj) {
                if(typeof e == "MouseEvent") {
                    obj.x = e.x;
                } else {
                    if(e.changedTouches) {
                        obj.x = e.changedTouches[0].pageX;
                    }
                }
            }
            function mousemoveEvent(e, obj) {
                var dx = 0;
                // if (obj.x == 0) return;
                if(typeof e == "MouseEvent") {
                    dx = e.x - obj.x;
                } else {
                    if(e.changedTouches) {
                        dx = e.changedTouches[0].pageX - obj.x;
                    }                   
                }
                obj.onMove(dx);
            }
            window.addEventListener("resize", function(e) {
                resizeEvent(reference);
            });
            // this.component.addEventListener("mousedown",mousedownEvent);
            this.component.ontouchstart = this.component.onmousedown = function (e) {
                mousedownEvent(e, reference);
            }
            this.component.ontouchend = this.component.onmouseup = function (e) {
                mouseupEvent(e, reference);
            }
            this.component.ontouchmove = this.component.onmousemove = function (e) {
                mousemoveEvent(e, reference);
            }
            this.component.onmouseover = function (e) {
                clearInterval(reference.timer);
            }
            this.component.onmouseleave = function (e) {
                var dx = 0;
                if(typeof e == "MouseEvent") {
                    dx = e.x - obj.x;
                } else {
                    if(e.changedTouches) {
                        dx = e.changedTouches[0].pageX - obj.x;
                    }                   
                }
                if (dx < 0) {
                    reference.onNext();
                } else {
                    reference.onPrevious();
                }
                reference.x = 0;
                reference.start();
            }
        },
        onDraw: function () {
            var strHtml = "\r\n";
            var screenWidth = document.body.clientWidth;
            strHtml += "<div class='_image_list' style='left:" + (-screenWidth) + "px;'>\r\n";
            for (var i = 0; i < this.imageList.length; i++) {
                if (i == 0) {
                    strHtml += "<a href=\"" + (this.imageList[this.imageList.length - 1].url == null ? '#' : this.imageList[ithis.imageList.length - 1].url) + "\"style='width:" + document.body.clientWidth + "px;'><img style=\'background-image:url(\"" + this.imageList[this.imageList.length - 1].img + "\");width:" + document.body.clientWidth + "px;\' /></a>\r\n";
                }
                strHtml += "<a href=\"" + (this.imageList[i].url == null ? '#' : this.imageList[i].url) + "\"style='width:" + document.body.clientWidth + "px;'><img style=\'background-image:url(\"" + this.imageList[i].img + "\");width:" + document.body.clientWidth + "px;\' /></a>\r\n";
                if (i == this.imageList.length - 1) {
                    strHtml += "<a href=\"" + (this.imageList[0].url == null ? '#' : this.imageList[0].url) + "\"style='width:" + document.body.clientWidth + "px;'><img style=\'background-image:url(\"" + this.imageList[0].img + "\");width:" + document.body.clientWidth + "px;\' /></a>\r\n";
                }
            }
            strHtml += "</div>\r\n";
            this.component.innerHTML = strHtml;

            this.registerEventListener();
        },
        init: function () {
            this.offset = 0
            return this;
        },
        register: function (component) {
            this.component = component;
            // this.component.addEventListener("mouseup",this.mouseupEvent);
            return this;
        },
        setInterval: function (millisecond) {
            this.interval = millisecond;
            return this;
        },
        onNext: function () {
            var screenWidth = document.body.clientWidth;
            if (this.offset == this.imageList.length - 1) {
                this.offset = 0;
            } else {
                this.offset++;
            }
            console.log("onNext" + this.offset);
            document.querySelector("._image_list").style.left = -((this.offset + 1) * screenWidth) + 'px';
        },
        onMove: function (offsetX) {
            var screenWidth = document.body.clientWidth;
            document.querySelector("._image_list").style.left = -((this.offset + 1) * screenWidth - offsetX) + 'px';
        },
        onPrevious: function () {
            var screenWidth = document.body.offsetWidth;
            if (this.offset == 0) {
                this.offset = this.imageList.length - 1;
            } else {
                this.offset--;
            }
            document.querySelector("._image_list").style.left = -((this.offset + 1) * screenWidth) + 'px';
        },
        start: function () {
            clearInterval(this.timer);
            this.timer = setInterval(function (obj) {
                obj.onNext();
            }, this.interval, this);
        },
        sayHello: function () {
            alert("Hello World");
        },
        setImageList: function (images) {
            this.imageList = images;
            this.onDraw();
            this.start();
        },
        imageList: [],
        offset: 0,
        interval: 5000,
        x: 0,
    }

    RYBanner.fn.init.prototype = RYBanner.fn;
    return RYBanner;
})();