
$(document).ready(function () {

    var canvasTree = $("#tree");
    var context = canvasTree.get(0).getContext("2d");
    canvasTree.attr("width",$(window).get(0).innerWidth);
    canvasTree.attr("height",$(window).get(0).innerHeight);
    var canvasTreeWidth = canvasTree.width();
    var canvasTreeHeight = canvasTree.height();


    var canvasFlower = $("#flower");
    var contextFlower = canvasFlower.get(0).getContext("2d");
    canvasFlower.attr("width",$(window).get(0).innerWidth);
    canvasFlower.attr("height",$(window).get(0).innerHeight);
    var canvasWidthFlower = canvasFlower.width();
    var canvasHeightFlower = canvasFlower.height();

    //設定按鈕------------------------------------------------

    var playAnimation = true;

    var startButton = $("#startAnimation");
    var stopButton = $("#stopAnimation");
    
    startButton.hide();
    startButton.click(function() {
        $(this).hide();
        stopButton.show();

        playAnimation = true;
        animate();
    });

    stopButton.click(function() {
        $(this).hide();
        startButton.show();

        playAnimation = false;
    });
 
    var n = 2 + Math.random() * 3;    // 设置初始的数量
   
    var radius = canvasTreeWidth / 150;  // 设定初始的半径大小
    
    var Branch = function() {
   
        this.x = canvasTreeWidth / 2;
        this.y = canvasTreeHeight;
        this.radius = 5;
        this.angle = Math.PI / 2;
    
        this.speed = canvasTreeWidth/500;
        this.generation = 0;
        this.distance = 0;
    };

    var branches = new Array();


    for (var i = 0; i < n; i++) {

        branch = new Branch();
        
        branch.x = canvasTreeWidth/2 - radius + i * 2 * radius / n;
        branch.radius = radius;
    
        branches.push(branch);  // 将新的branch加入集合中去

      
    }

    function drawTree() {
        var branchesLength = branches.length;
        for(var i=0; i<branchesLength; i++) {

            var tmpbranches = branches[i];
        
            if (branches.length < 500) {
                context.fillStyle =  "#FFF"  ;
                context.shadowColor = "#FFF";
                context.shadowBlur = 5;
                context.beginPath();
                context.moveTo(tmpbranches.x, tmpbranches.y);
                context.arc(tmpbranches.x, tmpbranches.y, tmpbranches.radius, 0, 2*Math.PI, true);
                context.closePath();
                context.fill();
            } 
            if (branches.length > 80) {
            var r = 2+Math.random()*2
            context.fillStyle = "rgba(255,192,203,.3)";
            context.shadowColor = "#FFF";
            context.beginPath();
            context.moveTo(tmpbranches.x, tmpbranches.y);
            context.arc(tmpbranches.x+Math.random()*15,tmpbranches.y+Math.random()*15,r,0,Math.PI)
            context.closePath();
            context.fill();
            }
            if (branches.length >1200) {
                return;
            }

           
            var deltaX = tmpbranches.speed * Math.cos(tmpbranches.angle);
            var deltaY = - tmpbranches.speed * Math.sin(tmpbranches.angle);
    
            tmpbranches.x += deltaX;
            tmpbranches.y += deltaY;
          
            tmpbranches.radius *= 0.99;
    
            var deltaDistance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2));
    
            tmpbranches.distance += deltaDistance;
    
            if (tmpbranches.speed > tmpbranches.radius * 2){
                tmpbranches.speed = tmpbranches.radius * 2;
            }
   
            tmpbranches.angle += Math.random()/5 - 0.1;

            var splitChance = 0;

            if (tmpbranches.generation == 1)
                splitChance = tmpbranches.distance / canvasTreeHeight - 0.2;

            else if (tmpbranches.generation < 3)
                splitChance = tmpbranches.distance / canvasTreeHeight - 0.1;
    
            if (Math.random() < splitChance) {
               
                var n = 2 + Math.round(Math.random()*3);
                
                for (var i = 0; i < n; i++) {
                    var branch = new Branch();
                    branch.x = tmpbranches.x;
                    branch.y = tmpbranches.y;
                    branch.angle = tmpbranches.angle;
                    branch.radius = tmpbranches.radius * 0.9;
                    branch.generation++;
                    branch.fillStyle =tmpbranches.fillStyle;

                    branches.push(branch);
      
                }
                if (branches.length >70) {
                     branches.splice(0, 1);
                }
            }
        }
        
    }

    var flower = function(x, y, sx, sy, color, r, dep) {
   
        this.x = x;
        this.y = y;
        this.sx = sx;
        this.sy = sy;
    
        this.color = color;
        this.r = r;
        this.dep = dep;
    };

    var flowerList = new Array();//樱花列表


    var k = 150;
    for (var i = 0; i < k; i++) {

        var x = canvasWidthFlower/2 + Math.random()*400 - 200;
        var y = canvasHeightFlower - (Math.random()*400 + 450);
        var sx = -(Math.random()-0.5);
        var sy =  0;
        var color = "rgba(255,192,203,.3)";
        var r = 7;
        var dep = 0.1;

        flowerList.push(new flower(x, y, sx, sy, color, r, dep));
      
    }

    var fallList = new Array();//飘落樱花列表
    var g = 0.01 ;//重力加速度
    var gWind = 0.005;//风力加速度
    var limitSpeedY = 1;//速度上限


    var len = flowerList.length ;
    
    function drawFlower() {
        if(Math.random() > 0.3)   {
            fallList.push(flowerList[Math.floor(Math.random()*len)]);//随机取出一个，花瓣复制到飘落花瓣的列表中
    
            contextFlower.clearRect(0,0,tree.width,tree.height);
        }  

        for(var i = 0 ;i < fallList.length ; i ++){
            if(fallList[i].sy < limitSpeedY) {
                fallList[i].sy += g ;
            }
            fallList[i].sx += gWind ;
            fallList[i].x += fallList[i].sx ;
            fallList[i].y += fallList[i].sy ;
            contextFlower.beginPath();
            contextFlower.fillStyle = fallList[i].color ;
            contextFlower.shadowColor = "#FFF";
            fallList[i].dep += fallList[i].sx*0.05 ;//跟速度相关的旋转花瓣
            contextFlower.fillStyle ="rgba(255,192,203,.3)";
            contextFlower.arc(fallList[i].x,fallList[i].y,fallList[i].r,fallList[i].dep,fallList[i].dep+Math.PI*1.3);
            contextFlower.fill();
        }
    }


    function animate(){

        drawTree();

        setTimeout(function(){
            drawFlower(); 
        },8000);
        
    
       
        if (playAnimation) {
            window.requestAnimationFrame(animate);
        }

    }

    animate();

});


