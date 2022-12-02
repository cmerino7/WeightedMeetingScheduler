package Application;

import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

public class Participant {
    private static int counts = 1;
    private int id;
    private String name;
    private float weight;


    public Participant(){
        id = counts;
        name = "Jane Doe";
        counts ++;
        weight = 0;
    }

    public Participant(String name){
        this.id = counts;
        this.name = name;
        counts ++;
        weight = 0;
    }

    public Participant(int id, String name){
        this.id = id;
        this.name = name;
    }

    public Participant(int id, String name, float weight){
        this.id = id;
        this.name = name;
        this.weight = weight;
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

    public float getWeight(){
        return weight;
    }

    public void setName(String name) {
        this.name = name;
    }

}
