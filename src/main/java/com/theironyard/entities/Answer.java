package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by Erik on 7/21/16.
 */
@Entity
@Table(name = "answers")
public class Answer {

    @GeneratedValue
    @Id
    int id;

    @ManyToOne
    Clue clue;

    @JsonIgnore
    @ManyToOne
    Team team;

    boolean atLocation = false;

    @Column(nullable = false)
    LocalDateTime timestamp;

    public Answer() {

    }

    public Answer(Clue clue, Team team, boolean atLocation, LocalDateTime timestamp) {
        this.clue = clue;
        this.team = team;
        this.atLocation = atLocation;
        this.timestamp = timestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Clue getClue() {
        return clue;
    }

    public void setClue(Clue clue) {
        this.clue = clue;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean atLocation() {
        return atLocation;
    }

    public void setAtLocation(boolean atLocation) {
        this.atLocation = atLocation;
    }
}
