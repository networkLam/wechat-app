import URL from "../../utils/URL"
import request from "../../utils/request"
import Toast from '@vant/weapp/toast/toast';
// pages/productDetails/productDetails.ts
interface Picture{
 pd_id:String,
 pt_id:String,
 pt_path:String,
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetails:{
      picture:['../../static/test-product/redmi1.png','../../static/test-product/redmi2.png','../../static/test-product/redmi3.png',], //展示的图片
      // picture:[],
      product_name:"【购机赠蓝牙耳机】Redmi Turbo 3",//商品名称
      descript:"新品红米note turbo3手机小米官方旗舰店官网学生拍照智能性能正品小旋风", //产品描述
      price :"1999", //价格
      sale : "999+" ,//月销售
    },
    selected:false,
    show:false,
    pd_id : 0,
    isCollection:false //是否被收藏了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e:any) {
    // e里面的有产品的ID拿ID去请求网络即可获取数据
    const id= e.id;
    this.setData({
      pd_id:id
    })
    const describe = e.describe;
    const price = e.price;
    request(URL.GETPRODCUTMOMRPICTURE+id,"GET").then((res:any)=>{
      // console.log(res)
      const picture_data = res.data.data;
      const temp = {
        picture:[] as string[],
        product_name:"",//商品名称
        descript:"", //产品描述
        price :"", //价格
        sale : "999+" ,//月销售
      }
      temp.descript = describe;
      temp.price = price;
      picture_data.forEach((item:Picture,index:any)=>{
         temp.picture.push(("http://localhost:8080/upload/"+item.pt_path));
      })
      this.setData({
        productDetails:temp
      })
    });
    request(URL.QUERYCOLLECTION+id,'GET').then((res:any)=>{
      console.log(res)
      if(res.data.data == 'exist'){
        this.setData({
          isCollection:true
        })
      }else{
        this.setData({
          isCollection:false
        })
      }
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
  back(){
    console.log("go back privious page")
    wx.navigateBack({
      delta:1
    })
  },
  onClickIcon() {
   console.log("点击了图标")
  },

  onClickButton() {
    console.log('点击按钮');
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tocart(){
    // 点击按钮去购物车界面
    // 微信小程中如果想要跳转到tabBar那就不用使用navigateTo 而是使用swtichTab
    wx.switchTab({
      url:"/pages/cart/cart"
    })
  },
  onselected(){
    // 判定是否选中
    const temp_selected = this.data.selected;
    //对结果进行取反
    this.setData({
      selected : !temp_selected
    })
  },
  collection(){
    // console.log("collection")
    // console.log(this.data.pd_id)
   //如果isCollection 为true那么就express is hava collection ,
   if(!this.data.isCollection){
    request(URL.ADDCOLLECTION+this.data.pd_id,"GET").then((res:any)=>{
      const msg:string  = res.data.msg;
      if(msg =='success'){
        Toast.success(res.data.data);
        this.setData({
          isCollection:true
        })
      }else{
        Toast.fail(res.data.data);
      }
      // console.log(res)
    })
   }else{
    //to do operate of remove
    request(URL.REMOVECOLLECTION+this.data.pd_id,'GET').then((res:any)=>{
      // console.log(res)
      if(res.data.code == '1'){
        Toast.success(res.data.data);
        this.setData({
          isCollection:false
        })
      }
    })
   }
  }
})