package co.glebmavi.webproglab4.model.service;


import co.glebmavi.webproglab4.model.entity.User;
import lombok.NonNull;

import java.util.Optional;

public interface UserService {
    Optional<User> getUser(@NonNull String username);

    boolean addUser(@NonNull User user);
}
