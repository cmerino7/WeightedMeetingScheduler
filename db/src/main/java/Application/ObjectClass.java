package Application;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;

class Event_ID_Name{
    int id;
    String name;
    public Event_ID_Name(){}
    public Event_ID_Name(int id, String name){ this.id = id; this.name = name;}

    public int getId(){
        return id;
    }
    public String getName(){
        return name;
    }

}

class TimeStampObj {
    int i = 0;
    Timestamp time;

    public TimeStampObj() {
        i++;
        time = new Timestamp(0);
    }

    public TimeStampObj(Timestamp time) {
        i++;
        this.time = time;
    }

    public int getI() {
        return i;
    }

    public Timestamp getTime() {
        return time;
    }
}

class FloatObj{
    int i = 0;
    float f;

    public FloatObj(){};
    public FloatObj(int i, float f){this.i = i; this.f = f;}

    public int getI() {
        return i;
    }

    public float getF() {
        return f;
    }
}

class Events{
    int event_id = 0;

    String title = "demo";

    Timestamp start;

    Timestamp end;

    float availability;

    public Events(){}
    public Events(Timestamp start, float availability){this.start = start; this.end = calc(start);this.availability = availability;}
    public Events(int id, Timestamp start, float availability){this.event_id = id; this.start = start; this.end = calc(start);this.availability = availability;}

    public int getEvent_id() {
        return event_id;
    }

    public String getTitle(){
        return title;
    }

    public Timestamp getStart() {
        return start;
    }

    public Timestamp getEnd() {
        return end;
    }

    public float getAvailability() {
        return availability;
    }

    private Timestamp calc(Timestamp time){
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(time.getTime());
        cal.add(Calendar.MINUTE,15);
        java.sql.Timestamp ts_new_date_ws = new java.sql.Timestamp(cal.getTime().getTime());
        return ts_new_date_ws;
    }
}


