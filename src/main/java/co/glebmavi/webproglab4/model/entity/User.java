package co.glebmavi.webproglab4.model.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "web_prog_lab4_users", schema = "s372819")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "username", nullable=false, unique=true)
    private String username;
    @Column(name = "password", nullable=false)
    private String password;

    @JsonManagedReference
    @OneToMany(mappedBy = "user")
    private List<Token> tokens;


}
