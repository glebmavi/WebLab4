package co.glebmavi.webproglab4.db;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource datasource() throws IOException {
        Properties properties = new Properties();
        properties.load(DataSourceConfig.class.getClassLoader().getResourceAsStream("db.cfg"));
        return DataSourceBuilder.create()
                .driverClassName(properties.getProperty("db.driver"))
                .url(properties.getProperty("db.url"))
                .username(properties.getProperty("db.user"))
                .password(properties.getProperty("db.password"))
                .build();
    }
}
