package com.theironyard.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by Erik on 7/19/16.
 */
@Entity
@Table(name = "answers")
public class Answer {

    @GeneratedValue
    @Id
    int id;

    @Column(nullable = false)
    boolean atLocation;

    LocalDateTime lDT;
}
