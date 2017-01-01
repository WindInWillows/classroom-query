$(document).ready(function(){
  dom={};
  dom.queryDate = $("#date .btn");
  dom.queryFloor = $(".campus .btn");
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
  dom.ajaxProcess;

  first = 1;          //  声明一个全局变量，记录是否进入时间选择模式
  var scrollHeight;   // 记录第二个页面的滚动高度

  dom.queryDate.click(chooseDate);              // 绑定日期按钮
  dom.queryFloor.click(chooseBuilding);         // 绑定楼宇按钮

  $(".close-result").click(closeResultPage);
  $(".close-detail").click(closeDetailPage);
  dom.section.click(showOneColumn);             // 例：只显示 1-2 节的使用情况
  dom.exitSelectTime.click(exitSelect);

  $("#detail .time .col").click(test);
  function test(){
    console.log("message");
    return false;
  }
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


function chooseDate(){
  dom.queryDate.removeClass("btn-primary");
  $(this).addClass("btn-primary");
}


function chooseBuilding(){
  dom.queryFloor.removeClass("btn-primary");
  var clickedElem = $(this);
  clickedElem.addClass("btn-primary");

  loadingIn();

  var campus = clickedElem.data('campus');
  var date = $("#date .btn-primary").data('value');
  var floor = clickedElem.text();
  var params={};
  params.ca = campus;
  params.time = date;
  params.b_name = floor;

  dom.ajaxProcess = $.ajax({
    url: "/rooms",
    type: "get",
    dataType: "json",
    cache: false,
    timeout: 5000,
    data: params,
    success: function(data){
      if(data.success === 1){
	if (data.result.length < 1) {
	  loadingFade();
	  alert("暂时没有数据");
	  closeResultPage();
	  return;
	}
        openResultPage(data,params);
      }else{
        alert('服务器有点儿累了');
        clickedElem.removeClass("btn-primary");
        loadingFade();
      }
    },
    complete: function(XMLHttpRequest, status){
      if(status == 'error'){
        alert('请检查网络连接');
        clickedElem.removeClass("btn-primary");
        cancelAjax();
      }
      if(status == 'timeout'){
        alert('当前网络较慢，请重试');
        clickedElem.removeClass("btn-primary");
        cancelAjax();
      }
    }
  });
}



function openResultPage(data,params){
  dom.choosePage.addClass("hide");

  loadingFade();

  dom.resultPage.removeClass("hide");

  var queryDate;
  if(params.time === "today") {
    queryDate = '今天';
  } else if (params.time === "tomorrow") {
    queryDate = '明天';
  } else {
    queryDate = '后天';
  }

  $(".location-on").text(params.b_name);
  $("span.date-on").text(queryDate);

  var items = data.result;
  $.each(items, function(i, item){
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
  $("#result label.empty").click(chooseLikeRoom);
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


function showOneColumn(){
  var clickElem = $(this);
  var clickId = clickElem.attr("id");
  var showElem = "div[class^='" + clickId + "']";
  var flag = clickElem.attr("class").indexOf("selected");

  dom.exitSelectTime.removeClass("hide");

  if(first === 1) {
    $("div[class^='section']").addClass("transparent");     // 所有都不显示
    clickElem.addClass("selected");                         // 选中时间
    $(showElem).removeClass("transparent");                 // 显示 选中的列
    first = 2;
  } else {
    if(flag === -1){      // 没有选中
      clickElem.addClass("selected");
      $(showElem).removeClass("transparent");
    } else {              // 选中
      clickElem.removeClass("selected");
      $(showElem).addClass("transparent");
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
  dom.queryFloor.removeClass("btn-primary");
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
      }else{
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
