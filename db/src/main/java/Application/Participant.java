package Application;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

public class Participant {
    private static int counts = 1;
    private int id;
    private String name;

    public Participant(){
        id = counts;
        name = "Jane Doe";
        counts ++;
    }

    public Participant(String name){
        this.id = counts;
        this.name = name;
        counts ++;
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
}
