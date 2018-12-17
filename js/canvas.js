class createCanvas1{
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
		this.drawTimeType = option.drawTimeType || 'fast' // fast , slow
	};

	// 绘制
	draw(){
		const _this = this
		let drawTime = 0
		// 转换动画进行的时间
		switch (_this.drawTimeType) {
			case 'fast':
				drawTime = 50
				break;
			case 'slow':
				drawTime = 1000
				break
			default:
				break;
		}
		// 清空画布
		this.ctx.clearRect(0,0,this.canvasContent.width,this.canvasContent.height)
		// 设置圆环渐变色
		let gradient = this.ctx.createLinearGradient(0,0,this.canvasContent.width,this.canvasContent.height)
		gradient.addColorStop(0,this.strColor)
		gradient.addColorStop(1,this.endColor)
		this.ctx.strokeStyle = gradient
		this.ctx.lineWidth = this.lineWidth
		let add = 1.4 / (1000)
		let str = 0.8
		let end = 0.8 + add
		let rate = 1
		let animat
		let run1 = function () {
			animat = requestAnimationFrame(run1)
			_this.ctx.createLinearGradient(0,0,_this.canvasContent.width,_this.canvasContent.height)
			_this.ctx.beginPath()
			_this.ctx.arc(_this.ox,_this.oy,_this.or, str*Math.PI, end*Math.PI)
			_this.ctx.stroke()
			_this.ctx.closePath();
      _this.ctx.restore();
			end += add*rate
			if (end > 2.2 && end < 2.2 + add*rate) {
				end = 2.2
				rate = 1
			} else if (end == 2.2 + add) {
				return window.cancelAnimationFrame(animat)
			} else {
				if (end < 1) {
					rate+=1
				} else {
					rate += 2
				}
			}
		}
		run1()
	};
}