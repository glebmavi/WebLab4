package co.glebmavi.webproglab4.model.service;


import co.glebmavi.webproglab4.dto.JwtRequest;
import co.glebmavi.webproglab4.dto.JwtResponse;
import jakarta.security.auth.message.AuthException;
import lombok.NonNull;

public interface AuthService {
    JwtResponse login(@NonNull JwtRequest request) throws AuthException;

    JwtResponse refreshAccessToken(@NonNull String refreshToken) throws AuthException;
}
