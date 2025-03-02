// pages/viewComments.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
      comments:[{
        userName:"陆仁贾",
        gender:"0", //0 female 1 men
        pushlishDate:"2025/3/1",//发布日期
        comment:"非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！非常好的产品！！",
        images:['../../static/login/head-bg.png','../../static/login/head-bg.png','../../static/login/head-bg.png','../../static/login/head-bg.png']
      },{
        userName:"炮灰乙",
        gender:"1", //0 female 1 men
        pushlishDate:"2025/3/1",//发布日期
        comment:"非常赞的产品！！",
        images:['../../static/login/head-bg.png','../../static/login/head-bg.png','../../static/login/head-bg.png']
      }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e:any) {
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
  //nvigat
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
    wx.navigateBack()
  },
  onClickRight() {
    wx.showToast({ title: '点击按钮', icon: 'none' });
  },
})