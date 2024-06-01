

// pages/productDetails/productDetails.ts
interface Msg{
  id:String,
  description:String,

}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetails:{
      picture:['../../static/test-product/redmi1.png','../../static/test-product/redmi2.png','../../static/test-product/redmi3.png',], //展示的图片
      product_name:"【购机赠蓝牙耳机】Redmi Turbo 3",//商品名称
      descript:"新品红米note turbo3手机小米官方旗舰店官网学生拍照智能性能正品小旋风", //产品描述
      price :"1999", //价格
      sale : "998" ,//月销售
      show: false
    },
    selected:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e:any) {
    // e里面的有产品的ID拿ID去请求网络即可获取数据
    console.log(e)

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
  back(){
    console.log("go back privious page")
    wx.navigateBack({
      delta:1
    })
  },
  onClickIcon() {
   console.log("点击了图标")
  },

  onClickButton() {
    console.log('点击按钮');
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tocart(){
    // 点击按钮去购物车界面
    // 微信小程中如果想要跳转到tabBar那就不用使用navigateTo 而是使用swtichTab
    wx.switchTab({
      url:"/pages/cart/cart"
    })
  },
  onselected(){
    // 判定是否选中
    const temp_selected = this.data.selected;
    //对结果进行取反
    this.setData({
      selected : !temp_selected
    })
  },
  collection(){
    console.log("collection")
    wx.showToast({
      title:"收藏成功",
      mask:true
    })
  }
})