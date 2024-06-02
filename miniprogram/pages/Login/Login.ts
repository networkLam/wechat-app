// pages/Login/Login.ts
import Dialog from '@vant/weapp/dialog/dialog';
import request from '../../utils/request';
import URL from "../../utils/URL"
import Toast from '@vant/weapp/toast/toast';
interface Data {
  code: string,//错误代码
  data: string,//数据区域
  msg: string//返回该消息的内容
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    //密码
    Password: "",
    // 确认密码
    confirm: "",
    isLogin: true
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
  onClickIcon(e: any) {
    console.log(e)
  },
  async send_login_in() {
    //还需要判断一下手机号和用户名是否为空
    if (this.data.phone == "" || this.data.Password == "") {
      Toast.fail({
        message: "账号或密码为空，请检查。",
        duration: 3000
      })
      return;
    }
    Toast.loading({
      message: "登录中...",
      forbidClick: true,
      duration: 0 //展示时长，值为0时一直展示
    })
    await request(URL.LOGIN, "POST", { phone: this.data.phone, user_pwd: this.data.Password })
      .then((res: any) => {
        const data_: Data = res.data;
        if (data_.code === '0') {
          Toast.fail(data_.data);
        } else if (data_.code === '1') {
          Toast.success(data_.msg)
          //登录完成后保存token
          wx.setStorage({
            key: "token",
            data: data_.data,
            success: () => {
              // console.log("登录成功")
              //登录成功后返回“我的”界面
              wx.navigateBack({ delta: 1 });
            }
          })
        }
        // 定时器有问题
        //Toast.clear();
      }).catch(err => {
        Toast.fail("连接服务器失败!");
        console.log(err);
      })

  },
  //变为注册页面
  sign_up() {
    // console.log("-----")
    const isLogin = this.data.isLogin as boolean;
    if (isLogin == true) {
      this.setData({
        isLogin: false
      })
    } else {
      this.setData({
        isLogin: true
      })
    }
  },

  //注册用户
  send_sign_up() {
    if (this.data.confirm == this.data.Password && this.data.confirm != "" && this.data.Password != "" && this.data.phone != "") {
      // console.log("注册成功")
      request(URL.REGISTER, "POST", { phone: this.data.phone, pwd: this.data.Password })
        .then((res: any) => {
          console.log(res)
          if (res.data.code == "0") {
            const msg = res.data.data;
            Dialog.alert({
              title: "错误",
              message: msg,
            })
          } else {
            // 注册成功后需要清空Passwrod,phone变量值，然在在回到登录页面
            this.setData({
              confirm: "",
              //  isLogin : true
            })
            Dialog.alert({
              message: '注册成功',
            }).then(() => {
              // on close
              this.setData({
                isLogin: true
              })
            });
          }
        })

    } else {
      if (this.data.phone == "") {
        Dialog.alert({
          title: "错误",
          message: '手机号为空',
        })
      } else if (this.data.Password == "") {
        Dialog.alert({
          title: "错误",
          message: '密码为空',
        })
      } else if (this.data.Password != this.data.confirm) {
        Dialog.alert({
          title: "错误",
          message: '两次密码不一致。',
        })
      }
    }
  },
  //回到上一页
  back_info() {
    wx.navigateBack({
      delta: 1
    })
  },
  //忘记密码
  forgotpwd() {
    wx.showToast({
      title: "功能尚未开发",
      icon: "error",
      duration: 2000
    })
  }
})