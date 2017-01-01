import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by zhao on 2017/1/1.
 */
public class RoomAction extends ActionSupport{
    private DataProcess dp = new DataProcess();
    private String json = "";

    public DataProcess getDp() {
        return dp;
    }

    public void setDp(DataProcess dp) {
        this.dp = dp;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    public String getRoomDetail() {
        json = dp.getData("");
        return SUCCESS;
    }
}
