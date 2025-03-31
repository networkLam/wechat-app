import request from '../../utils/request';
import URL from "../../utils/URL"
import Toast from '@vant/weapp/toast/toast';
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
  productList: OrderDetail[],
  gate: Number
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

interface ProductDetail {
  pictureList: { pt_id: number, pt_path: string, pd_id: number }[],
  product: {
    number_signle: string,
    p_describe: string,
    p_name: string,
    pd_id: number,
    pd_type: string,
    picture_name: string,
    price: string,
    state: string,
    time: string
  }
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
    OrderList: { add_id: 0, productList: [], gate: 0 } as OrderSubmit,
    howToHere: false, //false表示从商品详情页进入
    ShowList: [] as ShowData[],
    price: 0 //计算总价格
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(e: any) {


  },

  //计算总价
  onCompute() {
    let temp_price = 0;
    this.data.ShowList.forEach((item, index) => {
      temp_price += Number(item.amount) * Number(item.price);
    })
    console.log("总价是：", temp_price)
    // temp_price = String(temp_price) ;
    this.setData({
      price: temp_price
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
        console.log(res)
        const data: { code: string, data: AddressInfo, msg: string } = res.data;
        if (data.code === "1") {
          //能成功的返回地址
          this.setData({
            showInfo: data.data,
            isShow: true
          })
        } else {
          //地址不存在
          this.setData({
            isShow: false
          })
          // return Promise.reject("地址不存在")
        }
      }).then(() => {
        //在这里查商品的信息
        let data = wx.getStorageSync("buy") as any;
        //从商品详情进入 object 从购物车进入 string
        //微信比较妖，有时候从storage中获取的数据是string类型有时候又是object类型所以需要判断
        if (typeof (data) == "string") {
          data = JSON.parse(data)
        }
        const temp_arr = [] as any[];
        Promise.all(data.map(async (item: any) => {
          const productInfoRes: any = await request(URL.GETPRODUCTINFO + item.pd_id, 'GET');
          console.log("result = ", productInfoRes)
          const { data }: { data: ProductDetail } = productInfoRes.data;
          const temp_obj: ShowData = {
            id: data.product.pd_id,
            title: data.product.p_describe, // 使用商品描述作为标题  
            picture: "http://localhost:8080/upload/" + data.product.picture_name,
            price: data.product.price,
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

  jump_address() {
    //跳到地址管理页面
    wx.navigateTo({
      url: "/pages/addressManage/addressManage?selection=true"
    })
  },
  onSubmit() {
    // console.log("..")
    // const temp = wx.getStorageSync("buy");

    // console.log("要提交的数据",OrderList)
    if (this.data.isShow) {
      const add_id = wx.getStorageSync("addId");
      const gate = wx.getStorageSync("gate")
      const OrderList: OrderSubmit = { add_id, productList: [], gate }
      this.data.ShowList.forEach((item, index) => {
        const temp = { pd_id: 0, amount: 0 }
        temp.pd_id = item.id;
        temp.amount = item.amount;
        OrderList.productList.push(temp)
      })
      request("/api/user/buy", 'POST', { ...OrderList }).then((res: any) => {
        const { code } = res.data;
        if (code == "1") {
          Toast.loading({
            message: '提交中...',
            forbidClick: true,
            duration: 2000,
            onClose: () => {
              Toast({
                type: 'success',
                message: '提交成功',
                duration: 2000,
                onClose: () => {
                  wx.navigateBack({
                    delta: 1
                  })
                },
              });
            }
          });
        }
      })
    } else {
      Toast.fail('请选择收货地址');
    }

  },
})