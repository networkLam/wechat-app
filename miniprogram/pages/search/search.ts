// pages/search/search.ts
import URL from "../../utils/URL"
import request from "../../utils/request"
interface ProductRequest {
  p_describe: String
  p_name: String
  pd_id: number
  pd_type: String
  picture_name: String
  price: String
  state: String
  time: String
  number_single: Number //在订单中某件商品有多少个
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    serach_key:"",
    resultData:[] as  ProductRequest[],
    isShowBack: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.data.resultData.length = 0;
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
  onSearch(event:any){
    // read user input text
    const value:string = event.detail;
    // 把需要搜索的内容设为关键字
    this.setData({
      serach_key : value
    })
    request(`/api/product/search?keyword=${value}`,'GET').then((res:any)=>{
     const {data} = res.data;
     console.log(data)
     this.setData({
      resultData:data
     })
    })
  },
  onchange(){
    
  },
  jump(e:any){
    //take out ontap the id
    const index = e.currentTarget.dataset.k;
   const pd_id = this.data.resultData[index].pd_id;
   const {p_describe} = this.data.resultData[index];
   const {price} = this.data.resultData[index];
    console.log(pd_id)
    //got it id after jump product detail page
    wx.navigateTo({
      url: "/pages/productDetails/productDetails?id=" + pd_id+'&describe='+p_describe+'&price='+price,
    })
  },
  // 回到顶部
  backTop() {
    console.log("you have clicked this element")
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  //function listener scroll
  onPageScroll(e: any) {
    // console.log(e)
    if (e.scrollTop <= 200) {
      this.setData({
        isShowBack: false
      })
    } else {
      this.setData({
        isShowBack: true
      })
    }
  },
})