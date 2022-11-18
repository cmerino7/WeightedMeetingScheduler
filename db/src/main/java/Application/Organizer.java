package Application;

public class Organizer {
    private static int id_counts = 1;
    private static int event_counts = 1;
    private int id;
    private String name;
    private int event_id;

    public Organizer(){
        id = id_counts;
        name = "John Doe";
        event_id = event_counts;
        id_counts ++;
        event_counts ++;
    }

    public Organizer(String name){
        this.id = id_counts;
        this.name = name;
        this.event_id = event_counts;
        id_counts ++;
        event_counts ++;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEvent_id(){ return event_id; }

    public void setEvent_id(int event_id){ this.event_id =  event_id;}
}
