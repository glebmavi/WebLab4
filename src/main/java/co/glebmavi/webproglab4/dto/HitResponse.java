package co.glebmavi.webproglab4.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Date;

public record HitResponse(
        @JsonProperty("id") long id,
        String owner,
        double x,
        double y,
        double r,
        boolean hit,
        Date currDate,
        long execTime) {
}
