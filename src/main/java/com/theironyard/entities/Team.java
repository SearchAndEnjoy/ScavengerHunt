package com.theironyard.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Erik on 7/19/16.
 */
@Entity
@Table(name = "teams")
public class Team {

    @GeneratedValue
    @Id
    int id;

    @Column(nullable = false)
    String teamName;

    @JsonIgnore
    @JsonDeserialize
    @ManyToOne
    Game game;

    @OneToMany(mappedBy = "team")
    List<Answer> answerList;

    public Team() {

    }

    public Team(String teamName, Game game, List<Answer> answerList) {
        this.teamName = teamName;
        this.game = game;
        this.answerList = answerList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setAnswerList(List<Answer> answerList) {
        this.answerList = answerList;
    }


}

