// pages/waitProduct/index.ts
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

interface RequestOrderData{
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
  product : ProductRequest[]
}



Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [  ], 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    request(`/api/order/user/browser?state=wait`,'GET').then((res)=>{
      console.log(res)
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