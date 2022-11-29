package Application;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.internal.verification.Times;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class BackendDatabaseApplicationTests {

	@Autowired
	EmbeddedService localservice;

	//@Test
	@Order(1)
	void addOrganizer(){
		localservice.addNewOrganizer("Stefano Foresti");
	}

	//@Test
	@Order(2)
	void addEvent(){
		localservice.addNewEvent("2022-11-15 08:00:00.000", "2022-11-30 08:00:00.000", 1, "Name");
	}

	//@Test
	@Order(3)
	void addParticipant(){
		localservice.addPName("Eric Wu");
	}

	//@Test
	@Order(4)
	void addTime(){
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 08:00:00.000"), 1, 0.2f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 09:00:00.000"), 1, 0.5f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 10:00:00.000"), 1, 0.4f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 11:00:00.000"), 1, 0.6f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 12:00:00.000"), 1, 0.8f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 13:00:00.000"), 1, 0.9f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 14:00:00.000"), 1, 0.7f);
		localservice.addTime(6, Timestamp.valueOf("2022-11-28 15:00:00.000"), 1, 0.4f);
	}

	//@Test
	@Order(5)
	void pull(){
		AppEvent tempa= localservice.getCOfP(1);
		System.out.println(tempa.getCalendar().toString());
	}

	@Test
	void pullalltime(){
		List<Timestamp> output = localservice.getalltime(1);
		System.out.println(output);
		List<Float> output2 = localservice.getallava(1);
		System.out.println(output2);
	}

}
