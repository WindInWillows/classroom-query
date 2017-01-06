<%--
  Created by IntelliJ IDEA.
  User: zhao
  Date: 2017/1/1
  Time: 15:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="modal hide" id="myModal">

</div>

<div id="result" class="hide">
    <header>
        <div class="container">
            <section class="row">
                <div class="floor">
                    <span class="location-on">正心楼</span>
                    <span class="date-on">今天</span>
                </div>

<%--                <div class="time">
                    <div id="section0" class="col">
                        <label>1-2</label>
                    </div>

                    <div id="section1" class="col">
                        <label>3-4</label>
                    </div>

                    <div class="col-no">

                    </div>

                    <div id="section2" class="col">
                        <label>5-6</label>
                    </div>

                    <div id="section3" class="col">
                        <label>7-8</label>
                    </div>

                    <div class="col-no">

                    </div>

                    <div id="section4" class="col">
                        <label>9-10</label>
                    </div>

                    <div id="section5" class="col">
                        <label>11-12</label>
                    </div>

                    <div class="col-last">

                    </div>
                </div>--%>

            </section>
        </div>
    </header>

    <section class="container room-table"></section>

    <footer>
        <div class="footer-left">
            <i class="close-result icon iconfont"></i>
        </div>
        <div class="footer-right">
            <i id="exit-select" class="icon iconfont hide"></i>
        </div>
    </footer>
</div>

<div id="detail" class="hide">
    <header>
        <div class="container">
            <section class="row">
                <div class="floor">
                    <span class="location-on">正心楼</span>
                    <span class="room-on"></span>
                </div>

                <div class="time">
                    <div id="section0" class="col">
                        <label>1-2</label>
                    </div>

                    <div id="section1" class="col">
                        <label>3-4</label>
                    </div>

                    <div class="col-no">

                    </div>

                    <div id="section2" class="col">
                        <label>5-6</label>
                    </div>

                    <div id="section3" class="col">
                        <label>7-8</label>
                    </div>

                    <div class="col-no">

                    </div>

                    <div id="section4" class="col">
                        <label>9-10</label>
                    </div>

                    <div id="section5" class="col">
                        <label>11-12</label>
                    </div>

                    <div class="col-last">

                    </div>

                </div>

            </section>
        </div>
    </header>

    <section class="container room-detail">

    </section>

    <footer>
        <div class="footer-left">
            <i class="close-detail icon iconfont"></i>
        </div>
        <div class="footer-right">

        </div>
    </footer>

    <script src="./res/jquery-1.11.0.min.js"></script>
    <script src="./res/spin.min.js"></script>
    <script src="./res/jquery.spin.js"></script>
    <script src="./res/classroom.js"></script>
</div>
