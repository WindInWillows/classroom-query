$(document).ready(function(){
  dom={};
  dom.mybody = $(document.body);
  dom.myModal =  $("#myModal");
  dom.choosePage = $("#choose");
  dom.resultPage = $('#result');
  dom.detailPage = $('#detail');
  dom.col = $("div[class^='section']");
  dom.section = $("div[id^='section']");
  dom.roomTable = $(".room-table");
  dom.roomDetail = $(".room-detail");
  dom.exitSelectTime = $("#exit-select");
    dom.queryRoom = $(".room-tr");
  dom.ajaxProcess;

  first = 1;          //  声明一个全局变量，记录是否进入时间选择模式
  var scrollHeight;   // 记录第二个页面的滚动高度

    dom.queryRoom.click(chooseRoom);

});


function loadingIn(){
  dom.mybody.addClass("modal-open");
  dom.myModal.addClass("show");
  $("#myModal").spin();
}


function loadingFade(){
  dom.mybody.removeClass("modal-open");
  dom.myModal.removeClass("show");
  $("#myModal").spin(false);
}


function cancelAjax(){
  dom.ajaxProcess.abort();
  loadingFade();
}


function chooseRoom(){

  var clickedElem = $(this);
  clickedElem.addClass("active");
  loadingIn();
    var room_id = $(this).find("span.room-id-span").html();

  dom.ajaxProcess = $.ajax({
    url: "/viewRoomDetail?room.id="+room_id,
    type: "get",
    dataType: "json",
    cache: false,
    timeout: 5000,

    success: function(data){
        if (data.length < 1) {
          loadingFade();
          alert("暂时没有数据");
          closeResultPage();
          return;
        }
        openResultPage(data);
    },
    complete: function(XMLHttpRequest, status){
      if(status == 'error'){
        alert('请检查网络连接');
        clickedElem.removeClass("active");
        cancelAjax();
      }
      if(status == 'timeout'){
        alert('当前网络较慢，请重试');
        clickedElem.removeClass("active");
        cancelAjax();
      }
    }
  });

}



function openResultPage(data){
  dom.choosePage.addClass("hide");

  loadingFade();

  dom.resultPage.removeClass("hide");

  var items = JSON.parse(data);
  for (var i=0;i<items.length;i++) {
    dom.roomTable.append("<div class='row record" + i + "'><div class='room'><div class='future" + i + "'>" + (i+1) + "</div>");
    var elem = "." + "record" + i;
    for (var j=0;j<items[i].length;j++) {

        if(j%2===0 && j!=0){
            $(elem).append("<div class='col-no'></div>");
        }
        if (items[i][j] === 0) {
            $(elem).append("<div class='section" + j + " col'><label class='status empty'>空</label></div></div>");
        } else if (items[i][j] === 1) {
            $(elem).append("<div class='section" + j + " col'><label class='status occupy'>占</label></div>");
        }

    }
  }
  // $("div[class^='future']").click(beforeDetailPage);
  $("#result label.empty").click(chooseLikeRoom);

/*  $.each(items, function(i, item){
    dom.roomTable.append("<div class='row record" + i + "'><div class='room'><div class='future" + i + "'>" + item.room_number + "</div>");

    var elem = "." + "record" + i;

    $.each(item.status, function(k, statu){
      if ((k === 2)||(k === 4)){
        $(elem).append("<div class='col-no'></div>");
      }
      if (statu === 0) {
        $(elem).append("<div class='section" + k + " col'><label class='status empty'>空</label></div></div>");
      } else {
        $(elem).append("<div class='section" + k + " col'><label class='status occupy'>占</label></div>");
      };
    });
  });

  $("div[class^='future']").click(beforeDetailPage);
  $("#result label.empty").click(chooseLikeRoom);*/

}


function chooseLikeRoom(){
  var status = $(this).attr("class").indexOf("choose");
  var parent = $(this).parent().attr("class").indexOf("transparent");

  if (first === 1) { // 没有进入 时间选择模式
    if(status === -1){
      $(this).addClass("choose");
    } else {
      $(this).removeClass("choose");
    }
  } else {                  // 已经进入 时间选择模式
    if (parent === -1){     // 不是透明的按钮
      if(status === -1){    // 不是选中按钮
        $(this).addClass("choose");
      } else {              // 是选中按钮
        $(this).removeClass("choose");
      }
    } else {
      // console.log("// 是透明按钮,什么也不执行");
    }
  }
}


function exitSelect(){
  first = 1;
  dom.section.removeClass("selected");
  dom.exitSelectTime.addClass("hide");                      // 关闭 时间选择模式
  $("div[class^='section']").removeClass("transparent");    // 所有都显示
}


function closeResultPage(){
  dom.resultPage.addClass("hide");
  dom.section.removeClass("selected");
  first = 1;                              // 下次进入 resultPage 时点击是第一次
  dom.exitSelectTime.addClass("hide");    // 关闭 时间选择模式
  dom.roomTable.empty();
  dom.choosePage.removeClass("hide");
}


function beforeDetailPage(){
  scrollHeight = document.body.scrollTop;

  loadingIn();

  var elem = $(".campus .btn-primary");
  var campus = elem.data('campus');
  var floor = elem.text();

  var room = $(this).text();

  var params={};
      params.ca = campus;
      params.b_name = floor;
      params.room = room;

  dom.ajaxProcess = $.ajax({
    url: "/room-detail",
    type: "get",
    dataType: "json",
    cache: false,
    timeout: 5000,
    data: params,
    success: function(data){
      if(data.success === 1){
        openDetailPage(data,params);
      } else {
        alert('服务器有点儿累了');
        clickedElem.removeClass("btn-primary");
        loadingFade();
      }
    },
    complete: function(XMLHttpRequest, status){
      if(status == 'error'){
        alert('请检查网络连接');
        cancelAjax();
      }
      if(status == 'timeout'){
        alert('当前网络较慢，请重试');
        cancelAjax();
      }
    }
  });
}


function openDetailPage(data,params){
  dom.resultPage.addClass("hide");

  loadingFade();

  dom.detailPage.removeClass("hide");

  // 左上角 例“正心楼 603”
  $("#detail .location-on").text(params.b_name);
  $(".room-on").text(params.room);

  var items = data.detail;
  $.each(items, function(i, item){
    dom.roomDetail.append("<div class='row record-detail" + i + "'><div class='room'><label class='data" + i + "'>" + item.date.slice(5) + "</label>");

    var elem = "." + "record-detail" + i;

    $.each(item.status, function(k, statu){
      if ((k/2 === 1)||(k/2 === 2)){
        $(elem).append("<div class='col-no'></div>");
      }
      if (statu === 0) {
        $(elem).append("<div class='col'><label class='status empty'>空</label></div></div>");
      } else {
        $(elem).append("<div class='col'><label class='status occupy'>占</label></div>");
      };
    });
  });
}


function closeDetailPage(){
  dom.detailPage.addClass("hide");
  dom.roomDetail.empty();
  dom.resultPage.removeClass("hide");
  document.body.scrollTop = scrollHeight;
}
