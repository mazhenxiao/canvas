/**
 * Created by mazhenxiao on 2016/10/27.
 */
"use strict";
function M(arg){

   if(typeof arg=="string"){
      if(arg.indexOf(".")==0||arg.indexOf("#")==0){
         return new M.fn.init(document.querySelector(arg));
      }
   }
}
M.opt = {
   width:400,
   height:400
}
M.fn = M.prototype={
   el:"body", //原始元素
   canvas:"",//canvas
   d2:"",//2d
   tools:"",//工具栏
   img:"",//图片
   supper:"",
   width:0, height:0, x:0, y:0,OOP:{bgcolor:"#c0c000",x:0,y:0,width:0,height:0},
   init:function(arg){
      this.el = arg;this.canvas = document.createElement("canvas");this.img = document.createElement("img");this.tools = document.createElement("div");this.d2 = this.canvas.getContext("2d");
      this.el.appendChild(this.canvas);this.el.appendChild(this.tools);this.el.appendChild(this.img);this.createTools();
   },
   create:function(arg){
      var self = this;
      self.extend(M.opt,arg);
      self.img.src=M.opt.src;
      self.img.height=M.opt.height;
      self.canvas.width=this.width = M.opt.width;self.canvas.height=this.height=M.opt.height;
      self.img.onload = function(){ $FUN_imgload.call(this,self) };
      self.addEvent();//添加事件监听
   },
   createTools:function(){
       this.tools.innerHTML+="<ul class='canvas-tools'><li class='canvas-route'>旋转</li><li>裁切</li><li class='canvas-paint'>绘制</li><li>描述</li></ul>"
   },
   getImage:function(){

   },
   editImg:function(){

   },
   clear:function(){
       this.d2.clearRect(0,0,this.width,this.height);
   },
   addEvent:function(){
      this.tools.on("click",$TouchEnd,this)
   },
   extend:function(a,b){
      for(var i in b ){
         a[i] = b[i];
      }
   },
   rect:function(arg){
      this.clear();
      this.extend(this.OOP,arg);
      this.d2.fillStyle = this.OOP.fillStyle;
      this.d2.beginPath();
      this.d2.fillRect(this.OOP.x,this.OOP.y,this.OOP.width,this.OOP.height);
      return this;
   },
   rotate:function(angler){
      var ang = angle(angler);
      this.clear();
      this.d2.fillStyle = this.OOP.fillStyle;
      this.d2.rotate(ang);
      this.d2.beginPath();
      this.d2.fillRect(this.OOP.x,this.OOP.y,this.OOP.width,this.OOP.height);
   }

}
M.fn.init.prototype = M.fn;

//Event
function $TouchEnd(){
   //console.log(event);
   var ev = event.target;
    if(ev.hasClass("canvas-paint")){ $edit_paint.call(ev,event)}
}
//private
function $FUN_imgload(th){
   th.d2.save();
   th.rect({x:th.width/4,y:th.height/4,width:th.width/4,height:th.height/2,fillStyle:"rgba(200,0,0,0.5)"})
}
function angle(th){
  // console.log(th*Math.PI/180)
    return th*Math.PI/180;
}
//publick
 Object.prototype.hasClass=function(arg){
      if(this.className.indexOf(arg)>-1){ return true}
 }
 Object.prototype.on=function(type,fun,data){
    this.addEventListener(type,function(){
       event.data = data;
       fun.call(this);
    },false);
 }


 function $edit_paint(event){
    var obj = event.data.d2;
        event.data.rotate(30);
   //console.log($FUN_imgload.Dom);
    //obj.rotate(angle(30));
 }
