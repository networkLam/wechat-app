// components/cart-item/cart-item.ts
import Dialog from '@vant/weapp/dialog/dialog';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品的标题
    title: {
      type: String,
      value: ""
    },
    // 选择的商品类型 （套餐一、二之类的）
    product_type: {
      type: String,
      value: ""
    },
    // {id:"",picture:"",price:"", check:true,amount:"" } 
    // 商品是否被勾选
    check: {
      type: Boolean,
      value: false
    },
    goods_id: {
      type: String,
      value: ""
    },
    price: {
      type: String,
      value: ""
    },
    picture: {
      type: String,
      value: ""
    },
    amount: {
      type: String,
      value: ""
    },
    product_index:{
      type:String,
      value:""
    },
    showDel:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    checked: false,
    isSteper:false,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event: any) {
      this.setData({
        checked: event.detail,
      });
    },
    onchecked() {
      // console.log("click ...")
      // console.log("before ", this.data.checked)
      this.setData({
        checked: !this.data.checked
      })
      // console.log("after ", this.data.checked)

      this.triggerEvent("oncheck",{index:this.properties.product_index,check:this.data.checked})
    },
    changeamount(e:any){
      // 改变数量
    //  console.log(e.detail)
     const num = e.detail;
    //  console.log("before update",this.properties.amount)
     this.triggerEvent("updateamount",{num,index : this.properties.product_index})
    //  console.log("after update",this.properties.amount)
    
    },
    showchange(){
      // control stepper whether or not show to UI
      this.setData({
        isSteper : true
      })
    },
    hiddenChange(){
      // control stepper whether or not show to UI
      this.setData({
        isSteper : false
      })
    },
    // cart remove goods 
    remove_goods(){
      console.log(this.properties.goods_id)
      console.log(this.properties.product_index)
      Dialog.confirm({
        title: '删除',
        message: '确定删除？',
        context:this
      })
        .then(() => {
          // on confirm
          console.log("delete success")
        })
        .catch(() => {
          // on cancel
          console.log("delete fail")
        });
    }
  }
})