package co.glebmavi.webproglab4.model.repository;

import co.glebmavi.webproglab4.dto.HitResponse;
import co.glebmavi.webproglab4.model.entity.Hit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HitRepository extends JpaRepository<Hit, Long> {

    @Query("SELECT new co.glebmavi.webproglab4.dto.HitResponse(" +
            "h.id, " +
            "h.owner.username, " +
            "h.x, " +
            "h.y, " +
            "h.r, " +
            "h.hit, " +
            "h.currDate, " +
            "h.execTime) " +
            "FROM Hit h WHERE h.owner.id = :ownerId")
    List<HitResponse> findAllByOwner_Id(long ownerId);
    void deleteAllByOwner_Id(long ownerId);
}
