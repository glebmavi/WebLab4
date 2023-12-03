package co.glebmavi.webproglab4.model.entity;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@Table(name = "web_prog_lab4_hits", schema = "s372819")
public class Hit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
    @Column(name = "x")
    private double x;
    @Column(name = "y")
    private double y;
    @Column(name = "r")
    private double r;
    @Column(name = "hit")
    private boolean hit;
    @Column(name = "curr_date")
    private Date curr_date;
    @Column(name = "exec_time")
    private long exec_time;



    public Hit() {
        this.owner = null;
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.hit = false;
        this.curr_date = Date.from(Instant.now());
        this.exec_time = 0;
    }


    @Override
    public String toString() {
        return "Hit{" +
                "owner=" + owner +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", hit=" + hit +
                ", currentDate='" + curr_date + '\'' +
                ", executionTime='" + exec_time + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Hit bean)) return false;
        return Objects.equals(getId(), bean.getId()) && getOwner().equals(bean.getOwner()) && Double.compare(getX(), bean.getX()) == 0 && Double.compare(getY(), bean.getY()) == 0 && Double.compare(getR(), bean.getR()) == 0 && isHit() == bean.isHit() && Objects.equals(getCurr_date(), bean.getCurr_date()) && Objects.equals(getExec_time(), bean.getExec_time());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getOwner(), getX(), getY(), getR(), isHit(), getCurr_date(), getExec_time());
    }

}

