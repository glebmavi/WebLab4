package co.glebmavi.webproglab4.controller;

import co.glebmavi.webproglab4.dto.JwtRequest;
import co.glebmavi.webproglab4.dto.JwtResponse;
import co.glebmavi.webproglab4.dto.RefreshJwtRequest;
import co.glebmavi.webproglab4.model.entity.User;
import co.glebmavi.webproglab4.model.service.AuthService;
import co.glebmavi.webproglab4.model.service.UserService;
import jakarta.security.auth.message.AuthException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        log.info("Login request: {}", request);
        try {
            return ResponseEntity.ok(authService.login(request));
        } catch (AuthException e) {
            log.error("Login error: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refresh(@RequestBody RefreshJwtRequest request) {
        log.info("Refresh request: {}", request.getRefreshToken());
        try {
            return ResponseEntity.ok(authService.refreshAccessToken(request.getRefreshToken()));
        } catch (AuthException e) {
            log.error("Refresh error: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<JwtResponse> register(@RequestBody JwtRequest request) {
        log.info("Register request: {}", request);
        final var newUser = new User();
        newUser.setUsername(request.username());
        newUser.setPassword(request.password());

        try {
            final var wasAdded = userService.addUser(newUser);
            if (wasAdded) {
                return ResponseEntity.ok(authService.login(request));
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (AuthException e) {
            log.error("Register error: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(Principal principal) {
        log.info("Logout request");
        return ResponseEntity.ok().build();
    }


}