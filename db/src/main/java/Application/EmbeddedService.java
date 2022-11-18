package Application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.transaction.Transactional;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Transactional
public class EmbeddedService {

    @Autowired
    @Qualifier("localdatabase")
    JdbcTemplate localtemplate;

    //getting data

    //participant name given participant id
    static final String getParticipantName = "select name from participants where id = ?";
    //organizer name given organizer id
    static final String getOrganizerName = "select name from organizer where id = ?";
    //participant calendar given event id and participant id
    static final String getCalendarOfParticipant = "select timeslot, availability from calendar where event_id = ? and participant_id = ?";

    //adding data
    //add given participant name
    static final String addParticipantName = "insert into participants values(?, ?)";
    //add new timestamp and availability given event id and participant id
    static final String addAvailabilityForParticipant = "insert into Calendar values(?, ?, ?, ?)";
    //add new event based on organizer name
    static final String addOrganizer = "insert into organizer values(?, ?, ?)";

    static final String addEvent = "insert into event values(?,?,?)";

    //deleting event
    //delete rows based on event id
    static final String deleteEvent = "delete from organizer where event_id = ?;" + " delete from calendar where event_id = ?";


    public void addPName(String name){
        log.info("\nadding participant\n");
        Participant tempp = new Participant(name);
        localtemplate.update(addParticipantName, tempp.getId(), tempp.getName());
    }

    public void addTime(int p_id, Timestamp time, int e_id, Float availability){
        log.info("\nadding time for participant " + p_id + " at time: " + time + "with availability of " + availability + " to event " + e_id + "\n");
        localtemplate.update(addAvailabilityForParticipant, p_id, time, e_id, availability);
    }

    public void addNewOrganizer(String name){
        log.info("\nadding new event for organizer " + name + "\n");
        Organizer tempo = new Organizer(name);
        localtemplate.update(addOrganizer, tempo.getId(), tempo.getEvent_id(), tempo.getName());
    }

    public void addNewEvent(String startdate, String enddate, int e_id){
        log.info("\nthe new event starts from " + startdate + " and ends on " + enddate + " for Event #" + e_id + "\n");
        localtemplate.update(addEvent, e_id, Timestamp.valueOf(startdate), Timestamp.valueOf(enddate));
    }

    @RequestMapping(value = "/CalendarOfParticipant", method = RequestMethod.GET)
    public AppEvent getCOfP(int e_id, int p_id){
        log.info("\ngetting calendar of event " + e_id + " of participant " + p_id + "\n");
        List<Map<Timestamp, Float>> templ = localtemplate.query(getCalendarOfParticipant, new RowMapper<Map<Timestamp, Float>>(){
            @Override
            public Map<Timestamp, Float> mapRow(ResultSet rs, int rowNum) throws SQLException {
                Map<Timestamp, Float> tempm = new HashMap<>();
                tempm.put(rs.getTimestamp(1), rs.getFloat(2));
                return tempm;
            }
        }, e_id, p_id);
        AppEvent tempe = new AppEvent(e_id, p_id);
        for(int i = 0; i < templ.size(); i++){
            tempe.addlineMap(templ.get(i));
        }
        return tempe;
    }
}
