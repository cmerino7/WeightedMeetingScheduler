package Application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin()
@RestController
@RequestMapping("/database")
@Slf4j
//@Transactional
public class EmbeddedService {

    @Autowired
    @Qualifier("localdatabase")
    JdbcTemplate localtemplate;

    //getting data
    //getting all timeslots for organizer
    static final String getAllCalendar = "SELECT timeslot"
                                        + " FROM CALENDAR"
                                        + " WHERE event_id = ?"
                                        + " GROUP BY TIMESLOT";
    //getting all availability for organizer
    static final String getAllAvailability= "SELECT sum(availability)/count(participant_id) AS totalavailability"
                                        + " FROM CALENDAR"
                                        + " WHERE event_id = ?"
                                        + " GROUP BY TIMESLOT";

    static final String getAllCalendarWAva = "SELECT timeslot, sum(weight)/count(participant_id) AS totalavailability"
                                            + " FROM CALENDAR AS c, PARTICIPANTS AS p"
                                            + " WHERE c.EVENT_ID  = ?"
                                            + " AND c.PARTICIPANT_ID = p.ID"
                                            + " GROUP BY c.TIMESLOT";

    static final String getAllCalendarAva = "SELECT timeslot, sum(availability)/count(participant_id) AS totalavailability"
            + " FROM CALENDAR AS c, PARTICIPANTS AS p"
            + " WHERE c.EVENT_ID  = ?"
            + " AND c.PARTICIPANT_ID = p.ID"
            + " GROUP BY c.TIMESLOT";

    //participant name given participant id
    static final String getParticipantName = "select p_name from participants where id = ?";
    //participant id given participant name
    static final String getPArticipantId = "select id from participants where p_name = ?";
    //get all participant names
    static final String getParticipantList = "select id, p_name, weight from participants";
    //organizer name given organizer id
    static final String getOrganizerName = "select name from organizer where id = ?";

    //participant calendar given participant name
    static final String getCalendarOfParticipant = "select timeslot, availability from calendar"
                                                   + " where participant_id in("
                                                   + " select id from participants where p_name = ?)";
    //event name given event id
    static final String getEventName = "select event_name from event where event_id = ?";

    //get weight given p_name
    static final String getWeight = "SELECT weight"
                                + " FROM PARTICIPANTS"
                                + " WHERE P_NAME = ?";

    //adding data
    //add given participant name
    static final String addParticipantName = "insert into participants values(?, ?)";
    //add new timestamp and availability given event id and participant id
    static final String addAvailabilityForParticipant = "insert into Calendar values(?, ?, ?, ?)";
    //add new event based on organizer name
    static final String addOrganizer = "insert into organizer values(?, ?, ?)";

    static final String addEvent = "insert into event values(?,?,?,?)";

    //deleting event
    //delete rows based on event id
    static final String deleteEvent = "delete from organizer where event_id = ?;" + " delete from calendar where event_id = ?";

    //delete row based on p_name, e_id, and time
    static final String deleteRow = "DELETE FROM CALENDAR"
                                + " WHERE participant_id = ?"
                                + " AND timeslot = ?"
                                + " AND EVENT_ID  = ?";


    //update event
    static final String updateWeight = "UPDATE PARTICIPANTS"
                                    + " SET WEIGHT = ?"
                                    + " WHERE P_NAME = ?";

    public void addPName(String name){
        log.info("\nadding participant\n");
        Participant tempp = new Participant(name);
        localtemplate.update(addParticipantName, tempp.getId(), tempp.getName());
    }

    public void deleteRowforParticipant(int p_id, Timestamp time, int e_id){
        log.info("\nDeleting Event for participant " + p_id + " on time " + time + " of event " + e_id + "\n");
        localtemplate.update(deleteRow, p_id, time, e_id);
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

    @PostMapping("/Events/{id}")
    public void addNewEvent(String startdate, String enddate, int e_id, String e_name){
        log.info("\nthe new event starts from " + startdate + " and ends on " + enddate + " for Event #" + e_id + "with name: "  + e_name + "\n");
        localtemplate.update(addEvent, e_id, Timestamp.valueOf(startdate), Timestamp.valueOf(enddate), e_name);
    }


    @GetMapping("/CalendarName/{e_id}")
    public List<Event_ID_Name>getE_Name(@PathVariable("e_id")int e_id){
        log.info("\ngetting event name of event id:" + e_id);
        String output = localtemplate.queryForObject(getEventName, new Object[]{Integer.valueOf(e_id)} , (rs, rowNum) -> {
            return new String(rs.getString(1));
        });
        Event_ID_Name temp = new Event_ID_Name(e_id, output);
        log.info("Name: "+ output + "\n");
        return Arrays.asList(temp);
    }

    @GetMapping("test1")
    public List<Event_ID_Name> test(){
        return Arrays.asList(new Event_ID_Name(2, "test2"));
    }

    @GetMapping("/ParticipantList")
    public List<Participant> getPList(){
        log.info("Getting List of Participants");
        List<Participant> list = localtemplate.query(getParticipantList, new RowMapper() {
            @Override
            public Participant mapRow(ResultSet rs, int rowNum) throws SQLException {
                Participant tempp = new Participant(rs.getInt(1), rs.getString(2), rs.getFloat(3));
                return tempp;
            }
        });
        return list;
    }

    @GetMapping("test2")
    public List<String> test2(){
        return Arrays.asList("1", "2", "3");
    }

    @GetMapping("/alltime/{e_id}")
    public List<Timestamp> getalltime(@PathVariable("e_id")int e_id) {
        log.info("getting all times for organizer to view");
        List<Timestamp> output = localtemplate.query(getAllCalendar, new RowMapper() {
            @Override
            public Timestamp mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getTimestamp(1);
            }
        }, e_id);
        return output;
    }

    @GetMapping("/allava/{e_id}")
    public List<Float> getallava(@PathVariable("e_id")int e_id) {
        log.info("getting all availabilities for organizer to view");
        List<Float> output = localtemplate.query(getAllAvailability, new RowMapper() {
            @Override
            public Float mapRow(ResultSet rs, int rowNum) throws SQLException {
                return rs.getFloat(1);
            }
        }, e_id);
        return output;
    }

    @GetMapping("/alltime/test/{e_id}")
    public List<TimeStampObj> getalltimetest(@PathVariable("e_id")int e_id) {
        log.info("getting all times for organizer to view");
        List<TimeStampObj> output = localtemplate.query(getAllCalendar, new RowMapper() {
            @Override
            public TimeStampObj mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new TimeStampObj(rs.getTimestamp(1));
            }
        }, e_id);
        return output;
    }

    @GetMapping("/allava/test/{e_id}")
    public List<FloatObj> getallavatest(@PathVariable("e_id")int e_id) {
        log.info("getting all availabilities for organizer to view");
        List<FloatObj> output = localtemplate.query(getAllAvailability, new RowMapper() {
            @Override
            public FloatObj mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new FloatObj(1, rs.getFloat(1));
            }
        }, e_id);
        return output;
    }

    @GetMapping("/getevents/{e_id}")
    public List<Events> getallevents(@PathVariable("e_id")int e_id){
        log.info("Getting all events for organizer to view");
        List<Events> output = localtemplate.query(getAllCalendarWAva, new RowMapper<Events>() {
            @Override
            public Events mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Events(rowNum, rs.getTimestamp(1),rs.getFloat(2));
            }
        }, e_id);
        return output;
    }

    @GetMapping("/geteventsA/{e_id}")
    public List<Events> getalleventsA(@PathVariable("e_id")int e_id){
        log.info("Getting all events for organizer to view");
        List<Events> output = localtemplate.query(getAllCalendarAva, new RowMapper<Events>() {
            @Override
            public Events mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Events(rowNum, rs.getTimestamp(1),rs.getFloat(2));
            }
        }, e_id);
        return output;
    }

    @GetMapping("/CalendarOfP/{p_name}")
    public List<Events> getCOfP(@PathVariable("p_name") String p_name){
        log.info("getting events of participant " + p_name);
        int p_id = localtemplate.queryForObject(getPArticipantId, new Object[]{p_name}, Integer.class);
        List<Events> output = localtemplate.query(getCalendarOfParticipant, new RowMapper<Events>() {
            @Override
            public Events mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Events(rowNum, rs.getTimestamp(1),rs.getFloat(2));
            }
        }, p_name);
        return output;
    }

    @GetMapping("/Post/{p_name}/{start}/{end}/{color}")
    public void insertTime(@PathVariable("p_name") String p_name, @PathVariable("start") String start, @PathVariable("end") String end, @PathVariable("color") int color) throws ParseException {
        log.info("posting items to backend");
        log.info(p_name);
        log.info(start);
        log.info(end);
        log.info(String.valueOf(color));

        int p_id = localtemplate.queryForObject(getPArticipantId, new Object[]{p_name}, Integer.class);
        SimpleDateFormat format1 = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss");
        java.util.Date date1 = format1.parse(start);
        log.info(String.valueOf(date1));
        log.info(String.valueOf(p_id));
        Timestamp tempstart = new Timestamp(date1.getTime());
        log.info(String.valueOf(tempstart));
        float ava = (float) (color * 0.01);
        log.info(String.valueOf(ava));
        this.addTime(p_id, tempstart, 1, ava);
    }

    @GetMapping("/Delete/{p_name}/{start}")
    public void DeleteTime(@PathVariable("p_name") String p_name, @PathVariable("start") String start) throws ParseException {
        log.info("Deleting Time for participant" + p_name + " of time " + start);
        log.info(p_name);
        log.info(start);
        int p_id = localtemplate.queryForObject(getPArticipantId, new Object[]{p_name}, Integer.class);
        SimpleDateFormat format1 = new SimpleDateFormat("E MMM dd yyyy HH:mm:ss");
        java.util.Date date1 = format1.parse(start);
        log.info(String.valueOf(date1));
        Timestamp tempstart = new Timestamp(date1.getTime());
        this.deleteRowforParticipant(p_id, tempstart, 1);
    }

    @GetMapping("Update/{p_name}/{weight}")
    public void UpdateWeight(@PathVariable("p_name") String p_name, @PathVariable("weight") float weight){
        log.info("Updating weight of participant " + p_name + " with weight " + weight);
        //int p_id = localtemplate.queryForObject(getPArticipantId, new Object[]{p_name}, Integer.class);
        if(p_name.equals("NOBODY SELECTED")){
            return;
        }
        localtemplate.update(updateWeight, weight, p_name);
    }

    @GetMapping("Weight/{p_name}")
    public float GetWeight(@PathVariable("p_name")String p_name){
        log.info("getting weight for participant " + p_name);
        if(p_name.equals("NOBODY SELECTED")){
            return 0;
        }
        float output = localtemplate.queryForObject(getWeight, new Object[]{p_name}, Float.class);
        return output;
    }

}


