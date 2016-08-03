package com.theironyard.controllers;

import com.theironyard.entities.*;
import com.theironyard.services.AnswerRepository;
import com.theironyard.services.ClueRepository;
import com.theironyard.services.GameRepository;
import com.theironyard.services.TeamRepository;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.*;


/**
 * Created by Erik on 7/20/16.
 */
@CrossOrigin
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
    @CrossOrigin
    @PostConstruct
    public void init() throws FileNotFoundException, SQLException {
        Server.createWebServer("-webPort", "28182").start();
        parseClues("clues.tsv");
    }

    @RequestMapping(path = "/create-game", method = RequestMethod.POST)
    public Game newTeam(@RequestBody Team team, HttpSession session) {
        // {teamName: "something", game: {lobbyName: "whatever"}}

        String alphabet= "abcdefghijklmnopqrstuvwxyz";
        String code = "";
        Random random = new Random();
        for (int i = 0; i < 4; i++) {
            char c = alphabet.charAt(random.nextInt(26));
            code += c;
        }

        Game game = team.getGame();
        game.setLobbyCode(code);

        ArrayList<Clue> gameClues = (ArrayList<Clue>) clues.findAll();
        Collections.shuffle(gameClues);
        gameClues = new ArrayList<> (gameClues.subList(0, 5) );

        game.setClues(gameClues);


        game = games.save(game);

        team = teams.save(team);

        session.setAttribute("team_id", team.getId());
        session.setAttribute("game_id", game.getId());


        return game;
    }

    @RequestMapping(path = "/add-team/{lobby_code}", method = RequestMethod.POST)
    public ResponseEntity<Object> addTeam(@RequestBody Team team, @PathVariable("lobby_code") String lobbyCode, HttpSession session) {
        //{teamName: "something"

        Game game = games.findFirstByLobbyCode(lobbyCode);

        if (game == null) {
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }

        team.setGame(game);

        team = teams.save(team);

        session.setAttribute("team_id", team.getId());
        session.setAttribute("game_id", game.getId());

        return new ResponseEntity<Object>(team, HttpStatus.OK);

    }

    @RequestMapping(path = "/get-teams", method = RequestMethod.GET)
    public ResponseEntity<Object> getTeams (HttpSession session) {

        Team team = teams.findOne((Integer) session.getAttribute("team_id"));

        GameTeams gameTeams = new GameTeams();
        gameTeams.lobbyCode = team.getGame().getLobbyCode();
        gameTeams.teams = team.getGame().getTeamList();

        return new ResponseEntity<Object>(gameTeams,HttpStatus.OK);

    }

    @RequestMapping(path = "/get-game-start", method = RequestMethod.GET)
    public ResponseEntity<Object> readyCheck (HttpSession session) {

        Game game = games.findOne((Integer) session.getAttribute("game_id"));

        return new ResponseEntity<Object>(game.getStartTime(), HttpStatus.OK);

    }

    @RequestMapping(path = "/start-game", method = RequestMethod.POST)
    public ResponseEntity<Object> startGame (HttpSession session) {

        Game game = games.findOne((Integer) session.getAttribute("game_id"));

        game.setStartTime(LocalDateTime.now());

        games.save(game);

        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    @RequestMapping(path = "/get-clues", method = RequestMethod.GET)
    public ResponseEntity<Object> clueList (HttpSession session) {

        Game game = games.findOne((Integer) session.getAttribute("game_id"));

        return new ResponseEntity<Object>(game, HttpStatus.OK);

    }

//    @RequestMapping(path = "/get-answers", method = RequestMethod.GET)
//    public ResponseEntity<Object> answerList (HttpSession session) {
//
//        Team team = teams.findOne((Integer) session.getAttribute("team_id"));
//
//        return new ResponseEntity<Object>(team.getAnswerList(), HttpStatus.OK);
//    }

    @RequestMapping(path = "/get-single-clue/{clue_id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getSingleClue (@PathVariable("clue_id") int id) {

       Clue clue = clues.findOne(id);

        return new ResponseEntity<Object>(clue, HttpStatus.OK);
    }

    @RequestMapping(path = "/at-location/{clueId}", method = RequestMethod.PUT)
    public ResponseEntity<Object> atLocation (HttpSession session, @RequestBody Answer answer, @PathVariable int clueId) {

        Team team = teams.findOne((Integer) session.getAttribute("team_id"));

        Clue clue = clues.findOne(clueId);

        Answer answer2 = answers.findFirstByClueAndTeam(clue, team);

        answer = new Answer(clue, team, answer.getAnswerLat(), answer.getAnswerLong(), true, LocalDateTime.now());

        if (answer2 == null) {
            answers.save(answer);
            return new ResponseEntity<Object>(answer, HttpStatus.OK);
        }

        return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);

    }

    @RequestMapping(path = "/game-over", method = RequestMethod.GET)
    public ResponseEntity<Object> gameOver (HttpSession session) {

        Game game = games.findOne((Integer) session.getAttribute("game_id"));

        return new ResponseEntity<Object>(game.getTeamList(), HttpStatus.OK);
    }

    @RequestMapping(path = "/cancel-game", method = RequestMethod.DELETE)
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
