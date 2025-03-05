import request from "../../utils/request";

//评论浏览
interface ProductReviews {
  userName: string,
  gender: string, //0 female 1 men
  publishDate: string,//发布日期
  comment: string,
  images: string[]
}

// pages/viewComments.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pdId: 0,
    offset: 0,
    comments: [] as ProductReviews[], 
  },

  loadingData(pdId: number, offset: number) {
    request(`/api/readComment?pdId=${pdId}&offset=${offset}`, 'POST').then((res: any) => {
      // console.log('data is ', res)
      const { data }: { data: ProductReviews[] } = res.data;
      console.log(data)
      if (data instanceof Array) {
        data.forEach(item => {
          if (!item.images) {
            item.images = [];//避免null错误
          }
        })
        this.setData({
          comments: [...this.data.comments, ...data]
        })
      } else {
        wx.showToast({
          title: "暂无更多评论",
          icon: "none",
          duration: 2000
        })
      }


    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    console.log(e)
    const pd_id = e.productId;
    this.data.pdId = e.productId;
    this.loadingData(pd_id, 0);
    //loading product reviews data
    // request('/api/readComment',)
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
    this.data.offset += 5;
    this.loadingData(this.data.pdId, this.data.offset); //加装数据
    console.log('offset = ', this.data.offset)
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