// pages/category/index.ts
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
interface ResponseBody {
  code: "0" | "1",
  data: ProductRequest[] | string
  msg: string
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultData: [] as ProductRequest[],
    offset: 0,
    category: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    console.log(e)
    const category = e.category;
    this.data.category = category;
    this.getCategoryData()
  },
  getCategoryData() {
    request(`/api/product/category?category=${this.data.category}&offset=${this.data.offset}`, 'POST').then((res: any) => {
      console.log(res)
      const data: ResponseBody = res.data;
      if (data.code === '1') {
        const remoteData = data.data as ProductRequest[];
        const mergeData = [...this.data.resultData, ...remoteData];
        this.setData({
          resultData: mergeData
        })
      } else {
        wx.showToast({
          title: data.data as string,
          icon: "none",
          duration: 3000
        })
      }
    })
  },
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
    wx.navigateBack()
  },
  jump(e: any) {
    //take out ontap the id
    const index = e.currentTarget.dataset.k;
    const pd_id = this.data.resultData[index].pd_id;
    const { p_describe } = this.data.resultData[index];
    const { price } = this.data.resultData[index];
    console.log(pd_id)
    //got it id after jump product detail page
    wx.navigateTo({
      url: "/pages/productDetails/productDetails?id=" + pd_id + '&describe=' + p_describe + '&price=' + price,
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
  onReachBottom() {
    this.data.offset += 10;
    console.log("触底了")
    this.getCategoryData();
  }

})