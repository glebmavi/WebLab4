package co.glebmavi.webproglab4.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public record HitResponse(
        @JsonProperty("id") long id,
        Date curr_date,
        long exec_time,
        double x,
        double y,
        double r,
        boolean hit) {
}
