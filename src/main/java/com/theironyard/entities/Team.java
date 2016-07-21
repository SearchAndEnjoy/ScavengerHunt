package com.theironyard.entities;

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

    @ManyToOne
    Game game;

    @OneToMany(mappedBy = "team")
    List<Answer> answerList;

}

