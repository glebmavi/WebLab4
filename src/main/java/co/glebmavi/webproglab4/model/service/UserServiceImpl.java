package co.glebmavi.webproglab4.model.service;

import co.glebmavi.webproglab4.auth.UserPasswordUtil;
import co.glebmavi.webproglab4.model.entity.User;
import co.glebmavi.webproglab4.model.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Optional<User> getUser(@NonNull String username) {
        final var user = userRepository.findByUsername(username);
        return Optional.ofNullable(user);
    }

    @Override
    public boolean addUser(@NonNull User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            log.info("User with username {} already exists", user.getUsername());
            return false;
        }
        user.setPassword(UserPasswordUtil.hashPassword(user.getPassword()));
        userRepository.save(user);
        log.info("User with username {} was added", user.getUsername());
        return true;
    }
}
