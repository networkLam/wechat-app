// pages/productReviews/index.ts
import URL from "../../utils/URL"
import request from "../../utils/request"
import Toast from '@vant/weapp/toast/toast';
interface RequestBody {
  orderId: number, //订单ID
  pdId: number, //商品ID
  date: string, //评论时间
  comment: string, //评论内容
  images: string[], //图片链接
  stars: number, // 星级评价
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderID: 0,
    pdID: 0,
    stars: 0,
    fileList: [] as { file: any, url: any }[],
    comment: '' // 评价的内容
  },
  //提交评价表单
  onSubmit() {
    // console.log('submit')
    // console.log(this.data.stars)
    // console.log(this.data.fileList)
    // console.log(this.data.comment)
    const commentDTO: RequestBody = {
      orderId: 0,
      pdId: 0, //商品ID
      date: '', //评论时间
      comment: '', //评论内容
      images: [], //图片链接
      stars: 0, // 星级评
    }
    const urlList: string[] = this.data.fileList.map(item => item.url);
    commentDTO.images = urlList;
    commentDTO.date = new Date().toISOString();
    commentDTO.orderId = this.data.orderID;
    commentDTO.pdId = this.data.pdID;
    commentDTO.comment = this.data.comment;
    commentDTO.stars = this.data.stars;
    console.log(commentDTO)
    if(commentDTO.stars != 0 && commentDTO.comment != ''){
      Toast('内容不完整，请检查！');
      return;
    }
    request(URL.ADDCOMMENT, 'POST', {
      ...commentDTO
    }).then((res: any) => {
      // console.log(res)
      if (res.data.code == "1") {
        wx.showToast({
          title: res.data.data,
          icon: "success",
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateBack();
        }, 3000)
      } else {
        wx.showToast({
          title: res.data.data,
          icon: "error",
          duration: 2000
        })
      }
    })

  },
  // rate function
  onChange(event: any) {
    this.setData({
      stars: event.detail,
    });
  },
  afterRead(event: any) {
    // console.log("run??")
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'http://localhost:8080/api/upload',
      filePath: file.url,
      name: 'myFile',
      formData: { user: 'test' },
      success: (res: any) => {
        // 上传完成需要更新 fileList
        console.log(res.data)
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },
    });
  },
  handleInput(options: any) {
    // console.log(options)
    this.data.comment = options.detail.value;
  },
  onClickLeft() {
    // wx.showToast({ title: '点击返回', icon: 'none' });
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    console.log(e)
    //read product information according to product ID
    this.data.pdID = e.pdid;
    this.data.orderID = e.orderid;
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

  }
})