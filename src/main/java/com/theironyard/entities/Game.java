package com.theironyard.entities;


import javax.persistence.*;

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

    @ManyToOne
    Team team;

    public Game() {
    }

    public Game(String lobbyName, String lobbyCode, Team team) {
        this.lobbyName = lobbyName;
        this.lobbyCode = lobbyCode;
        this.team = team;
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

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }
}

