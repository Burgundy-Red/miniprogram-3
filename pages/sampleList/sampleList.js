// pages/diagnosis.js

const app = getApp()
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tableHeader: [
      {
        prop: 'sampleStatus',
        width: 150,
        label: '样本状态',
        color: '#409eff'
      },
      {
        prop: 'sampleNum',
        width: 250,
        label: '样本编号'
      },
      {
        prop: 'patientName',
        width: 152,
        label: '姓名'
      },
      {
        prop: 'institution',
        width: 200,
        label: '检测机构'
      },
      {
        prop: 'operate',
        width: 110,
        label: '操作',
        color: '#FF0000'
      }
    ],
    stripe: true,
    border: true,
    outBorder: true,
  },

  onShow() {
    var that = this;
    if (app.globalData.token != "") {
      wx.request({
        url: "http://cytopathology.jztai.com:9998/samples/noReviewed/1/10",
        method: "GET",
        data: {
          page: 1,
          size: 10
        },
        header: {
          'content-type': 'application/json',
          'Authorization': app.globalData.token
        },
        
        success(res) {
          console.log(res.data)
          var records = res.data.data.records;
          that.setData({
            row: util.getRecord(records)
          });
        },
        fail(res) {
          console.log("fail")
        }
      })
    }; 
  },
  onRowClick: function(e) {
    console.log(e)
    var column = e.detail.currentTarget.dataset.row;
    if (column == 4) {
      wx.navigateTo({
      })
    }
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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})