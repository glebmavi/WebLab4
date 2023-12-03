package co.glebmavi.webproglab4.model.repository;


import co.glebmavi.webproglab4.model.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {
    Optional<Token> findByToken(String token);

    @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :userId\s
      """)
    List<Token> findAllValidTokenByUser(Long userId);
}
