package com.theironyard.controllers;

import com.sun.org.apache.bcel.internal.generic.IF_ACMPEQ;
import com.theironyard.entities.Answer;
import com.theironyard.entities.Clue;
import com.theironyard.entities.Game;
import com.theironyard.entities.Team;
import com.theironyard.services.AnswerRepository;
import com.theironyard.services.ClueRepository;
import com.theironyard.services.GameRepository;
import com.theironyard.services.TeamRepository;
import org.apache.catalina.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

/**
 * Created by Erik on 7/20/16.
 */
@RestController
public class ScavengerHuntController {

    @Autowired
    TeamRepository teams;

    @Autowired
    GameRepository games;

    @Autowired
    ClueRepository clues;

    @Autowired
    AnswerRepository answers;



    // initialize the database
    @PostConstruct
    public void init() throws FileNotFoundException {
        parseClues("clues.tsv");
    }

    @RequestMapping(path = "/create-game", method = RequestMethod.POST)
    public Team newTeam(@RequestBody Team team, HttpSession session) {
        // {teamName: "something", game: {lobbyName: "whatever"}}

        String alphabet= "abcdefghijklmnopqrstuvwxyz";
        String code = "";
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            char c = alphabet.charAt(random.nextInt(26));
            code += c;
        }

        games.save(team.getGame());

        team = teams.save(team);

        session.setAttribute("team_id", team.getId());
//        session.setAttribute("lobby_code", team.getGame().getLobbyCode());


//        session.setAttribute("game_id",team.getGame());

        return team;
    }

//    @RequestMapping(path = "/create-game", method = RequestMethod.POST)
//    public Game newGame(@RequestBody Game game, HttpSession session) {
//
//        games.save(game);
//
//        session.setAttribute("game_id", game.getId());
//
//        return game;
//    }

    @RequestMapping(path = "/add-team", method = RequestMethod.POST)
    public Team addTeam (String teamName, int game_id, HttpSession session) {
        Team team = new Team();
        team.setTeamName(teamName);


        session.setAttribute("team_id", team.getId());

        return team;


    }

    @RequestMapping(path = "/start-game/{game_id}", method = RequestMethod.POST)
    public Game startGame() {

        return startGame();

    }

    @RequestMapping(path = "/get-clues/{game_id}", method = RequestMethod.GET)
    public List<Clue> clueList (HttpSession session) {

        ArrayList<Clue> gameClues = (ArrayList<Clue>) clues.findAll();
        Collections.shuffle(gameClues);
        gameClues = (ArrayList<Clue>) gameClues.subList(0, 5);

        return gameClues;

    }


    @RequestMapping(path = "/at-location/{team_id}", method = RequestMethod.PUT)
    public Answer atLocation () {

        return atLocation();

    }


    @RequestMapping(path = "/cancel-game/{game_id}", method = RequestMethod.DELETE)
    public HttpStatus cancelGame (HttpSession session) {
        session.invalidate();

        return HttpStatus.OK;
    }

    //Parse the .tsv to populate database with clues
    public void parseClues(String fileName) throws FileNotFoundException {
        if (clues.count() == 0) {
            File clueFile = new File(fileName);
            Scanner fileScanner = new Scanner(clueFile);
            fileScanner.nextLine();
            while (fileScanner.hasNext()) {
                String[] columns = fileScanner.nextLine().split("\t");
                Clue clue = new Clue(columns[0], columns[1], Double.valueOf(columns[2]), Double.valueOf(columns[3]));
                clues.save(clue);
            }
        }
    }
}
