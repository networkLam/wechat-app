// pages/orderDetail/index.ts
import request from "../../utils/request"
import URL from "../../utils/URL"
import { formatTime } from "../../utils/util"
import Dialog from '@vant/weapp/dialog/dialog';
interface orders {
  add_id: Number,
  address: string,
  amount: Number,
  contacts: string,
  exp_id: string
  money: Number
  order_id: string
  order_number: string
  phone: string
  state: string
  time: string
  uid: string
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: {} as orders,
    steps: [
      {
        text: '已签收',
        desc: '2016-07-10 09:30',
        inactiveIcon: 'passed',
        activeIcon: 'success',
      },
      {
        text: '快递派送中',
        desc: '2016-07-11 10:00',
        inactiveIcon: 'passed',
        activeIcon: 'success',
      },
      {
        text: '运送中',
        desc: '2016-07-12 12:40',
        inactiveIcon: 'passed',
        activeIcon: 'success',
      },
      {
        text: '快递已揽件',
        desc: '2016-07-12 12:40',
        inactiveIcon: 'passed',
        activeIcon: 'success',
      },
      {
        text: '已下单',
        desc: '2016-07-12 12:40',
        inactiveIcon: 'passed',
        activeIcon: 'success',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    // console.log("orderDetail")
    // console.log(e)
    const { data } = e;
    let temp = JSON.parse(data);
    temp.time = formatTime(new Date(temp.time))
    this.setData({
      orders: temp
    })
    // let dateObj = new Date(temp.time);
    // let temp_time = dateObj.getTime() + (1000 * 60 * 60 * 24);
    // console.log(temp_time)
    // let aabb = formatTime(new Date(temp_time));
    // console.log(aabb)
    const temp_arr = [] as any[];
    const text_arr = ['已签收', '快递派送中', '运送中', '快递已揽件', '已下单'].reverse();
    this.data.steps.forEach((item, index) => {
      const temp_obj = {
        text: '',//步骤
        desc: '',//描述信息 时间
        inactiveIcon: 'passed',
        activeIcon: 'success',
      }
      let temp_date = new Date(temp.time);

      temp_obj.desc = formatTime(new Date(temp_date.getTime() + (index * 1000 * 60 * 60 * 24)))
      temp_obj.text = text_arr[index]
      temp_arr.unshift(temp_obj)
    })
    console.log(temp_arr)
    this.setData({
      steps: temp_arr
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

  },
  //退单
  refund() {
    Dialog.confirm({
      title: '退货',
      message: '确定退货吗？',
    })
      .then(() => {
        request(`/api/order/user/refund?id=${this.data.orders.order_id}`, 'GET').then((res: any) => {
          console.log(res)
          wx.showToast({
            title: "退货成功",
            icon: "success",
            duration: 2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 2
            })
          }, 2500)
        })
      })
      .catch(() => {
        console.log("取消退货")
      });
  },
  //确认收货
  onConfirm() {
    request(`/api/order/user/confirm?id=${this.data.orders.order_id}`, 'GET').then((res: any) => {
      console.log(res)
      wx.showToast({
        title: "确认收货成功",
        icon: "success",
        duration: 2000
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 2
        })
      }, 2500)
    })
  }
})