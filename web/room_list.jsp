<%@ taglib prefix="s" uri="/struts-tags" %>
<%--
  Created by IntelliJ IDEA.
  User: zhao
  Date: 2017/1/3
  Time: 1:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=divice-width,initial-scale=1.0,user-scalable=0">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="robots" content="index,follow,nocache">
    <meta name="format-detection" content="telphone=no, email=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <title>教室列表</title>
    <meta name="keywords" content="哈尔滨工业大学,哈工大,空闲教室">
    <meta name="description" content="哈尔滨工业大学最好用的空闲教室查询">
    <link rel="stylesheet" type="text/css" href="./res/style.css">
    <style type="text/css"></style>
    <jsp:include page="bootstrap.jsp" />
</head>
<body>
    <div class="room-table">
        <table class="table table-striped">
            <thead>
            <tr>
                <th>编号</th>
                <th>状况</th>
                <th>变化</th>
            </tr>
            </thead>

            <tbody>
            <s:iterator value="rooms">
                <tr class="room-tr">
                    <td><span class="room-id-span"><s:property value="id" /> </span></td>
                    <td><span><s:property value="used" /></span>/<span><s:property value="total" /></span> </td>
                    <td><span><s:property value="change" /></span></td>
                </tr>
            </s:iterator>
            </tbody>
        </table>
    </div>

    <jsp:include page="include.jsp" />
</body>
</html>
