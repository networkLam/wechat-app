// pages/collection/collection.ts
import request from "../../utils/request"
import URL from "../../utils/URL"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBack:false
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
    //请求收藏的数据
    request(URL.GETCOLLECTION,"GET").then(res=>{
      console.log(res);
    })
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
  onPageScroll(e:any){
    // console.log(e)
    if(e.scrollTop <= 200){
      this.setData({
        isShowBack:false
      })
    }else{
      this.setData({
        isShowBack:true
      })
    }
  },
  backTop(){
    console.log("you have clicked this element")
    wx.pageScrollTo({
      scrollTop:0
    })
  }
})