package action;

import com.opensymphony.xwork2.ActionSupport;
import dao.RoomDAO;
import entity.Room;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhao on 2017/1/1.
 */
public class RoomAction extends ActionSupport{
    private RoomDAO roomDAO = new RoomDAO();
    private List<Room> rooms = new ArrayList<>();
    private Room room = new Room();
    private String opt = "";

    public String getOpt() {
        return opt;
    }

    public void setOpt(String opt) {
        this.opt = opt;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }


    public String test() throws Exception
    {
        String res = "[[0,0,1,1,1,0,1,0],[0,1,0,0,1,1,1,0],[1,0,0,0,1,1,1,0],[1,0,0,0,1,1,1,0],[1,0,0,0,1,1,1,0],[0,1,0,0,1,1,0,0],[0,1,0,0,1,1,0,1]]";
        room.setJson(res);
//        res = "[[0,0,,1,1,,1,0],[0,1,,0,0,,1,1],[1,0,,0,0,,1,1],[1,0,,0,0,,1,1],[1,0,,0,0,,1,1],[0,1,,0,0,,1,1],[0,1,,0,0,,1,1]]";
        return "success";
    }

    public String viewRoomDetail() throws Exception {
        String res = roomDAO.getRoomDetail(room.getId());
        room.setJson(res);
        return "success";
    }

    public String viewRoomList() throws Exception {
        rooms = roomDAO.getRoomList(opt);
        return "success";
    }

    public String updateData() throws Exception {
        if(roomDAO.updateData(room.getId(),room.getJson())) return SUCCESS;
        return ERROR;
    }
}
