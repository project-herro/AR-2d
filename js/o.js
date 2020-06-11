    /*
        h=document.documentElement.clientHeight*0.95
        w=document.documentElement.clientWidth        

        
        layer=document.getElementById('layer')


        gmap.addListener('zoom_changed',function(){
            scalenum=gmap.getZoom();
            layer.style.transform='scale('+(2**scalenum/256*360)/100+')'
            change_layer_pos()
        })
        gmap.addListener('center_changed',function(){
            change_layer_pos()
        })

        function change_layer_pos(){
            scalenum=gmap.getZoom();
            latlng = gmap.getCenter();
            lat = latlng.lat();
            lng = latlng.lng();
            layer.style.top=((256/(2*Math.PI))*Math.log(Math.abs(Math.tan(Math.PI/4+(lat/180*Math.PI)/2)))*2**scalenum+h/2)+'px'
            layer.style.left=(-lng/360*256*2**scalenum+w/2)+'px'
        }

        scalenum=gmap.getZoom();
        layer.style.transform='scale('+(2**scalenum/256*360)/100+')'
        change_layer_pos()
    */