/**
 * 返回指定精度整型随机数
 * @param  {Number} min 左边距
 * @param  {Number} max 右边距
 * @return {Number}   指定范围随机数
 * random(1, 3)  // 1 | 2 | 3
 */
function random(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  random
}
