import com.opensymphony.xwork2.ActionSupport;

/**
 * Created by zhao on 2017/1/1.
 */
public class uploadAction extends ActionSupport{
    private String json = "";
    private String data = "";

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
}
