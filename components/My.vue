<template>
    <div class="frame">
        <div>地区天气查询</div>
        <input type="text" id="search" placeholder="请输入要查询的地区"/>
        <div id="allmap" class="allmap"></div>
    </div>
</template>

<script>
   // import {getStore, setStore, removeStore} from '@/config/Utils'
    import BMap from 'BMap'
    import $ from 'jquery'
    export default {
        name: "My",
        data () {
            return {
            }
        },
        mounted () {
            let weather = null;
            let map = new BMap.Map('allmap')
            map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
            map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.enableScrollWheelZoom(true);
            let localSearch = new BMap.LocalSearch(map);
            listen(map,localSearch);
            function listen() {
                var ac = new BMap.Autocomplete(
                    {"input" : "search"
                        ,"location" : map
                    });
                ac.addEventListener("onconfirm", function(e) {
                    var _value = e.item.value;
                    var address = _value.province + _value.city + _value.district + _value.street + _value.business;
                    var cityname = _value.district.slice(0, -1);
                   position(address,cityname);
                });
            }
            function position(address,cityname) {
                //var cityname = document.getElementById("search").value;
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    var poi = searchResult.getPoi(0);
                    map.centerAndZoom(poi.point,10);
                    var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));
                    map.addOverlay(marker);
                    getweather(marker,poi,cityname);
                })
                localSearch.search(address);
            }
            function getweather(marker,poi,cityname) {
                $.ajax({
                    type: 'GET',
                    url: 'https://www.tianqiapi.com/api/',
                    data: 'version=v1&city='+cityname+'&appid=[49741197]&appsecret=[3c1FjRGf]',
                    dataType: 'JSON',
                    error: function () {
                        alert('网络错误');
                    },
                    success: function (res) {
                        weather = res.data[0];
                        weather= '日期：' + weather.date + '\n' + '温度：' + weather.tem + '\n' +'天气：' + weather.wea + '\n' +'风向：' + weather.win + '\n';
                        message(marker,poi);
                    }
                });
            }
            function message(marker,poi) {
                let opts = {
                    width : 250,     // 信息窗口宽度
                    height: 100,     // 信息窗口高度
                    title : poi.title+"天气"  // 信息窗口标题
                }
                let infoWindow = new BMap.InfoWindow(weather, opts);
                map.openInfoWindow(infoWindow, poi.point);
                marker.addEventListener("click", function(){
                    map.openInfoWindow(infoWindow, poi.point);
                });
            }
        }
    }
</script>

<style>
    .allmap {
        height: 530px;
    }
</style>