package co.glebmavi.webproglab4.model.service;

import co.glebmavi.webproglab4.dto.HitRequest;
import co.glebmavi.webproglab4.dto.HitResponse;
import co.glebmavi.webproglab4.model.entity.Hit;

import java.security.Principal;
import java.util.List;

public interface HitService {
    Hit addHit(HitRequest hitRequest, Principal user);

    void removeAllByOwner(Principal user);

    List<HitResponse> getAllHitsByOwner(Principal user);
}
