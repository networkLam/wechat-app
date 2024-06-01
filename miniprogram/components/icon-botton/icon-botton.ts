// components/icon-botton/icon-botton.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    show_text:{
      type:String,
      value:""
    },
    show_icon:{
      type:String,
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      this.triggerEvent("onevent",{msg:"hello"})
    
    },
    onTapBtn() {
      const data = 'hi, parent'
      this.triggerEvent('myevent', {data})
        console.log("点击了")
    }
  }
})