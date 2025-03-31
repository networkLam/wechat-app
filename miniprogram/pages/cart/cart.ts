// pages/cart/cart.ts
import URL from "../../utils/URL"
import request from "../../utils/request"

interface ShowCart {
  id: number,
  title: string,
  picture: string,
  price: string,
  product_type: string,
  check: boolean, //false 为不打钩
  amount: number,
  cartId: number
}

interface RequestData {
  id: number,
  amount: number,
  pd_id: number,
  uid?: string,
  join_time?: string
}
//查询购物车中的数据
interface ResponseData {
  id: number,
  amount: number,
  pd_id: number,
  join_time: string,
  p_describe: string,
  p_name: string,
  pd_type: string,
  picture_name: string,
  price: string
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
    cart_storage: [] as ShowCart[],
    //  show total amount price
    price: 0,
    // whether is show delete button
    isDelete: false
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadingData();
  },
  //从购物车中移除商品
  removeProductFromCart(e: any) {
    console.log(e)
    const cartId = e.detail.cartId;
    const index = e.detail.index;
    request(`/api/cart/del?id=${cartId}`, 'POST').then(res => {
      console.log("移除", res)
      const temp = this.data.cart_storage;
      temp.splice(Number(index), 1);
      this.setData({
        cart_storage: temp
      })
      this.computeAmount();//移除时从新计算一遍价格
    })
  },

  loadingData() {
    const temp_arr: ShowCart[] = [];
    request(URL.GETCARTLIST, 'GET').then((res: any) => {
      const { data }: { data: ResponseData[] } = res.data;
      console.log("购物车中的数据", data)
      if (data.length != 0) {
        data.forEach((item) => {
          const temp_obj: ShowCart = {
            id: item.pd_id,
            title: item.p_describe, // 使用商品描述作为标题  
            picture: "http://localhost:8080/upload/" + item.picture_name,
            price: item.price,
            product_type: '',
            check: false,
            amount: item.amount,
            cartId: item.id
          };
          temp_arr.push(temp_obj);
        })
        this.setData({
          cart_storage: temp_arr,
          price: 0
        });
      }
    });
  },

  oncheck(e: any) {
    // get id
    const index: number = Number(e.detail.index);
    // const check: boolean = e.detail.check;
    // get check boolean value confirm
    this.data.cart_storage[index].check = !this.data.cart_storage[index].check;
    const temp = this.data.cart_storage
    this.setData({
      cart_storage: temp
    })
    // console.log(this.data.cart_storage);
    this.computeAmount();
  },
  computeAmount() {
    let total_price = 0;
    for (const item in this.data.cart_storage) {
      if (this.data.cart_storage[item].check == true) {
        total_price += Number(this.data.cart_storage[item].price) * Number(this.data.cart_storage[item].amount);
      }
    }
    total_price = total_price * 100;
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
    request('/api/cart/modify', 'POST', { pd_id, amount: num }).then((res: any) => {
      console.log(res);
      // const {data} = res.data;
      this.data.cart_storage[index].amount = num;
      // console.log(this.data.cart_storage[index].amount)
      this.setData({
        cart_storage: this.data.cart_storage
      })
    })
    this.computeAmount();
  },
  // to isDelete value reverse 
  manage() {
    // be updata UI only when using setData API
    this.setData({
      isDelete: !this.data.isDelete
    })
  },
  onSubmit() {
    console.log("onSubmit")
    const temp_arr = [] as any[];
    this.data.cart_storage.forEach((item, index) => {
      if (item.check == true) {
        console.log(item)
        //在点提交的时候就把数据往本地存储 这样就不用把数据传来传去了
        const pd_id = item.id;
        const amount = item.amount;
        temp_arr.push({ pd_id, amount })
      }
    })
    console.log("需购的商品如下", temp_arr)
    //把数据传到本地仓库里
    wx.setStorageSync("buy", JSON.stringify(temp_arr));
    wx.setStorageSync("gate", 1);//从购物车进入
    wx.navigateTo({
      url: `/pages/submitOrder/index`
    })
  },
  onHide() {
    this.setData({
      isDelete: false,
      cart_storage: [],
      price: 0
    })
  }
})