// pages/UserDetail/UserDetail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail:{gender:"",phone:"",user_name:""}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e:any) {
  //console.log(e)
  const obj = JSON.parse(e.value) 
  console.log(obj);
  this.setData({
    userDetail:obj
  })
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
  // let token = wx.getStorageSync("token") as string;
   

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

  }
})