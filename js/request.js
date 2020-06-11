//事情により「超高速実装」です。攻撃はご遠慮ください
global_username='anonymous'
function Send(dic){
    dic['sid'] = 2
    dic['method'] = 'add'
    dic['username']=global_username
    $(function(){
        $.ajax({
            url:'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api'+Dic2ParamString(dic),
            type:'GET',
            //data:JSON.stringify(dic),
            contentType:'application/json',
        })
        .done( (data) => {
            console.log(data);
        })
        .fail( (data) => {
            window.alert('通信に失敗しました')
            console.log(data);
        })
    });
}

function GetAll(){
    let dic={'sid':2,'method':'pick'}
    $(function(){
        $.ajax({
            url:'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api'+Dic2ParamString(dic),
            type:'GET',
            //data:JSON.stringify(dic),
            contentType:'application/json',
        })
        .done( (data) => {
            data=eval(data)
            console.log(data)
            PutMsgs(data)
        })
        .fail( (data) => {
            window.alert('通信に失敗しました')
            console.log(data);
        })
    });
}



function Login(username,password){
    let dic={'sid':3,'method':'pick'}
    dic['username']=username
    dic['password']=password
    $(function(){
        $.ajax({
            url:'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api'+Dic2ParamString(dic),
            type:'GET',
            //data:JSON.stringify(dic),
            contentType:'application/json',
        })
        .done( (data) => {
            data=eval(data['res'])
            if(data.length){
                global_username=data[0]['username']
                user_manager.style.display='none'
            }else{
                window.alert('ユーザー名かパスワードが間違っています')
            }
        })
        .fail( (data) => {
            window.alert('通信に失敗しました')
            console.log(data);
        })
    })
}



function Check_user_doubling(username,password){
    let dic={'sid':3,'method':'pick'}
    dic['username']=username
    $(function(){
        $.ajax({
            url:'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api'+Dic2ParamString(dic),
            type:'GET',
            //data:JSON.stringify(dic),
            contentType:'application/json',
        })
        .done( (data) => {
            data=eval(data['res'])
            console.log(data)
            if(data.length){
                window.alert('すでに登録されています')
            }else{
                Resister(username,password)
            }
        })
        .fail( (data) => {
            window.alert('通信に失敗しました')
            console.log(data);
        })
    })
}

function Resister(username,password){
    let dic={'sid':3,'method':'add'}
    dic['username']=username
    dic['password']=password
    $(function(){
        $.ajax({
            url:'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api'+Dic2ParamString(dic),
            type:'GET',
            //data:JSON.stringify(dic),
            contentType:'application/json',
        })
        .done( (data) => {
            global_username=username
            user_manager.style.display='none'
            //data=eval(data['res'])
            //console.log(data)
        })
        .fail( (data) => {
            window.alert('通信に失敗しました')
            console.log(data);
        })
    })
}

function Dic2ParamString(obj){
    let str = "?";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str
}