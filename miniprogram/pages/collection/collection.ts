// pages/collection/collection.ts
import request from "../../utils/request"
import URL from "../../utils/URL"
interface RequestBody{
  id:number,
  uid:number,
  pd_id:number,
  date:string
}
interface RequestData{
  code:string,
  data:RequestBody[],
  msg:string
}
interface ProductList{
  describe:string,
  price:string,
  src:string,
  id:number
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBack:false,
    product_list :[] as ProductList[]
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //请求收藏的数据
    request(URL.GETCOLLECTION,"GET").then((res:any)=>{
      const data:RequestData = res.data;
      const temp_arr = [] as any[];
      Promise.all(data.data.map(async (item)=>{
        const pd_id = item.pd_id;
       await request(URL.GETPRODUCTINFO+pd_id,'GET').then((res:any)=>{
          const temp_obj = {describe:"",price:"",src:"",id:0};
          const {data} = res.data;
          temp_obj.describe = data.p_describe;
          temp_obj.price = data.price;
          temp_obj.src = "http://localhost:8080/upload/" + data.picture_name;
          temp_obj.id = pd_id;
          temp_arr.push(temp_obj);
      })
      })).then(()=>{
        this.setData({
          product_list:temp_arr
        })
      }).catch(()=>{
        console.log("get collection list fail")
      })
    })
  },

  onPageScroll(e:any){
    // console.log(e)
    if(e.scrollTop <= 200){
      this.setData({
        isShowBack:false
      })
    }else{
      this.setData({
        isShowBack:true
      })
    }
  },
  backTop(){
    // console.log("you have clicked this element")
    wx.pageScrollTo({
      scrollTop:0
    })
  },
  jump(e:any){
    //take out ontap the id
    const index = e.currentTarget.dataset.k;
   const pd_id = this.data.product_list[index].id;
   const {describe} = this.data.product_list[index];
   const {price} = this.data.product_list[index];
    console.log(pd_id)
    //got it id after jump product detail page
    wx.navigateTo({
      url: "/pages/productDetails/productDetails?id=" + pd_id+'&describe='+describe+'&price='+price,
    })
  }
})