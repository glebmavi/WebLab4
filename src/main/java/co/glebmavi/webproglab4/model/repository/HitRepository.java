package co.glebmavi.webproglab4.model.repository;

import co.glebmavi.webproglab4.model.entity.Hit;
import co.glebmavi.webproglab4.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<Hit, Long> {
    List<Hit> findAllByOwner(User owner);
    void deleteAllByOwner(User owner);
}
