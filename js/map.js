window.onload=()=>{
    navigator.geolocation.getCurrentPosition(SetMap,FaildGetPos)//httosじゃないと使えない
    GetAll()
}

function FaildGetPos(err){
    SetMap(null)
}

gmap = null
function SetMap(geo) {
    scalenum = 12
    if (geo) {
        MyLatLng = new google.maps.LatLng(36.404204,138.936885);
        //MyLatLng = new google.maps.LatLng(geo.coords.latitude, geo.coords.longitude);
    } else {
        MyLatLng = new google.maps.LatLng(34.7024898, 135.4937619);//座標が取得できないときは、とりあえず大阪駅
    }
    Options = {
        zoom: scalenum,      //地図の縮尺値
        center: MyLatLng,    //地図の中心座標
        mapTypeId: 'terrain'   //地図の種類
    };
    gmap = new google.maps.Map(document.getElementById('map'), Options)

    static_sub.addEventListener('click', () => {
        let msg={}
        msg['word'] = word.value
        word.value = ""
        d = new Date()
        msg['time'] = d.getTime()
        PutMsg(msg,true)
    })

    dynamic_sub.addEventListener('click', () => {
        let msg={}
        msg['word'] = word.value
        word.value = ""

        velv = document.getElementById('velocity').value.split(',')
        msg['vx'] = velv[0]
        msg['vy'] = velv[1]
        // TODO: 早さと向きは自由に変えれるようにする
        // velv=[x軸方向の速さ,y軸方向の速さ] : 例えば北向きなら[0,-1] 

        d = new Date()
        msg['time'] = d.getTime()
        PutMsg(msg,true)
    })
}

function PutMsgs(data) {
    for (i = 0; i < data.length; i++) {
        PutMsg(data[i],false)
    }
}
function PutMsg(msg,isnew) {//msg.key=lat lng word (vx) (vy) (time)
    if(isnew){
        msg['lat']=Math.floor(gmap.getCenter().lat()*10**6)
        msg['lng']=Math.floor(gmap.getCenter().lng()*10**6)
        msg['username']=global_username
    }else{
        d=new Date
        elapsed=(d.getTime()-msg['time'])/1000
        if(elapsed>60*60*24){
            return
        }
    }
    if(msg['vx'] | msg['vy']){
        v=0.002//秒速何度か。
        if(!isnew){
            msg['lat']=Number(msg['lat'])+v*msg['vy']*elapsed*10**6
            msg['lng']=Number(msg['lng'])+v*msg['vx']*elapsed*10**6
        }
        let marker=new MsgMarker(gmap,msg)
        dur=0.1 //フレーム更新秒数。
        setInterval(() => {
            marker.move(msg['vx'],msg['vy'],v,dur)
        }, dur*1000);
    }else{
        new MsgMarker(gmap,msg)
    }

    if(isnew){
        Send(msg)
    }
}


function MsgMarker(map,msg) {
    this.lat_ = msg['lat']/10**6
    this.lng_ = msg['lng']/10**6
    this.word = msg['word']
    this.time=msg['time']
    this.user = msg['username']
    this.isMove=Boolean(msg['vx'] | msg['vy'])
    this.setMap(map)
}

MsgMarker.prototype = new google.maps.OverlayView();

MsgMarker.prototype.draw = function() {
    if (!this.div_) {
        this.div_ = document.createElement( "div" )
        this.div_.classList.add('msg')
        if(this.isMove){
            this.div_.classList.add('move_msg')
        }
        d=new Date(Number(this.time))
        this.div_.innerHTML = '<div class="main">'+this.word+'</div><div class="post_user">@'+this.user+'</div><div class="time">'+d.getMonth()+'/'+d.getDate()+'/'+('00'+d.getHours()).slice(-2)+':'+('00'+d.getMinutes()).slice(-2)+'</div>'
        var panes = this.getPanes();
        panes.overlayLayer.appendChild( this.div_ );
    }

    // 緯度、軽度の情報を、Pixel（google.maps.Point）に変換
    var point = this.getProjection().fromLatLngToDivPixel( new google.maps.LatLng( this.lat_, this.lng_ ) )

    this.div_.style.left = point.x-30 + 'px' //微調整（左上がpositionの指定位置なので、ちょっとづらしてそれっぽくする）
    this.div_.style.top = point.y-30 + 'px'
}

MsgMarker.prototype.getPosition = function() {
    return new google.maps.LatLng( this.lat_, this.lng_ );
}

MsgMarker.prototype.setPosition = function(lat, lng) {
    this.lat_ = lat;
    this.lng_ = lng;
    var point = this.getProjection().fromLatLngToDivPixel( new google.maps.LatLng( this.lat_, this.lng_ ) );
    this.div_.style.left = point.x + 'px';
    this.div_.style.top = point.y + 'px';
  }

MsgMarker.prototype.move=function(vx,vy,v,dur){//x成分・y成分・速度・持続秒数
    latlng = this.getPosition()
    if(latlng.lng()<120 | 150<latlng.lng() | latlng.lng()<25 | 60<latlng.lat()){
        return
    }
    this.setPosition( latlng.lat() + vy*v*dur, latlng.lng() + vx*v*dur);

}