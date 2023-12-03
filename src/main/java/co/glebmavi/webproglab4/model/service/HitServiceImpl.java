package co.glebmavi.webproglab4.model.service;

import co.glebmavi.webproglab4.dto.HitRequest;
import co.glebmavi.webproglab4.model.entity.Hit;
import co.glebmavi.webproglab4.model.entity.User;
import co.glebmavi.webproglab4.model.repository.HitRepository;
import co.glebmavi.webproglab4.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.Instant;
import java.util.Date;
import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Service
public class HitServiceImpl implements HitService {

    private final HitRepository hitRepository;
    private final UserRepository userRepository;

    @Override
    public Hit addHit(HitRequest hitRequest, Principal user) {
        final long startExec = System.currentTimeMillis();
        final Hit currHit = new Hit();
        final boolean isHit = AreaHitChecker.isHit(hitRequest.x(), hitRequest.y(), hitRequest.r());

        currHit.setX(hitRequest.x());
        currHit.setY(hitRequest.y());
        currHit.setR(hitRequest.r());
        currHit.setHit(isHit);
        currHit.setCurr_date(Date.from(Instant.now()));
        final long endExec = System.currentTimeMillis();
        final long executionTime = endExec - startExec;
        currHit.setExec_time(executionTime);
        currHit.setOwner(userRepository.findByUsername(user.getName()));
        log.info("Adding hit with x = " + hitRequest.x() + " y = " + hitRequest.y() + " r = " + hitRequest.r() + " for user " + user.getName());

        return hitRepository.save(currHit);
    }

    @Override
    public void removeAllByOwner(User user) {
        hitRepository.deleteAllByOwner(user);
    }

    @Override
    public List<Hit> getAllHitsByOwner(User user) {
        return hitRepository.findAllByOwner(user);
    }
}
