package com.theironyard.services;

import com.theironyard.entities.Game;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Erik on 7/19/16.
 */
public interface GameRepository extends CrudRepository <Game, Integer> {
    Game findFirstByLobbyCode (String lobbyCode);
}
