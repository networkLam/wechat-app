// pages/info/info.ts
import request from '../../utils/request'
import URL from "../../utils/URL"
interface PageNum{
  num:number
}
interface UserInfo{
  gender:string,
  phone:string,
  user_name:string,
  src ? :string
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    listInfo:["收货地址管理","账号与安全","安全中心","意见反馈","关于我们"],
    badge:"10",
    myOrder_Init:[{name:"待付款",src:"../../static/icon/card.svg"},{name:"待发货",src:"../../static/icon/pack.svg"},{name:"待收货",src:"../../static/icon/transport.svg"},{name:"待评论",src:"../../static/icon/comment.svg"},{name:"退款/售后",src:"../../static/icon/refun.svg"}],
    login:false,
    user_info:{gender:"",phone:"",user_name:""}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   
    // request('');
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
     // 如果能获取到token那就证明用户是登录过的，那么就从token中获取用户的数据
     this.setData({
      login: wx.getStorageSync("token") != '' ? true : false 
    })
    request(URL.USERINFO,"GET")
    .then((res:any)=>{
      const data = res.data.data;
      // console.log(data)
      // console.log(res)
     if(res.data.data === "NOT_LOGIN"){
      // wx.setStorageSync("token","");
       wx.removeStorageSync("token");
       this.setData({
         login:false
       })
     }
     //building a temporary user object
     const temp_userInfo = {
       gender:data.gender,
      phone:data.phone,
      user_name:data.user_name}
      // console.log(temp_userInfo)
      this.setData({
        user_info : temp_userInfo
      })
      // console.log(this.data.user_info)
      
    }).catch(err=>{
      wx.removeStorageSync("token");
      this.setData({
        login:false
      })
      console.log(err)
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

  gotoDetail(){
    // 如果用户未登录
    if(this.data.login==false){
      //写个登录界面
      console.log("跳转到登录页面")
      wx.navigateTo({
        url:"/pages/Login/Login"
      })
    }else{
      wx.navigateTo({
      url:"/pages/UserDetail/UserDetail?value="+JSON.stringify(this.data.user_info),
      
    })
    }
    
  },
  toPage(e:any){
    const Pages = e.currentTarget.dataset as PageNum;
    if(Pages.num == 0){
      console.log("to waiting pay page")
    }else if(Pages.num == 1){

    }else if(Pages.num == 2){
      
    }else if(Pages.num == 3){
      
    }else if(Pages.num == 4){
      
    }
  },
  onEvent(e:any){
    console.log("子组件",e);
  },
  onMyEvent(event:any) {
    console.log(event.detail.data) // 输出 hello parent
  }
})