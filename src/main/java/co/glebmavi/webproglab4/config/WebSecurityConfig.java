package co.glebmavi.webproglab4.config;


import co.glebmavi.webproglab4.auth.jwt.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtFilter jwtFilter;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.cors(withDefaults());
        http.sessionManagement((httpSecuritySessionManagementConfigurer) -> httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.authorizeHttpRequests((authorizeHttpRequests) ->authorizeHttpRequests.requestMatchers("/api/auth/login", "/api/auth/refresh", "/api/auth/register").permitAll()
                .anyRequest().authenticated());
        http.addFilterAfter(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        http.logout((logout) ->
                logout.logoutUrl("/api/auth/logout")
                        .addLogoutHandler(logoutHandler)
                        .logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> SecurityContextHolder.clearContext()));
        return http.build();
    }
}