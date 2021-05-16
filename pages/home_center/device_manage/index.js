// miniprogram/pages/home_center/device_manage/index.js.js
import { RemoveDevice,ChangeDeviceName ,RestDevice} from '../../../utils/api/device-api'
import wxMqtt from '../../../utils/mqtt/wxMqtt'
import request from '../../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    ID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { device_icon, device_name, device_id } = options
    this.setData({ device_icon: `https://images.tuyacn.com/${device_icon}`, device_name, device_id })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  showDeviceInfo: function() {
    this.setData({ dialogShow: true })
  },

  //修改设备名字
  changDeviceName :function(){
    const { device_id } = this.data
  },

  //移除设备
  removeDevice:function(){
    const { device_id } = this.data
    const eleRes = RemoveDevice(device_id);
    console.log('eleRes',eleRes);
  },

  //设备恢复出厂设置
  resetDevice:function(){
      const { device_id } = this.data
      const eleRes = RestDevice(device_id);
      console.log('eleRes',eleRes);
  },

  //侦听修改设备名字框的文字输入
  bindKeyInput: function (e) {
    const { device_id } = this.data;
    var name =  e.detail.value;
    console.log(e);
    if ( name != '' )
    {
      const eleRes = ChangeDeviceName(device_id,name);
      console.log('eleRes',eleRes);
    }
  },

})