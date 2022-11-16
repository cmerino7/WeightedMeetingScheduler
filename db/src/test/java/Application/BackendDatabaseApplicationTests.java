package Application;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;

@SpringBootTest
class BackendDatabaseApplicationTests {

	@Autowired
	EmbeddedService localservice;

	@Test
	@Order(1)
	void addOrganizer(){
		localservice.addNewOrganizer("Stefano Foresti");
	}

	@Test
	@Order(2)
	void addEvent(){
		localservice.addNewEvent("2022-11-15 08:00:00.000", "2022-11-30 08:00:00.000", 1);
	}

	@Test
	@Order(3)
	void addParticipant(){
		localservice.addPName("Eric Wu");
	}

	@Test
	@Order(4)
	void addTime(){
		localservice.addTime(1, Timestamp.valueOf("2022-11-28 08:00:00.000"), 1, 0.9f);
		localservice.addTime(1, Timestamp.valueOf("2022-11-28 12:00:00.000"), 1, 0.0f);
		localservice.addTime(1, Timestamp.valueOf("2022-11-28 13:00:00.000"), 1, 0.0f);
		localservice.addTime(1, Timestamp.valueOf("2022-11-28 14:00:00.000"), 1, 0.0f);
	}

	@Test
	@Order(5)
	void pull(){
		AppEvent tempa= localservice.getCOfP(1, 1);
		System.out.println(tempa.getCalendar().toString());
	}

}
