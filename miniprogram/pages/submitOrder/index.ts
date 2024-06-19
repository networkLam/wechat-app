import request from '../../utils/request';
import URL from "../../utils/URL"
interface AddressInfo {
  addId: Number
  address: string
  contacts: string
  phone: string
  uid: Number
}
interface OrderDetail {
  pd_id: Number,
  amount: Number
}
interface OrderSubmit {
  // id: Number //暂时不需要用户id
  add_id: Number,
  productList: OrderDetail[]
}
interface ProductInfo {
  p_describe: string,//描述
  pd_id: number,//商品ID
  picture_name: string,//图片路径
  price: string,//价格
}
interface ShowData {
  id: number,
  title: string,
  picture: string,
  price: string,
  amount: number
}

// pages/submitOrder/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addId: 0,
    showInfo: {} as AddressInfo,
    isShow: false,
    OrderList: { add_id: 0, productList: [] } as OrderSubmit,
    howToHere: false, //false表示从商品详情页进入
    ShowList: [] as ShowData[],
    price : 0 //计算总价格
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {
    //两个分支 从购物车页面进入和从商品详情页进入
    // console.log(e)
    //这里接收所有的数据 然后计价
    // const type = e.type;
    // console.log("type is ", type)
    // if (type == "false") {
    //   this.data.howToHere = false;
    //   const pd_id = e.pd_id;//获取商品id
    //   console.log("pd_id : ", pd_id);
    //   this.data.OrderList.add_id = wx.getStorageSync("addId"); //获取绑定的地址id
    //   const buyList = JSON.stringify([{ pd_id, amount: 1 }]); //将对象转成字符串
    //   wx.setStorageSync("buy", buyList)//设置购买的列表
    // } else {
    //   //购物车界面进入
    //   this.data.howToHere = true;
    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  //计算总价
  onCompute(){
    let temp_price = 0;
    this.data.ShowList.forEach((item,index)=>{
      temp_price += Number( item.amount) * Number(item.price);
    })
    console.log("总价是：",temp_price)
    // temp_price = String(temp_price) ;
    this.setData({
      price : temp_price
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    //获取绑定的地址
    const addId = wx.getStorageSync("addId")
    console.log("addId:", addId)
    this.data.OrderList.add_id = addId; //获取绑定的地址id
    //地址信息是一定要获取的
    if (addId != undefined) {
      //获取地址ID上的信息
      request("/api/address/query?addId=" + addId, 'GET').then((res: any) => {
        // console.log(res)
        const { data }: { data: AddressInfo } = res.data;
        this.setData({
          showInfo: data,
          isShow: true
        })
      }).then(() => {
        //在这里查商品的信息
        let data = wx.getStorageSync("buy") as any;
        console.log("我到要看看你是个什么鬼")
        //从商品详情进入 object 从购物车进入 string
        console.log(typeof(data))
        //微信比较妖，有时候从storage中获取的数据是string类型有时候又是object类型所以需要判断
        if(typeof(data)  == "string"){
           data = JSON.parse(data)
        }
        const temp_arr = [] as any[];
        Promise.all(data.map(async (item: any) => {
          const productInfoRes: any = await request(URL.GETPRODUCTINFO + item.pd_id, 'GET');
          const { data: productInfo }: { data: ProductInfo } = productInfoRes.data;
          const temp_obj: ShowData = {
            id: productInfo.pd_id,
            title: productInfo.p_describe, // 使用商品描述作为标题  
            picture: "http://localhost:8080/upload/" + productInfo.picture_name,
            price: productInfo.price,
            amount: item.amount
          };
          temp_arr.push(temp_obj);
        })).then(() => {
          this.setData({
            ShowList: temp_arr
          })
          this.onCompute();
        })
      })
    } else {
      this.setData({
        isShow: false
      })
    }
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
  jump_address() {
    //跳到地址管理页面
    wx.navigateTo({
      url: "/pages/addressManage/addressManage?selection=true"
    })
  },
  onSubmit() {
    console.log("..")
    const temp = wx.getStorageSync("buy");
    const add_id = wx.getStorageSync("addId");
    console.log("buys:", temp)
    console.log("add_id:", add_id)
    const OrderList:OrderSubmit = {add_id,productList:[]}
    this.data.ShowList.forEach((item,index)=>{
      const temp = {pd_id:0,amount:0}
      temp.pd_id = item.id;
      temp.amount = item.amount;
      OrderList.productList.push(temp)
    })
    console.log("要提交的数据",OrderList)
     request("/api/user/buy",'POST',{...OrderList}).then((res)=>{
       console.log(res)
     })
  },
  
})