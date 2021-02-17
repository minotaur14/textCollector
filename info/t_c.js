window.onload = function () {    
    ipcRenderer.send('udpReady', ' ');    
}

// global var
var itemWindow = {};

// log
const log = require('electron-log');

// tcp*
var net = require('net');
var client;

var server = net.createServer(function(socket) {               
    client = socket;
    socket.on('data', function(chunk) {   
      // var json = JSON.parse(chunk.toString())
      // for(var i = 0; i < json.data.length; i++){
      //   console.log("data:" + json.data[i]);
      // }

      var json = JSON.parse(chunk.toString());
      
      //나중에는 빼야함 (불필요하게 많이 호출될 수 있으니)
      log.info(chunk.toString());      
    });
});

var ip = '127.0.0.1';
var port = 18810;

socket.connect({host:ip, port:port}, function() {    
    socket.write(argument);        
});

server.listen(18810);
// tcp**

// udp receive
var ipcRenderer = require('electron').ipcRenderer;
var text_all = '';
ipcRenderer.on('warningCheck', (event, argument) => {
    // var _argument = argument.replace(/\r\n/gi, "<br>");
    // text_all = text_all+_argument;        
    text_all = text_all+argument;
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    // document.getElementById('webfos_text').innerHTML = text_all;
    document.getElementById('webfos_text').innerText = text_all;
});

// auto update*
function itemOpen(num, title) {    
    var url = './contents/item_'+num+'.html';                
    itemWindow[num] = window.open(url, title, "width=400, height=300, left=center");        
    itemWindow[num].focus();
}

function test(msg) {  
    itemWindow['1'].close();
    // alert(asd);  
    // var ipcRenderer = require('electron').ipcRenderer;
    // ipcRenderer.send('updateWindow', 'update_available');    
}
// auto update**

// time
// var today = new Date();   
// var year = today.getFullYear(); // 년도
// var month = today.getMonth() + 1;  // 월
// var date = today.getDate();  // 날짜
// var day = today.getDay();  // 요일
// var hours = today.getHours(); // 시
// var minutes = today.getMinutes();  // 분
// var seconds = today.getSeconds();  // 초
// var milliseconds = today.getMilliseconds(); // 밀리초

// function
function configurationOn() {    
    document.documentElement.style.setProperty('--moveConfig', 'moveLeft');
    // configOpen.style.display = 'none';
    configWindow.style.display = 'block';
  } 
  
function configurationOff() {
    document.documentElement.style.setProperty('--moveConfig', 'moveRight');   
    // configOpen.style.display = 'block'; 
    setTimeout(function() {
        configWindow.style.display = 'none';
        }, 600);              
}

const fs = require('fs');
function textSave() {
    if (!fs.existsSync('./1_result')) {
        fs.mkdirSync('./1_result');
    }    

    var today = new Date();   
    var year = today.getFullYear(); // 년도
    var month = today.getMonth() + 1;  // 월
    var date = today.getDate();  // 날짜    
    var hours = today.getHours(); // 시
    var minutes = today.getMinutes();  // 분
    var seconds = today.getSeconds();  // 초    

    var fileName = './1_result/'+year+'.'+month+'.'+date+' ('+hours+'.'+minutes+'.'+seconds+').txt';  
    var _text_all = document.getElementById('webfos_text').innerText;
    // var save_text = _text_all.replace(/\<br\>/gi, "\r\n");       
    fs.writeFile(fileName, _text_all, 'utf8', function(error) {
            if(error) {
                alert(error);
            }else{                                                
                alert('"1_result" 폴더에 저장');  
            }                        
        });       
}

function textReset() {    
    text_all = '';
    document.getElementById('webfos_text').innerHTML = text_all;
}

var clickEvent_p;
function clickColor_over() {
    var clickEvent = window.event;
    var clickEventID = clickEvent.target;
    clickEvent_p = clickEventID.id;
    document.getElementById(clickEventID.id).style.backgroundColor = 'brown';    
    // var _clickColor = setTimeout(function() {
    //     document.getElementById("configBtn_2").style.backgroundColor = 'gray';
    //     clearTimeout(_clickColor);        
    //   }, 300);
}
function clickColor_out() {
    document.getElementById(clickEvent_p).style.backgroundColor = 'gray';
}

// test
var test_a_text = '';
function test_a() {
    var checkTestA = 0;    
    var test_1 = setInterval(function() {
        test_a_text = test_a_text+'asdf 하나 둘\r\n';
        document.getElementById('webfos_text').innerText = test_a_text;
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
        // document.documentElement.scrollTop = 0;
        checkTestA++
        if (checkTestA == 50)
            clearInterval(test_1);
        }, 500);    
}