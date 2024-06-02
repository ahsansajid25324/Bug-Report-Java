package net.javaguides.springboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class InvalidBugDataException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidBugDataException(String message) {
        super(message);
    }
}
