// components/product-show/product-show.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 图片链接
      src :{
        type:String,
        value:""
      },
      product_name:{
        type:String,
        value:""
      },
      //商品描述
      description:{
        type:String,
        value:""
      },
      //商品价格
      price:{
        type:String,
        value:""
      },
      // 销量
      sale:{
        type:String,
        value : ""
      },
      id:{
        type:String,
        value : ""
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value : "1231"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ontap(){
      const id = this.properties.id;
      const describe = this.properties.description;
      const price = this.properties.price; 
        this.triggerEvent("todetails",{id,describe,price});
    }
  }
})