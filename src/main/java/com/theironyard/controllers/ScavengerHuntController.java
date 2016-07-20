package com.theironyard.controllers;

import com.theironyard.entities.Clue;
import com.theironyard.entities.Game;
import com.theironyard.entities.Team;
import com.theironyard.services.AnswerRepository;
import com.theironyard.services.ClueRepository;
import com.theironyard.services.GameRepository;
import com.theironyard.services.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

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

    @RequestMapping(path = "/newGame", method = RequestMethod.POST)
    public Game newGame(String lobbyName, String lobbyCode, HttpSession session) {
        session.getAttribute()
    }

    public void readClues() throws FileNotFoundException {
        File clueFile = new File("clues.tsv");
        Scanner fileScanner = new Scanner(clueFile);
        fileScanner.nextLine();
        while (fileScanner.hasNext()) {
            String line = fileScanner.nextLine();
            String [] columns = line.split("\t");
            Clue clue = new Clue(columns[0], columns[1], Double.valueOf(columns[2]), Double.valueOf(columns[3]));
            clues.save(clue);
        }
    }
}
