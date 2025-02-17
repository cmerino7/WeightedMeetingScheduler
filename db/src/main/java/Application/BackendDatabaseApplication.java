package Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendDatabaseApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendDatabaseApplication.class, args);
	}

}
