// pages/collection/collection.ts
import request from "../../utils/request"
import URL from "../../utils/URL"
interface RequestBody {
  c_id: number,
  date: string
  p_describe: string
  pd_id: number
  picture_name: string
  price: string
  state: string
}
interface RequestData {
  code: string,
  data: RequestBody[],
  msg: string
}
interface ProductList {
  describe: string,
  price: string,
  src: string,
  id: number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBack: false,
    product_list: [] as ProductList[],
    collectionList: [] as RequestBody[], //用户收藏列表
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //请求收藏的数据
    request(URL.GETCOLLECTION, "GET").then((res: any) => {
      console.log(res)
      const data: RequestData = res.data;
      console.log(data)
      if (data.data.length === 0) {
        wx.showToast({
          title: "暂无收藏",
          icon: "none",
          duration: 3000
        })
      }
      this.setData({
        collectionList: data.data
      })
    })
  },

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
  backTop() {
    // console.log("you have clicked this element")
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  jump(e: any) {
    //take out ontap the id
    const pd_id = e.currentTarget.dataset.k;
    // const pd_id = this.data.product_list[index].id;
    // const { describe } = this.data.product_list[index];
    // const { price } = this.data.product_list[index];
    // console.log(pd_id)
    //got it id after jump product detail page
    wx.navigateTo({
      url: "/pages/productDetails/productDetails?id=" + pd_id
    })
  }
})