package com.theironyard.entities;

import javax.persistence.*;

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

    @ManyToOne
    Answer answer;


}
