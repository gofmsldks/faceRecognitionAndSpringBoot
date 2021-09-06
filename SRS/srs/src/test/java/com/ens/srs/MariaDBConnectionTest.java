package com.ens.srs;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;

public class MariaDBConnectionTest {
	private static final Logger LOGGER = (Logger) LogManager.getLogger(LoggingApplication.class);
	String url ="jdbc:mariadb://localhost:3306/test_database?user=root&password=root";
	@Test
	public void connectionTest() {
		try {
			Class.forName("org.mariadb.jdbc.Driver");
			Connection connection = DriverManager.getConnection(url);
			LOGGER.info("### connection : " + connection + " - 연결 성공 ####");
		}catch (ClassNotFoundException e) {
			e.printStackTrace();
		}catch (SQLException e) {
			e.printStackTrace();
		}
	}
}

