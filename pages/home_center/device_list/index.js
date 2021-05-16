// miniprogram/pages/home_center/device_list/index.js.js
import { getDeviceList ,getMqttconfig} from '../../../utils/api/device-api'
import wxMqtt from '../../../utils/mqtt/wxMqtt';
import request from '../../../utils/request';

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    active: 0,
    deviceList: [],

    cloudInner: {
      isDroped: false,
      url: '/pages/cloud_check/index'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function () {
    const deviceList = await getDeviceList()
    deviceList.forEach(item => {
      item.icon = `https://images.tuyacn.com/${item.icon}`
    })
    this.setData({ deviceList })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const { cloudInner } = this.data;
    const { miniProgram } = wx.getAccountInfoSync();
    wx.cloud.init({ env: `ty-${miniProgram.appId}` });

    try {
      const { device_id } = await request({
        name: 'ty-service',
        data: {
          action: 'device.virtualAdd',
          params: {
            product_id: 'nr1k9ptidpovo0c5',
            token: 'release_common_component'
          }
        }
      });

      if (!device_id) {
        throw '检测到未部署SDK';
      }

      cloudInner.isDroped = true;
      this.setData({ cloudInner: { ...cloudInner } });

      wx.setStorageSync('vir_device', device_id);
      let {
        client_id,
        password,
        source_topic: { device: topic },
        url,
        username
      } = await getMqttconfig();

      wxMqtt.connectMqtt(url, { clientId: client_id, username, password, subscribeTopics: topic });
    } catch (error) {
      // wx.showModal({
      //   title: '检测到未部署SDK',
      //   content: '后续功能操作都需要SDK能力, 请去涂鸦开发平台程序一键部署SDK'
      // })
      cloudInner.isDroped = false;
      this.setData({ cloudInner: { ...cloudInner } });
    }
  },

  jumpToPanel({currentTarget}) {
    const { dataset: { device } } = currentTarget
    const { id, category, name } = device
    switch (category) {
      case 'kg': break;
      default: {
        wx.navigateTo({
          url: `/pages/home_center/common_panel/index?device_id=${id}&device_name=${name}`,
        })
      }
    }
  },
  jumpToOther({currentTarget}) {
    const { dataset: { device } } = currentTarget
    const { id, category, name } = device
    switch (category) {
      case '': break;
      default: {
        wx.navigateTo({
          url: `/pages/home_center/test_component/index?device_id=${id}&device_name=${name}`,
        })
      }
    }
  }
})