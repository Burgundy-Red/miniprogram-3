// pages/report/report.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSquamousEpitheliumStatus: ['未见上皮内病变或恶性病变', '非典型鳞状细胞，不能明确意义', '非典型鳞状细胞，不除外高级别鳞状上皮内病变', '低级别鳞状上皮内病变', '高级别鳞状上皮内病变', '鳞状细胞癌'],
    allGlandularEpitheliumStatus: ['非典型，子宫颈管细胞', '非典型，子宫内膜细胞', '非典型，腺细胞', '非典型，子宫颈管腺细胞，倾向肿瘤', '非典型，腺细胞，倾向肿瘤', '子宫颈管原位腺癌', '腺癌，子宫颈管腺癌', '腺癌，子宫内膜腺癌', '腺癌，子宫外腺癌', '腺癌，没有特别指明类型的腺癌', '其他类别恶行肿瘤'],

    showCollapseNames: [],
    satisfaction: "",             // 样本满意度
    noEpithelialCells: "",        // 上皮细胞数
    noCervicalCells: "",           // 宫颈管细胞数
    metaplasticCells: "",         // 化生细胞
    inflammatoryCells: "",        // 炎性细胞覆盖

    biologicalPathogens: [],      // 生物病原体

    squamousEpithelium: "",       // 鳞状上皮分析
    glandularEpithelium: "",      // 腺上皮分析
    diagnosisDescription: "",      // 诊断描述

    checkout: "",                 // 医生建议 检查
    suggestion: ""                // 医生建议 建议
  },

  collapseOnChange(event) {
    this.setData({
      showCollapseNames: event.detail,
    });
  },

  radioOnChange: function(e) {
    this.setData({
      [e.target.id]: e.detail
    })
  },
  checkboxOnChange: function(e) {
    this.setData({
      [e.target.id]: e.detail
    })
  },
  save: function(e) {
    var key = e.target.id;
    this.setData({
      [key]: e.detail.value
    });
  },
  save_select: function(e) {
    var index = e.detail.value;
    var key = e.target.id;
    if (key == "squamousEpithelium") {
      this.setData({ [key]: this.data.allSquamousEpitheliumStatus[index]})
    } else if (key == "glandularEpithelium") {
      this.setData({ [key]: this.data.allGlandularEpitheliumStatus[index]})
    }
  },
  save_suggestion: function(e) {
    var key = e.target.id;
    this.setData({
      [key]: e.detail
    });
  },

})