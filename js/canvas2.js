class createCanvas2{
	constructor(option){
		this.canvasContent = option.canvasContent // canvas画布
		this.canvasBox = this.canvasContent.parentNode // canvas画布父元素
		this.width = parseInt(this.canvasBox.offsetWidth) // 父元素的宽度
		this.height = parseInt(this.canvasBox.offsetHeight) // 父元素的高度
		this.canvasContent.width = this.width * 2 // 画布宽高比父元素放大两倍(提高清晰度)
		this.canvasContent.height = this.height * 2
		this.ox = this.canvasContent.width / 2 // 坐标点x
		this.oy = this.ox // 坐标点y
		this.lineWidth = option.lineWidth // 绘制线条宽度
		this.or = (this.canvasContent.width / 2) - (this.lineWidth * 2) // 绘制半径
		this.ctx = this.canvasContent.getContext('2d') // 获取canvas实例
		this.strColor = option.strColor
		this.endColor = option.endColor
		this.drawTime = option.drawTime || 2000 // fast , slow
	};

	// 绘制
	draw(){
		const _this = this
		// 清空画布
		_this.ctx.clearRect(0,0,_this.canvasContent.width,_this.canvasContent.height)
		let str = 0.8 // 该参数唯一的意义就是确定起始点的y坐标
		let end
		let r = _this.or
		let ystr = -r*Math.sin(0.2*Math.PI)
		let y = ystr
		let yaddTop = (_this.or) / 10
		let yaddBot = (Math.abs(ystr))/20
		let run = function () {
			_this.ctx.createLinearGradient(0,0,_this.canvasContent.width,_this.canvasContent.height)
			_this.ctx.beginPath()
			_this.ctx.arc(_this.ox,_this.oy,_this.or, str*Math.PI, end*Math.PI)
			_this.ctx.stroke()
			_this.ctx.closePath();
      _this.ctx.restore();
		}
		// 设置圆环渐变色和线条宽度
		let gradient = _this.ctx.createLinearGradient(0,0,_this.canvasContent.width,_this.canvasContent.height)
		gradient.addColorStop(0,_this.strColor)
		gradient.addColorStop(1,_this.endColor)
		_this.ctx.strokeStyle = gradient
		_this.ctx.lineWidth = _this.lineWidth
		// 开始绘制
		let interval = setInterval(()=>{
			// debugger
			if (end > 2.2) {
				return window.clearInterval(interval)
			}
			if (y >= ystr && y<0) {
				if (end >= 2) {
					y-=yaddBot
					end = 2 + Math.asin(-y/r)/(Math.PI)
				} else {
					y+=yaddBot
					end = 0.5 + Math.acos(-y/r)/(Math.PI)
				}
			} else if (y >= 0 && y<=370) {
				// debugger
				if (end >= 1.5) {
					y-=yaddTop
					end = 1.5 + Math.acos(y/r)/(Math.PI)
				} else {
					// debugger
					y+=yaddTop
					end = 1 + Math.asin(y/r)/(Math.PI)
				}
			} else if (y > 370){
				y = 370
				end = 1.5 + Math.acos(y/r)/(Math.PI)
			} else if (y<ystr) {
				y = ystr
				end = 2 + Math.asin(-y/r)/(Math.PI)
			}
			run()
		},10)
	};
	yToDeg(y,r){
		console.log(Math.asin(y/r)/(Math.PI))
		return Math.asin(y/r)/(Math.PI)
	}
}