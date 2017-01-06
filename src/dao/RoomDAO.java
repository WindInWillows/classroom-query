package dao;

import entity.Room;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhao on 2017/1/1.
 */
public class RoomDAO {
    private DBConnection dbConnection = new DBConnection();
    private Connection con = null;

    // 根据id获取其数据库里的json串并返回
    public String getRoomDetail(String id) {
        String sql = "SELECT * FROM classroom.room WHERE id=?";
        con = dbConnection.getConnection();
        try {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1,id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()){
                return rs.getString("json");
            }
            return null;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        boolean ans = new RoomDAO().updateData("3","[[1,0],[0,1]]");
        System.out.println(ans);
    }

    public String print() {
        String ans = "";
        String sql = "INSERT INTO classroom.room(json) VALUES ('hello')";
        con = dbConnection.getConnection();
        try {
            Statement stat = con.createStatement();
            stat.executeUpdate(sql);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return ans;
    }

    public boolean updateData(String room_id, String data) {
        String sql = "";
        con = dbConnection.getConnection();
        try {
            Statement statement = con.createStatement();
            ResultSet rs = statement.executeQuery("SELECT * FROM classroom.room WHERE id="+room_id);
            boolean flag = rs.next();
            if(flag) {
                sql = "UPDATE classroom.room SET json=? WHERE id=?";
            } else {
                sql = "INSERT INTO classroom.room(id,json) VALUES (?,?)";
            }

            PreparedStatement ps = con.prepareStatement(sql);
            if(flag) {
                ps.setString(1,data);
                ps.setInt(2,Integer.parseInt(room_id));
            } else {
                ps.setInt(1, Integer.parseInt(room_id));
                ps.setString(2, data);
            }
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Room> getRoomList(String opt) {
        List<Room> rooms = new ArrayList<>();
        String sql = "SELECT * FROM classroom.room ";
        con = dbConnection.getConnection();
        if(opt.equals("1")) {

        } else if (opt.equals("2")) {

        }
        try {
            Statement statement = con.createStatement();
            ResultSet rs = statement.executeQuery(sql);
            while (rs.next()) {
                Room r = new Room();
                r.setJson(rs.getString("json"));
                r.setId(new Integer(rs.getInt("id")).toString());
                rooms.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return rooms;
    }
}
