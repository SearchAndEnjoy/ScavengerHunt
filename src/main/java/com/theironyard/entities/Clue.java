package com.theironyard.entities;


import javax.persistence.*;

/**
 * Created by Erik on 7/19/16.
 */
@Entity
@Table(name = "clues")
public class Clue {

    @GeneratedValue
    @Id
    int id;

    @Column(nullable = false)
    String clue;

    @Column(nullable = false)
    String locationName;

    @Column(nullable = false)
    double latitude;

    @Column(nullable = false)
    double longitude;

    public Clue() {
    }




}
