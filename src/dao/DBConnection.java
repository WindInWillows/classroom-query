package dao;

/**
 * Created by zhao on 2017/1/1.
 */
import java.sql.*;

public class DBConnection {
    private static String dbName = "classroom";
    private static String user = "zzy";
    private static String password = "123456";
    private static String parameter = "?characterEncoding=utf8";
//    private static String dburl = "jdbc:mysql://localhost:3306/";
    private static String dburl = "jdbc:mysql://vcrrclbrglvt.mysql.sae.sina.com.cn:10228/";

    private static String url  = dburl + dbName +parameter;
    private static Statement stmt = null;
    private static Connection con = null;
    private static PreparedStatement ps = null;

    public DBConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(url, user, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void reloadDriver() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(url, user, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Connection getConnection() {
//        if (con == null) {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection(url, user, password);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
//        }
        return con;
    }

    public ResultSet select(String sql) {
        ResultSet rs = null;
        try {
            rs = stmt.executeQuery(sql);
        } catch (Exception e) {
            System.out.println(sql);
            e.printStackTrace();
        }
        return rs;
    }

    public boolean execSql(String sql) {
        try {
            return stmt.execute(sql);
        } catch (SQLException e) {
            return false;
        }
    }

    public int executeQuery(String sql) {
        try {
            return stmt.executeUpdate(sql);
        } catch (SQLException e) {
            return -1;
        }
    }

    public boolean close() {
        try {
            con.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}

