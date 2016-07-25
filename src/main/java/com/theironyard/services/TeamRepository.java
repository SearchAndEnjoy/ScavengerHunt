package com.theironyard.services;

import com.theironyard.entities.Team;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Erik on 7/19/16.
 */
public interface TeamRepository extends CrudRepository<Team, Integer> {
    public Iterable <Team> findByGameId (int gameId);
}
