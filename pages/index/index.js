// index.js
// 获取应用实例
const app = getApp()
var util = require('../../utils/util.js')

Page({
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
 
    allSampleStatus: ["待上传", "分析中", "待诊断", "已诊断"],
    allSampleTypes: ["宫颈脱落细胞", "痰液", "尿液", "胸水", "腹水", "活检组织"],
    allReportTypes: ["TCT报告", "DNA报告", "TCT报告和DNA报告"],
    allSubmitInstitution: ["string", "哈尔滨理工大学校医", "医大二院", "测试送检部门-病理科", "测试检验中心"],

    sampleID: "",
    patientName: "",
    submitTime: {start: "", end: ""},
    sampleTime: {start: "", end: ""},
    sampleStatus: "",
    sampleType: "",
    reportType: "",
    submitInstitution: ""
  },

  save: function(e) {
    var key = e.target.id;
    this.setData({
      [key]: e.detail.value
    });
  },

  pickTime: function(e) {
    var key = e.target.id;
    this.setData({
      [key]: e.detail.value
    });
  },

  save_select: function(e) {
    var index = e.detail.value;
    var key = e.target.id;
    if (key == "sampleStatus") {
      this.setData({ [key]: this.data.allSampleStatus[index ]})
    } else if (key == "sampleType") {
      this.setData({ [key]: this.data.allSampleTypes[index]})
    } else if (key == "reportType") {
      this.setData({ [key]: this.data.allReportTypes[index ]})
    } else if (key == "submitInstitution") {
      this.setData({ [key]: this.data.allSubmitInstitution[index] })
    }
  },

  onShow() {
    var that = this;
    if (app.globalData.token != "") {
      wx.request({
        url: "http://cytopathology.jztai.com:9998/samples/noReviewed/1/10",
        method: "GET",
        data: {
          page: 1,
          size: 100
          // patientName: this.data.patientName,
          // sampleType: this.data.sampleType,
          // reportType: this.data.reportType,
          // sampleStartSendDate: this.data.submitTime.start,
          // sampleEndSendDate: this.data.submitTime.end,
          // sampleStartDate: this.data.sampleTime.start,
          // sampleEndDate: this.data.sampleTime.end,
          // sampleStatus: this.data.sampleStatus,
          // institutionId: this.data.submitInstitution
        },
        header: {
          'content-type': 'application/json',
          'Authorization': app.globalData.token
        },
        
        success(res) {
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
      wx.switch
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
