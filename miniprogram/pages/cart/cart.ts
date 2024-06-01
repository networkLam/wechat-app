// pages/cart/cart.ts
Page({
  /**
   * 页面的初始数据
   */
  // 价格的单位要换成分 cent
  data: {
    // {id:"",picture:"",price:"", check:true,amount:"" }
    cart_storage:[{id:"12138",title:"【购机赠蓝牙耳机】Redmi Turbo 3",picture:"../../static/test-product/redmi1.png",price:"199900", product_type:"默认",check:false,amount:"2" },
    {id:"12139",title:"【购机赠蓝牙耳机】Redmi Turbo 3",picture:"../../static/test-product/redmi2.png",price:"199900", product_type:"默认",check:false,amount:"1" },{id:"12140",title:"【购机赠蓝牙耳机和钢化膜】Redmi Turbo 3",picture:"../../static/test-product/redmi2.png",price:"199998", product_type:"默认",check:false,amount:"1" }],
    //  show total amount price
    price:0,
    // whether or not show delete button
    isDelete:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  oncheck(e:any){
    // get id
    const index:number = Number(e.detail.index);
    const check:boolean = e.detail.check;
    // get check boolean value confirm
    this.data.cart_storage[index].check = check;
    console.log(this.data.cart_storage);
    this.computeAmount();
  },
  computeAmount(){
    let total_price = 0;
    for(const item in this.data.cart_storage){
     if(this.data.cart_storage[item].check == true){
       total_price += Number(this.data.cart_storage[item].price) * Number(this.data.cart_storage[item].amount) ;
     }
    }
    // console.log(total_price)

    this.setData({
      price:total_price
    })
  },
  updateamount(e:any){
    console.log(e);
    const index:number =Number(e.detail.index) ;
    const num:number = e.detail.num;
    this.data.cart_storage[index].amount = num.toString();
    // console.log(this.data.cart_storage)
    this.setData({
      cart_storage : this.data.cart_storage
    })
    this.computeAmount();
  },
  // to isDelete value reverse 
  manage(){
   // be updata UI only when using setData API
    this.setData({
      isDelete:!this.data.isDelete
    })
  }
})