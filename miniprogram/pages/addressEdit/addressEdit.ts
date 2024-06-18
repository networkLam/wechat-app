// pages/addressEdit/addressEdit.ts
import { areaList } from "../../node_file/area-data/dist/data"
import URL from "../../utils/URL"
import request from "../../utils/request"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cantacts: '',//联系人
    phone: "",//手机号码
    major_address: '', //主要地址 展示用的
    minor_address: '',//次要地址
    send_major_address: "", //发送时的地址
    areaList,
    show: false,
    isShowDel: false,
    addId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    // console.log(e)
    if (e.type == 'add') {
      this.setData({
        isShowDel: false
      })
    } else {
      const { cantacts, addId, major_address, minor_address, phone, major_origin } = e;
      this.data.send_major_address = major_origin;//把主要地址赋给发送时的数据
      this.setData({
        cantacts,
        addId,
        major_address,
        minor_address,
        phone,
        isShowDel: true
      })
    }
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
  onChange(event: any) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  //确认地址
  confirm_add(e: any) {
    //  console.log(e)
    const { values }: { values: any[] } = e.detail;
    let temp_address = ''
    let temp_send = ''
    values.forEach((item) => {
      console.log(item.name)
      temp_address += item.name + ' '
      temp_send += item.name + '/'
    })
    this.setData({
      major_address: temp_address,
      send_major_address: temp_send,
      show: false
    })
  },
  //弹出层的两个函数
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  //保存信息
  save() {
    const address = this.data.send_major_address + this.data.minor_address;
    const temp_obj = {
      address,
      phone: this.data.phone,
      contacts: this.data.cantacts,
      addId: this.data.addId
    }
    if (temp_obj.phone == '' || temp_obj.address == '' || temp_obj.contacts == '') {
      wx.showToast({
        title: "请检查内容",
        icon: "error"
      })
      return;
    }
    console.log(temp_obj);
    //等于false就是添加
    if (!this.data.isShowDel) {
      request(URL.ADDRESSADDITIONAL, 'POST', { ...temp_obj }).then((res) => {
        console.log(res)
        wx.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2000 //展示2s
        })
        //保存完成后要跳回到上一页
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      })
    } else {
      //更新地址的逻辑
      request(URL.UPDATEADDRESS, 'POST', { ...temp_obj }).then((res: any) => {
        if (res.data.code = '1') {
          wx.showToast({
            icon: "success",
            title: "更新成功",
            duration: 2000
          })
          //更新成功后跳回到上一页
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        } else {
          wx.showToast({
            icon: "error",
            title: "更新失败",
            duration: 2000
          })
        }
      })
    }
  },
  del() {
    console.log("删除")
    request(URL.DELADDRESS+this.data.addId,'GET').then((res:any)=>{
        if(res.data.code == "1"){
          wx.showToast({
            icon:"success",
            title:"删除成功",
            duration:2000
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 2000)
        }
    })
  }
})