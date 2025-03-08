// pages/waitReviews/index.ts
import request from "../../utils/request"
import { formatTime } from "../../utils/util"
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

interface RequestOrderData {
  add_id: Number
  address: string
  amount: Number //整张订单中一共有多少件商品
  contacts: string //订单的联系人
  exp_id: string //快递编号
  money: string //订单总价
  order_id: Number //订单编号
  order_number: string //订单号
  phone: string //手机号
  time: string //下单时间
  product: ProductRequest[]
}
//待评价的商品信息
interface WaitReviews {
  comment: string
  id: number
  number: number
  order_id: number
  p_describe: string
  p_name: string
  pd_id: number
  picture_name: string
  time: string
  totals: string
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [] as any[],
    waitReviews: [] as WaitReviews[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //查询用户已完成的交易
    request(`/api/order/user/browser?state=finish`, 'GET').then((res: any) => {
      const { data }: { data: RequestOrderData[] } = res.data;
      data.forEach((item, index) => {
        data[index].time = formatTime(new Date(data[index].time))
      })
      console.log(data);
      this.setData({
        orders: data
      })
    });
    request("/api/user/notReviews", 'POST').then((res: any) => {
      console.log('print->', res)
      const data: WaitReviews[] = res.data.data;
      if (data.length != 0) {
        console.log('存在数据')
        this.setData({
          waitReviews:data
        })
      } else {
        console.log("不存在数据")
      }
    })
  },

  evaluate(data: any) {
    console.log(data)
    const pdId = data.currentTarget.dataset.pdid;//要评价的商品id
    console.log(pdId)
    const orderId = data.currentTarget.dataset.orderid;//要评价的订单id
    console.log(orderId)
    //going to evaluate page carry ID at now
    wx.navigateTo({
      url: `/pages/productReviews/index?pdid=${pdId}&orderid=${orderId}`
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