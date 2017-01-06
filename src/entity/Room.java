package entity;

/**
 * Created by zhao on 2017/1/3.
 */
public class Room {
    private String id;
    private String json;
    private String total;
    private String used;
    private String change;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJson() {
        return json;
    }

    public void setJson(String json) {
        int m =0, n= 0;
        char[] arr = json.toCharArray();
        for (int i=0;i<arr.length;i++) {
            if (arr[i]=='0') {
                m++;
            }
            if(arr[i]=='1'){
                n++;
            }
        }
        this.total = new Integer(m+n).toString();
        this.used = new Integer(n).toString();
        this.json = json;
    }


    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getUsed() {
        return used;
    }

    public void setUsed(String used) {
        this.used = used;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }
}
