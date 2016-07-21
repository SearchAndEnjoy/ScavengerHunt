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

    public Clue(String clue, String locationName, double latitude, double longitude) {
        this.clue = clue;
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClue() {
        return clue;
    }

    public void setClue(String clue) {
        this.clue = clue;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
