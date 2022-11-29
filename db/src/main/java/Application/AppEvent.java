package Application;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

public class AppEvent{
    private int e_id; //event id
    private int p_id; //participant id
    private Map<Timestamp, Float> calendar; //calendar data


    public AppEvent(){
        this.e_id = 0;
        this.p_id = 0;
        this.calendar = new HashMap<Timestamp, Float>();
    }

    public AppEvent(int e_id, int p_id){
        this.e_id = e_id;
        this.p_id = p_id;
        this.calendar = new HashMap<Timestamp, Float>();
    }

    public int getE_id(){
        return e_id;
    }

    public int getP_id(){
        return p_id;
    }

    public Map<Timestamp, Float> getCalendar(){
        return calendar;
    }

    public void setE_id(int e_id){
        this.e_id = e_id;
    }

    public void setP_id(int p_id){
        this.p_id = p_id;
    }

    public void setCalendar(Map<Timestamp, Float> calendar) {
        this.calendar = calendar;
    }

    public void addlineMap(Map<Timestamp, Float> calendar){
        this.calendar.putAll(calendar);
    }

}
