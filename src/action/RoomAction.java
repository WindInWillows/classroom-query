package action;

import com.opensymphony.xwork2.ActionSupport;
import dao.RoomDAO;

/**
 * Created by zhao on 2017/1/1.
 */
public class RoomAction extends ActionSupport{
    private RoomDAO rdao = new RoomDAO();

    private String acc = new String("");
    private String res = new String("");

    public String getAcc() {
        return acc;
    }

    public void setAcc(String acc) {
        this.acc = acc;
    }

    public String getRes() {
        return res;
    }

    public void setRes(String res) {
        this.res = res;
    }

    public String getRoomDetail() {
        return SUCCESS;
    }

    public String test() throws Exception
    {
        res = "[[2,2],[0,1],[1,0]]";
        System.out.println("data got!");
        return "success";
    }

    public String viewRoomDetail() throws Exception {
        res = rdao.getRoomDetail(acc);
        return "success";
    }

    public String viewRoomList() throws Exception {
        return "success";
    }
}
