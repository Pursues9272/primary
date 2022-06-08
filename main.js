window.onload = () => {
    let group = document.getElementById('box') // 动画盒
    var lists = group.querySelectorAll('li')   // 列表
    var img_comp = 0 //运动完成的图片数量
    var img_all = 0
    var on = true;
    function pursues() {
        if (!on) {
            return;
        }
        on = false;
        for (let i = 0; i < lists.length; i++) {
            !function (i) {
                setTimeout(() => {
                    montion(lists[i], '10ms', function () {
                        this.style.transform = "scale(0)";	//缩放到0
                    }, function () {
                        //第二个运动要在这里写
                        montion(this, '1s', function () {
                            this.style.transform = "scale(1)";
                            this.style.opacity = 0;
                        }, function () {
                            img_comp++;	//只要有一张图走完了，就让他加个1
                            if (img_comp == lists.length) {
                                toBig();
                            }
                        });
                    });
                }, Math.random() * 1000);
            }(i)
        }
        function toBig() {
            /*
             * 坐标轴
             * x轴（平行地面）
             * y轴（垂直地面）
             * x轴（垂直屏幕）
             */
            for (var i = 0; i < lists.length; i++) {
                lists[i].style.transition = "";
                //想要一个物体有css3中的一些变化，那就需要给他一个初始值
                lists[i].style.transform = 'rotateY(0deg)translateZ(-' + Math.random() * 500 + 'px)';
                //用这种方式去写是因为想要在循环里找i的值
                (function (i) {
                    setTimeout(function () {
                        montion(lists[i], '2s', function () {
                            this.style.opacity = 1;
                            this.style.transform = 'rotateY(-360deg) translateZ(0)';
                        }, function () {
                            img_all++;
                            if (img_all == lists.length) {
                                //这个条件成立，说明所有图片都运动完了，可以让用户再次点击了
                                on = true;		//当所有运动完了以后才可以点
                                setTimeout(pursues, 1000);
                                img_comp = 0 //运动完成的图片数量
                                img_all = 0
                            }
                        });
                    }, Math.random() * 1000);
                })(i);
            }
        };
    }
    pursues()

    // 运动函数(运动的对象/运动的时间/运动的属性函数/运动完成后要做的事情)
    function montion(obj, time, doFn, callBack) {
        obj.style.transition = time;
        doFn.call(obj);		//调用函数,并把this的指向给obj
        let called = false;	//解决transitionend调用多次的bug
        obj.addEventListener('transitionend', () => {
            if (!called) {
                callBack && callBack.call(obj);
                called = true;
            }
        }, false);
    }
}