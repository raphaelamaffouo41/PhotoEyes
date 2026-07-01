package raphel.test.sa_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.LoginDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.UserRequestDto;
import raphel.test.sa_backend.model.dtos.dtoResponses.LoginDtoRespons;
import raphel.test.sa_backend.service.UserService;


import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping( path = "User")
public class Usercontroller {

    private UserService userService;

    public Usercontroller(UserService userService) {

        this.userService = userService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    public void creerUser(@RequestBody UserRequestDto userRequestDto) {

        userService.creerUser(userRequestDto);
    }
    @PostMapping("/login")
    public LoginDtoRespons loginDtoRespons(@RequestBody LoginDtoRequest loginDtoRequest ) {

        return loginDtoRespons(loginDtoRequest);
    }

}
