package com.theironyard.services;

import com.theironyard.entities.Answer;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by Erik on 7/21/16.
 */
public interface AnswerRepository extends CrudRepository<Answer, Integer> {
}
