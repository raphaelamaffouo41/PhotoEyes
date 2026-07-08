package raphel.test.sa_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.LoginDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.RegisterDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.UserRequestDto;
import raphel.test.sa_backend.model.dtos.dtoResponses.LoginDtoRespons;
import raphel.test.sa_backend.model.dtos.dtoResponses.RegisterDtoRespons;
import raphel.test.sa_backend.service.UserService;


import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/auth")
public class Usercontroller {

    private final UserService userService;

    public Usercontroller(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public RegisterDtoRespons register(
            @RequestBody RegisterDtoRequest request) {

        return userService.registerDtoRespons(request);
    }

    @PostMapping("/login")
    public LoginDtoRespons login(
            @RequestBody LoginDtoRequest request) {

        return userService.loginDtoRespons(request);
    }
}