<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=divice-width,initial-scale=1.0,user-scalable=0">
  <meta http-equiv="Cache-Control" content="no-siteapp">
  <meta name="robots" content="index,follow,nocache">
  <meta name="format-detection" content="telphone=no, email=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <title>空教室查询</title>
  <meta name="keywords" content="哈尔滨工业大学,哈工大,空闲教室">
  <meta name="description" content="哈尔滨工业大学最好用的空闲教室查询">
  <link rel="stylesheet" type="text/css" href="./res/style.css">
<style type="text/css"></style></head><body class="">
  <div id="choose" class="container">
    <div class="notice">
      <span>教室占用情况可能存在临时变动</span>
    </div>

    <!--<div id="date" class="row">-->
      <!--<div class="col-xs-4">-->
        <!--<label data-value="today" class="btn btn-primary">今天</label>-->
      <!--</div>-->
      <!--<div class="col-xs-4">-->
        <!--<label data-value="tomorrow" class="btn">明天</label>-->
      <!--</div>-->
      <!--<div class="col-xs-4">-->
        <!--<label data-value="2daysl" class="btn">后天</label>-->
      <!--</div>-->
    <!--</div>-->

    <div class="campus">
      <h5 class="site">一校区</h5>
      <div class="row">
        <div class="col-xs-3">
          <label data-campus="1" class="btn">正心楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="1" class="btn">致知楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="1" class="btn">诚意楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="1" class="btn">机械楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="1" class="btn">主楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="1" class="btn">格物楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="1" class="btn">电机楼</label>
        </div>
      </div>
    </div>

    <div class="campus">
      <h5 class="site">二校区</h5>
      <div class="row">
        <div class="col-xs-3">
          <label data-campus="2" class="btn">主楼</label>
        </div>
        <div class="col-xs-3">
          <label data-campus="2" class="btn">西配楼</label>
        </div>
      </div>
    </div>

    <div class="campus">
      <h5 class="site">其他</h5>
      <div class="row">
        <div class="col-xs-3">
          <label data-campus="1" class="btn">土木楼</label>
        </div>
      </div>
    </div>
  </div>

 <%-- <script src="./res/jquery-1.11.0.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function () {
      $.post('/test',{
        "text":"hello",
      },
      function (data) {
        alert(data);
      });
    });

  </script>--%>

  <jsp:include page="include.jsp" />

</body></html>