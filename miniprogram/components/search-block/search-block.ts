// components/search-block/search-block.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //identity of product
    id:{
      type:String,
      value:""
    },
    // picture 
    src:{
      type:String,
      value:""
    },
    // product describe
    describe:{
      type:String,
      value:""
    },
    //product price (unit is cents)
   price:{
    type:String,
    value:""
   },
  //  how many sold of each month
   sold:{
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

  }
})