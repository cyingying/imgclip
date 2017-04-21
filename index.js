
window.onload = function() {
        document.onselectstart = new Function('event.returnValue=false;'); //保证不会出现图片被选中，产生一闪一闪的状态
        $('#main').draggable({containment:'parent',drag:setChoice}); //实现拖动，但是有事件冒泡事件
        //拖动小方块改变选取框大小
        var rightDiv = document.getElementsByClassName('right-mid')[0];
        var upDiv = document.getElementsByClassName('up')[0];
        var leftDiv = document.getElementsByClassName('left-mid')[0];
        var downDiv = document.getElementsByClassName('down')[0];
        var rightupDiv = document.getElementsByClassName('right-up')[0];
        var leftupDiv = document.getElementsByClassName('left-up')[0];
        var leftdownDiv = document.getElementsByClassName('left-down')[0];
        var rightdownDiv = document.getElementsByClassName('right-down')[0];
        var mainDiv = document.getElementById('main');
        console.log(rightupDiv);
        
        var ifKeyDown = false;//鼠标按下状态；即鼠标是否被按下
        var contach = "" //判断点击的是哪一方位的触点
        //鼠标事件。控制八个触点
        rightDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "right";
        }
        leftDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "left";
        }
        upDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "top";
        }
        downDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡      
            ifKeyDown = true;
            contach = "down";
        }
        rightupDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "right-up";
        }
        leftupDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "left-up";
        }
        leftdownDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "left-down";
        }
        rightdownDiv.onmousedown = function(e) {
            e.stopPropagation();   //阻止事件冒泡
            ifKeyDown = true;
            contach = "right-down";
        }
        window.onmouseup = function() {
            ifKeyDown = false;
        }
        window.onmousemove = function(e) {
            if(ifKeyDown == true) {
                switch(contach) {
                    case "right":rightMove(e);break;
                    case 'top':topMove(e);break;
                    case "left":leftMove(e);break;
                    case "down":downMove(e);break;
                    case "right-up":rightMove(e);topMove(e);break;
                    case "left-up":leftMove(e);topMove(e);break;
                    case "left-down":leftMove(e);downMove(e);break;
                    case "right-down":rightMove(e);downMove(e);break;
                }
            }
            setChoice();
            setPreview();
        }

//获取元素相对于屏幕边界的距离
     function getPosition(node) {
        var left = node.offsetLeft;
        var top = node.offsetTop;
        var parent = node.offsetParent;
        while(parent != null){
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return {"left":left,"top":top};
     }
//右边触点的移动
     function rightMove(e) {
        var x = e.clientX;  //鼠标x的坐标
        var widthBefore = mainDiv.offsetWidth-2; //选取框变化前的宽度；即就是main的宽度
        var addWidth = "";  //鼠标移动后增加的宽度
        addWidth = x - getPosition(mainDiv).left - widthBefore;
        mainDiv.style.width = addWidth + widthBefore + 'px';
     }
//上边触点的移动
     function topMove(e) {
        var y = e.clientY;
        var heightBefore = mainDiv.offsetHeight-2;
        var addHeight = "";
        addHeight = getPosition(mainDiv).top - y;
        mainDiv.style.height = heightBefore + addHeight + 'px'; //选取框变化后的高度
        mainDiv.style.top =  mainDiv.offsetTop - addHeight + 'px';  //左上点的坐标变化
     }
//左边触点的移动
    function leftMove(e) {
        var x = e.clientX;
        var widthBefore = mainDiv.offsetWidth-2;
        var addWidth = "";
        addWidth = getPosition(mainDiv).left - x;
        mainDiv.style.width = widthBefore + addWidth + 'px'; 
        mainDiv.style.left =  mainDiv.offsetLeft - addWidth + 'px';//左上点的坐标变化
    }
//下边触点的移动
    function downMove(e) {
        var y = e.clientY;
        var heightBefore = mainDiv.offsetHeight-2;
        var addHeight = "";
        addHeight = y - getPosition(mainDiv).top - heightBefore;
        mainDiv.style.height = heightBefore + addHeight + 'px'; //选取框变化后的高度
    } 
//设置选取框区域亮度可见
    function setChoice() {
       var top = mainDiv.offsetTop;
       var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
       var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
       var left = mainDiv.offsetLeft;
       var img2 = document.getElementById('img2');
       img2.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
    }
//预览函数
     function setPreview() {
       var top = mainDiv.offsetTop;
       var right = mainDiv.offsetLeft + mainDiv.offsetWidth;
       var bottom = mainDiv.offsetTop + mainDiv.offsetHeight;
       var left = mainDiv.offsetLeft;
       var img3 = document.getElementById('img3');
       img3.style.clip = "rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
       img3.style.top = -top + 'px';   //让预览图的左顶点一直在左上角
       img3.style.left = -left + 'px';
    }
}