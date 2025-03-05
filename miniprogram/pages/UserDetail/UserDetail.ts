// pages/UserDetail/UserDetail.ts
import Dialog from '@vant/weapp/dialog/dialog';

import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userDetail: { gender: "", phone: "", user_name: "" },
    modifyNameDialog: false,//控制修改名字的弹框
    modifyGenderDialog: false,//控制修改性别的弹框
    temporaryName: "",
    temporaryGender: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    //console.log(e)
    const obj = JSON.parse(e.value)
    console.log(obj);
    this.setData({
      userDetail: obj
    })
  },
  //修改名字
  modifyName() {

    this.setData({
      modifyNameDialog: true,
      temporaryName: this.data.userDetail.user_name
    })
  },
  //修改性别
  modifyGender() {
    this.setData({
      modifyGenderDialog: true,
      temporaryGender: this.data.userDetail.gender
    })
  },
  changeName(options: any) {
    console.log(options.detail.value);
    this.data.temporaryName = options.detail.value;
  },
  //provider radio gender for user;
  onChangeGender(event: any) {
    console.log(event.detail)
    this.setData({
      temporaryGender: event.detail
    })
  },
  // submit Gender 
  submitGender() {
    request(`/api/user/updateGender?gender=${this.data.temporaryGender}`, 'POST').then((res: any) => {
      console.log("submitGender", res)
      const data = res.data;
      console.log(data)
      if (data.code === '1') {
        const tempObj = this.data.userDetail;
        tempObj.gender = this.data.temporaryGender;
        console.log("tempObj", tempObj)
        this.setData({
          userDetail: tempObj
        })
        wx.showToast({
          title: data.data,
          icon: "none",
          duration: 2000
        })
      } else {
        wx.showToast({
          title: data.data,
          icon: "none",
          duration: 2000
        })
      }
    })
    // console.log("submit gender of user" , this.data.temporaryGender)
  },

  // user click cell 
  onClickGender(event: any) {
    console.log(event)
    const { gender } = event.currentTarget.dataset;
    this.setData({
      temporaryGender: gender
    })
  },
  //提交修改后的姓名
  submitName() {
    //subimt to server if exisit 
    if (this.data.temporaryName) {
      console.log('changed after', this.data.temporaryName)
      request(`/api/user/updateName?userName=${this.data.temporaryName}`, 'POST').then((res: any) => {
        console.log(res)
        const data = res.data;
        //update the user name success;
        if (data.code === '1') {
          wx.showToast({
            title: "更新成功",
            icon: "none",
            duration: 2000
          })
          const tempObj = this.data.userDetail;
          tempObj.user_name = this.data.temporaryName;
          this.setData({
            userDetail: tempObj
          });
          // this.data.userDetail.user_name = 
        } else {
          //update the user name failure
          wx.showToast({
            title: "更新失败",
            icon: "none",
            duration: 2000
          })
        }
      })
    } else {
      console.log("user don't modified own name")
    }
  },
  //user name dialog close after
  onCloseOfNname() {
    console.log('onCloseOfNname')
    const tempName = this.data.userDetail.user_name;
    this.setData({
      temporaryName: tempName
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

  },
  //退出登录
  loginOut() {
    // console.log(".....")
    Dialog.confirm({
      title: '确认退出',
      message: '确认退出吗？',
    })
      .then(() => {
        // on confirm
        wx.clearStorageSync()
        wx.navigateBack({
          delta: 1
        })
        console.log("....")
      })
      .catch(() => {
        // on cancel
        console.log("这个什么都不做")
      });
  }
})