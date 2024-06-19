import URL from "../../utils/URL"
import request from "../../utils/request"
import Toast from '@vant/weapp/toast/toast';
// pages/productDetails/productDetails.ts
interface Picture {
  pd_id: String,
  pt_id: String,
  pt_path: String,
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetails: {
      picture: ['../../static/test-product/redmi1.png', '../../static/test-product/redmi2.png', '../../static/test-product/redmi3.png',], //展示的图片
      // picture:[],
      product_name: "【购机赠蓝牙耳机】Redmi Turbo 3",//商品名称
      descript: "新品红米note turbo3手机小米官方旗舰店官网学生拍照智能性能正品小旋风", //产品描述
      price: "1999", //价格
      sale: "999+",//月销售
    },
    selected: false,
    show: false,
    pd_id: 0,
    isCollection: false //是否被收藏了
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    // e里面的有产品的ID拿ID去请求网络即可获取数据
    const id = e.id;
    this.setData({
      pd_id: id
    })
    const describe = e.describe;
    const price = e.price;
    request(URL.GETPRODCUTMOMRPICTURE + id, "GET").then((res: any) => {
      // console.log(res)
      const picture_data = res.data.data;
      const temp = {
        picture: [] as string[],
        product_name: "",//商品名称
        descript: "", //产品描述
        price: "", //价格
        sale: "999+",//月销售
      }
      temp.descript = describe;
      temp.price = price;
      picture_data.forEach((item: Picture, index: any) => {
        temp.picture.push(("http://localhost:8080/upload/" + item.pt_path));
      })
      this.setData({
        productDetails: temp
      })
    });
    request(URL.QUERYCOLLECTION + id, 'GET').then((res: any) => {
      // console.log(res)
      if (res.data.data == 'exist') {
        this.setData({
          isCollection: true
        })
      } else {
        this.setData({
          isCollection: false
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
  back() {
    console.log("go back privious page")
    wx.navigateBack({
      delta: 1
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
  tocart() {
    // 点击按钮去购物车界面
    // 微信小程中如果想要跳转到tabBar那就不用使用navigateTo 而是使用swtichTab
    wx.switchTab({
      url: "/pages/cart/cart"
    })
  },
  onselected() {
    // 判定是否选中
    const temp_selected = this.data.selected;
    //对结果进行取反
    this.setData({
      selected: !temp_selected
    })
  },
  collection() {
    //如果isCollection 为true那么就express is hava collection ,
    if (!this.data.isCollection) {
      request(URL.ADDCOLLECTION + this.data.pd_id, "GET").then((res: any) => {
        const msg: string = res.data.msg;
        if (msg == 'success') {
          Toast.success(res.data.data);
          this.setData({
            isCollection: true
          })
        } else {
          Toast.fail(res.data.data);
        }
        // console.log(res)
      })
    } else {
      //to do operate of remove
      request(URL.REMOVECOLLECTION + this.data.pd_id, 'GET').then((res: any) => {
        // console.log(res)
        if (res.data.code == '1') {
          Toast.success(res.data.data);
          this.setData({
            isCollection: false
          })
        }
      })
    }
  },
  addCart() {
    //console.log("add cart list")
    if (this.data.show == true) {
      //弹窗弹起后才能执行的逻辑
      if (this.data.selected == true) { //用户必须选择了规格后才能添加到购物车或或者购买
        //发起网络请求到购物车中
        // console.log("lunch network request --> additional into cart ")
        request(URL.ADDCART, 'POST', {
          pd_id: this.data.pd_id
        }).then((res: any) => {
          //console.log("print is cart about ")
          console.log(res);
          //添加成功的弹窗
          const title = res.data.data;
          wx.showToast({
            title,
            icon: "success",
            duration: 2000
          })
          //添加到购物车后关闭popup
          this.setData({ show: false });
        })

      } else {
        //打开了弹窗，但是没有选择规格
        wx.showToast({
          title: "请选择规格",
          icon: "error"
        })
      }
    } else {
      //弹窗没弹起就先弹起
      this.setData({ show: true });
    }
  },
  //重要的业务逻辑
  buy() {
    if (this.data.show == true) {
      //弹窗弹起后才能执行的逻辑
      if (this.data.selected == true) {
        //jump to order page
        // console.log("lunch network request --> buy ")
        //先建数据传到本地仓库
        const temp_arr = [] as any [];
        const pd_id = Number(this.data.pd_id)
        const temp_obj = {pd_id,amount:1};
        temp_arr.push(temp_obj);
        wx.setStorageSync("buy",temp_arr)
        wx.setStorageSync("gate",0) //单买设为0
        wx.navigateTo({
          url:`/pages/submitOrder/index`
        })
        this.setData({ show: false });
      } else {
        wx.showToast({
          title: "请选择规格",
          icon: "error"
        })
      }
    } else {
      //弹窗没弹起就先弹起
      this.setData({ show: true });
    }
  }
})