export const formateDateAsYMD = (date = new Date()) => {
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
/*  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();*/
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

// 计算svg 参考：http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
export const describeArc = function (x, y, radius, spread, startAngle, endAngle){
  var innerStart = polarToCartesian(x, y, radius, endAngle);
  var innerEnd = polarToCartesian(x, y, radius, startAngle);
  var outerStart = polarToCartesian(x, y, radius + spread, endAngle);
  var outerEnd = polarToCartesian(x, y, radius + spread, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M", outerStart.x, outerStart.y,
    "A", radius + spread, radius + spread, 0, largeArcFlag, 0, outerEnd.x, outerEnd.y,
    "L", innerEnd.x, innerEnd.y,
    "A", radius, radius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
    "L", outerStart.x, outerStart.y, "Z"
  ].join(" ");

  return d;
}

export const polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
