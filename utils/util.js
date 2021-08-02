const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getRecord(records) {
  var record_list = [];
  records.forEach(function(item){
    var dict = {};
    dict["sampleStatus"] = item["sampleStatus"]["dictValue"];
    dict["sampleNum"] = item["sampleNum"];
    dict["patientName"] = item["creater"]["userName"];
    dict["institution"] = item["instiution"]["institutionName"];
    dict["operate"] = "诊断";

    record_list.push(dict);
  });

  return record_list;
}

module.exports = {
  formatTime,
  getRecord: getRecord    
}
