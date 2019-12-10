// 高德地图 - 异步
// 这里的ak就是你高德地图-个人中心-我的应用里的key值，默认写一个在这里
export function AP(ak = '92cfc8b4dd0aec11f51f64df23936d96') {
    return new Promise(function (resolve, reject) {
        window.onload = function () {
            resolve(AMap)
        }
        if (typeof AMap === 'undefined') {
            var script = document.createElement("script")
            script.type = "text/javascript"
            script.src = "https://webapi.amap.com/maps?v=1.4.13&key="+ak+"&plugin=AMap.CitySearch"
            script.onerror = reject
            document.head.appendChild(script)
        } else {
            resolve(AMap)
        }
    })
}