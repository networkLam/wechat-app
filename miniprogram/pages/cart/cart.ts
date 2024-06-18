// pages/cart/cart.ts
import URL from "../../utils/URL"
import request from "../../utils/request"

interface ShowCart {
  id: number,
  title: string,
  picture: string,
  price: string,
  product_type: string,
  check: boolean,
  amount: number
}

interface RequestData {
  id: number,
  amount:number,
  pd_id: number,
  uid?: string,
  join_time?: string
}
interface ProductInfo {
  p_describe: string,//描述
  pd_id: number,//商品ID
  picture_name: string,//图片路径
  price: string,//价格
}

Page({
  /**
   * 页面的初始数据
   */
  // 价格的单位要换成分 cent
  data: {
    // {id:"",picture:"",price:"", check:true,amount:"" }
    // cart_storage: [{ id: 12138, title: "【购机赠蓝牙耳机】Redmi Turbo 3", picture: "../../static/test-product/redmi1.png", price: "199900", product_type: "默认", check: false, amount: 2 },
    // { id: 12139, title: "【购机赠蓝牙耳机】Redmi Turbo 3", picture: "../../static/test-product/redmi2.png", price: "199900", product_type: "默认", check: false, amount: 1 }, { id: 12140, title: "【购机赠蓝牙耳机和钢化膜】Redmi Turbo 3", picture: "../../static/test-product/redmi2.png", price: "199998", product_type: "默认", check: false, amount: 1 }] as ShowCart[],
    cart_storage:[] as ShowCart[],
    //  show total amount price
    price: 0,
    // whether is show delete button
    isDelete: false
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
  const temp_arr: ShowCart[] = [];  
  request(URL.GETCARTLIST, 'GET').then((res: any) => {  
    const { data }: { data: RequestData[] } = res.data;  
    // 使用 Promise.all 来等待所有异步请求完成  
    Promise.all(data.map(async (item) => {  
      const productInfoRes:any = await request(URL.GETPRODUCTINFO + item.pd_id, 'GET');  
      const { data: productInfo }: { data: ProductInfo } = productInfoRes.data;  
      const temp_obj: ShowCart = {  
        id: productInfo.pd_id,  
        title: productInfo.p_describe, // 使用商品描述作为标题  
        picture: "http://localhost:8080/upload/" + productInfo.picture_name,  
        price: productInfo.price,  
        product_type: '',
        check: false,  
        amount: item.amount  
      };  
      temp_arr.push(temp_obj);  
    })).then(() => {  
      // 所有请求都完成后，再调用 setData  
      this.setData({  
        cart_storage: temp_arr  
      });  
      console.log(this.data.cart_storage);  
    }).catch((error) => {  
      // 处理错误  
      console.error('Error', error);  
    });  
  });  
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
  oncheck(e: any) {
    // get id
    const index: number = Number(e.detail.index);
    const check: boolean = e.detail.check;
    // get check boolean value confirm
    this.data.cart_storage[index].check = check;
    console.log(this.data.cart_storage);
    this.computeAmount();
  },
  computeAmount() {
    let total_price = 0;
    for (const item in this.data.cart_storage) {
      if (this.data.cart_storage[item].check == true) {
        total_price += Number(this.data.cart_storage[item].price) * Number(this.data.cart_storage[item].amount);
      }
    }
    total_price = total_price*100;
    this.setData({
      price: total_price
    })
  },
  //更新数量
  updateamount(e: any) {
    console.log(e);
    const index: number = Number(e.detail.index);
    const num: number = e.detail.num;
    const pd_id = this.data.cart_storage[index].id;
    console.log()
    request('/api/cart/modify','POST',{pd_id,amount:num}).then((res:any)=>{
      console.log(res);
      // const {data} = res.data;
      this.data.cart_storage[index].amount = num;
      // console.log(this.data.cart_storage[index].amount)
      this.setData({
        cart_storage:this.data.cart_storage
      })
  })

    // this.data.cart_storage[index].amount = num.toString();
    // // console.log(this.data.cart_storage)
    // this.setData({
    //   cart_storage: this.data.cart_storage
    // })
    this.computeAmount();
  },
  // to isDelete value reverse 
  manage() {
    // be updata UI only when using setData API
    this.setData({
      isDelete: !this.data.isDelete
    })
  }
})