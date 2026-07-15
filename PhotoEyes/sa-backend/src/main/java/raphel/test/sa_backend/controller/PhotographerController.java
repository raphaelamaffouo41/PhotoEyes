package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.service.PhotographerService;

@RestController
@RequestMapping("/photographers")

public class PhotographerController {
    private final PhotographerService photographerService;

    public PhotographerController(
            PhotographerService photographerService) {

        this.photographerService =
                photographerService;
    }

    @PostMapping
    public PhotographerDtoResponse createProfile(
            @RequestBody PhotographerDtoRequest request) {

        return photographerService
                .createProfile(request);
    }
}
