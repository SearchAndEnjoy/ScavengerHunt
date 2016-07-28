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

    @Column(nullable = false)
    double answerLat;

    @Column(nullable = false)
    double answerLong;

    boolean atLocation = false;

    @Column(nullable = false)
    LocalDateTime timestamp;

    public Answer() {

    }

    public Answer(Clue clue, Team team, double answerLat, double answerLong, boolean atLocation, LocalDateTime timestamp) {
        this.clue = clue;
        this.team = team;
        this.answerLat = answerLat;
        this.answerLong = answerLong;
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

    public double getAnswerLat() {
        return answerLat;
    }

    public void setAnswerLat(double answerLat) {
        this.answerLat = answerLat;
    }

    public double getAnswerLong() {
        return answerLong;
    }

    public void setAnswerLong(double answerLong) {
        this.answerLong = answerLong;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isAtLocation() {
        return atLocation;
    }

    public void setAtLocation(boolean atLocation) {
        this.atLocation = atLocation;
    }

}
