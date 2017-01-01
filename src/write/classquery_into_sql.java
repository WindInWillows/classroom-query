package write;
import java.sql.*;
import model.classquery;
/**
 * Created by DeerTrodis on 2017/1/1.
 */
public class classquery_into_sql {
    private int id;
    private String json;

    private Connection conn;
    private PreparedStatement prst;
    public classquery_into_sql(){
        conn=new connection.conn().getCon();
    }

    public String execute(){
        if(write()==true){
            return "success";
        }
        else{
            return "false";
        }
    }

    public boolean write()  {
        try {
            String sql="insert into classquery (id,json) values(?,?)";
            prst=conn.prepareStatement(sql);
            prst.setInt(1,this.id);
            prst.setString(2,this.json);
            if(prst.executeUpdate()!=0){
                return true;
            }
            return false;
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
