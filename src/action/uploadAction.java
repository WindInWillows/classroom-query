package action;

import com.opensymphony.xwork2.ActionSupport;
import com.sun.deploy.net.HttpRequest;
import org.apache.struts2.ServletActionContext;

/**
 * Created by zhao on 2017/1/1.
 */
public class uploadAction extends ActionSupport{
    private String json = "";
    private String data = "";
    private String IP = "";

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        this.json = json;
    }

    @Override
    public String execute() throws Exception {
        json = data;
        return SUCCESS;
    }


    public String viewIP() throws Exception {

        return "success";
    }
}
