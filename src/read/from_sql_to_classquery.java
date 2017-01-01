package read;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.classquery;
/**
 * Created by DeerTrodis on 2017/1/1.
 */
public class from_sql_to_classquery {
    private int id;
    private String json;
    private Connection conn;
    private PreparedStatement prst;
    classquery query =new classquery();
    public from_sql_to_classquery(){
        conn=new connection.conn().getCon();
    }
    public String execute(){
        if (read_to_classquery()){
            return "success";
        }
        else{
            return "false";
        }
    }

    public String getRoomDetail(String id){
        int id_int= Integer.parseInt(id);
        try{
            prst=conn.prepareStatement("SELECT * FROM classquery WHERE id=?");
            prst.setInt(1,id_int);
            ResultSet rs=prst.executeQuery();
            if (rs.next()){
                return rs.getString(2);
            }
            else{
                return null;
            }
        }catch (SQLException e){
            e.printStackTrace();
            return null;
        }

    }

    public boolean read_to_classquery(){
        try{
            prst=conn.prepareStatement("SELECT * FROM classquery WHERE id=?");
            prst.setInt(1,this.id);
            ResultSet rs=prst.executeQuery();
            if (rs.next()){
                query.setId(rs.getInt(1));
                query.setJson(rs.getString(2));
                return true;
            }
            else{
                return false;
            }
        }catch (SQLException e){
            e.printStackTrace();
            return false;
        }
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }
}
