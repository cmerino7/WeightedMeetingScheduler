package Application;

import java.sql.Time;
import java.sql.Timestamp;

public class TempEvent {
    String title;
    Timestamp start, end;
    String colorsel;

    TempEvent(){

    }

    TempEvent(String title, Timestamp start, Timestamp end, String colorsel){
        this.title = title;
        this.start = start;
        this.end = end;
        this.colorsel = colorsel;
    }

    public String getColorsel() {
        return colorsel;
    }
    public Timestamp getStart(){
        return start;
    }
    public Timestamp getEnd(){
        return end;
    }
    public String getTitle(){
        return title;
    }
}
