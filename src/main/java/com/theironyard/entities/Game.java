package com.theironyard.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by Erik on 7/19/16.
 */
@Entity
@Table(name = "games")
public class Game {

    @GeneratedValue
    @Id
    int id;

    @Column(nullable = false)
    String lobbyName;

    @Column(nullable = false)
    String lobbyCode;

    @Column(nullable = false)
    LocalDateTime startTime;

    @OneToMany(mappedBy = "game")
    List<Team> teamList;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="clue_game", joinColumns=@JoinColumn(name="game_id"), inverseJoinColumns=@JoinColumn(name="clue_id"))
    List<Clue> clues;

    public Game() {
    }

    public Game(String lobbyName, String lobbyCode, LocalDateTime startTime, List<Team> teamList, List<Clue> clues) {
        this.lobbyName = lobbyName;
        this.lobbyCode = lobbyCode;
        this.startTime = startTime;
        this.teamList = teamList;
        this.clues = clues;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLobbyName() {
        return lobbyName;
    }

    public void setLobbyName(String lobbyName) {
        this.lobbyName = lobbyName;
    }

    public String getLobbyCode() {
        return lobbyCode;
    }

    public void setLobbyCode(String lobbyCode) {
        this.lobbyCode = lobbyCode;
    }

    public List<Team> getTeamList() {
        return teamList;
    }

    public void setTeamList(List<Team> teamList) {
        this.teamList = teamList;
    }

    public List<Clue> getClues() {
        return clues;
    }

    public void setClues(List<Clue> clues) {
        this.clues = clues;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
}

