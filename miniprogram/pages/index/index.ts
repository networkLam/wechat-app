// index.ts
// 获取应用实例
// const app = getApp<IAppOption>()
// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// Component({

// })
import URL from "../../utils/URL"
import request from "../../utils/request"
interface ProductInfo {
  p_describe: String,//描述
  pd_id: number,//商品ID
  picture_name: String,//图片路径
  price: String,//价格
}
interface ProductRequest {
  p_describe: String
  p_name: String
  pd_id: number
  pd_type: String
  picture_name: String
  price: String
  state: String
  time: String
}


Page({
  data: {
    userData: [{}],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    swiperNav: {
      i: 0,
      x: 0,
      arr: [
        { v: 0, txt: "星期一" },
        { v: 1, txt: "星期二" },
        { v: 2, txt: "星期三" },
        { v: 3, txt: "星期四" },
        { v: 4, txt: "星期五" },
        { v: 5, txt: "星期六" }
      ]
    },
    active: 0,
    isShowBack: false,
    productData: [{}],//商品的数据


  },
  // what's the function did ?
  showUser() {
    wx.setStorageSync("key", 'value');
    return ""
  },
  onChange(event: any) {
    console.log(event.detail)

    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  todetails(event: any) {
    //获取产品ID
    // console.log(detail)
    const product_id: string = event.target.id;
    const describe = event.detail.describe;
    const price =  event.detail.price;
    // console.log(product_id);
    wx.navigateTo({
      url: "/pages/productDetails/productDetails?id=" + product_id+'&describe='+describe+'&price='+price,
    })
  },
  tosearch() {
    // click search icon to search page
    wx.navigateTo({
      url: "/pages/search/search"
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
  onLoad() {
    console.log("加载时自动运行")
    //初始化数据
    request(URL.GETGOODS + 0, 'GET').then((res: any) => {
      const data = res.data.data;
      const temp_arr: ProductInfo[] = []
      data.forEach((item: ProductRequest, index: any) => {
        console.log(item)
        const temp_obj: ProductInfo = { p_describe: "", pd_id: 0, picture_name: "", price: "" }
        temp_obj.p_describe = item.p_describe;
        temp_obj.pd_id = item.pd_id;
        temp_obj.price = item.price;
        temp_obj.picture_name = "http://localhost:8080/upload/"+item.picture_name;
        temp_arr.push(temp_obj);
      })
      this.setData({
        productData:temp_arr
      })
    })
  },
init(){


},

  onPullDownRefresh() {
    request(URL.GETGOODS + 0, 'GET').then((res: any) => {
      const data = res.data.data;
      const temp_arr: ProductInfo[] = []
      data.forEach((item: ProductRequest, index: any) => {
        console.log(item)
        const temp_obj: ProductInfo = { p_describe: "", pd_id: 0, picture_name: "", price: "" }
        temp_obj.p_describe = item.p_describe;
        temp_obj.pd_id = item.pd_id;
        temp_obj.price = item.price;
        temp_obj.picture_name = "http://localhost:8080/upload/"+item.picture_name;
        temp_arr.push(temp_obj);
      })
      this.setData({
        productData:temp_arr
      })
    })
  },
})