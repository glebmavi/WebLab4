package co.glebmavi.webproglab4.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record HitRequest(
        @JsonProperty("x") double x,
        @JsonProperty("y") double y,
        @JsonProperty("r") double r) {
}
