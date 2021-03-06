// logs.js
import Toast from '@vant/weapp/toast/toast';

const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: [],
    name: "管理员",
    password: "1111",
    token: ""
  },

  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },

  login_input_user: function(e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },

  login_input_password: function(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },

  login: function(e) {
    var that = this;
    wx.request({
      url: "http://cytopathology.jztai.com:9998/users/login",
      method: "POST",
      data: {
        loginName: this.data.name,
        passWord: this.data.password
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success(res) {
        var token = JSON.parse(res.data.message);
        getApp().globalData.token = token["tokenHead"]  + token["token"];
        that.setData({
          token: app.globalData.token
        })
        console.log(app.globalData.token);
        Toast.success("登陆成功")
      },
      fail(res) {
        console.log("fail")
      }
    })
  }
})
