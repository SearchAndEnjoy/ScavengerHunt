package com.theironyard.entities;

import javax.persistence.*;

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


    @ManyToOne
    Team team;

    @Column
    boolean atLocation = false;

}
