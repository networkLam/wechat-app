// components/address-item/address-item.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    major_address:{
      type:String,
      value:''
    },
    minor_address:{
      type:String,
      value:''
    },
    cantacts:{
      type:String,
      value:''
    },
    phone:{
      type:String,
      value:''
    },
    id:{
      type:Number,
      value:0
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
    jump_edit(){
      const parms = {
        major_address: this.properties.major_address,
        minor_address:this.properties.minor_address,
        cantacts:this.properties.cantacts,
        phone:this.properties.phone,
        id:this.properties.id
      }
      this.triggerEvent("jump_edit",{...parms})
    }
  }
})