package co.glebmavi.webproglab4.controller;

import co.glebmavi.webproglab4.dto.HitRequest;
import co.glebmavi.webproglab4.dto.HitResponse;
import co.glebmavi.webproglab4.model.entity.Hit;
import co.glebmavi.webproglab4.model.entity.User;
import co.glebmavi.webproglab4.model.service.HitService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@CrossOrigin
@RestController
@RequestMapping("/api/hit")
public class HitController {
    private final HitService hitService;

    public HitController(HitService hitService) {
        this.hitService = hitService;
    }

    @PostMapping
    public ResponseEntity<HitResponse> addAttempt(
            Principal principal,
            @RequestBody HitRequest hitRequest) {
        log.info("Received hit request: {}", hitRequest);
        final var addedHit = hitService.addHit(hitRequest, principal);
        final var responseDto = new HitResponse(
                addedHit.getId(),
                addedHit.getCurr_date(),
                addedHit.getExec_time(),
                addedHit.getX(), addedHit.getY(),
                addedHit.getR(), addedHit.isHit()
        );
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll(Principal principal) {
        log.info("Deleting all hits for user " + principal.getName());
        hitService.removeAllByOwner((User) principal);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Hit>> allResultsByUser(Principal principal) {
        log.info("Getting all hits for user " + principal.getName());
        return ResponseEntity.ok(hitService.getAllHitsByOwner((User) principal));
    }

}