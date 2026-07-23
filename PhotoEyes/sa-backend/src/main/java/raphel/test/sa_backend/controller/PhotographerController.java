package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.service.PhotographerService;

import java.util.List;

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

    @GetMapping
    public List<PhotographerDtoResponse> getAll() {
        return photographerService.getAll();
    }

    @GetMapping("/{id}")
    public PhotographerDtoResponse getById(@PathVariable Integer id) {
        return photographerService.getById(id);
    }
}
