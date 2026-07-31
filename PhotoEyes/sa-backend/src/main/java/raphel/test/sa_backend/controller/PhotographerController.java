package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerProfileRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDashboardResponse;
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

    @GetMapping
    public List<PhotographerDtoResponse> getAll() {
        return photographerService.getAll();
    }

    @GetMapping("/{id}")
    public PhotographerDtoResponse getById(@PathVariable Integer id) {
        return photographerService.getById(id);
    }

    @GetMapping("/{id}/dashboard")
    public PhotographerDashboardResponse dashboard(@PathVariable Integer id){

        return photographerService.getDashboard(id);

    }

    @PutMapping("/{id}/complete-profile")
    public PhotographerDtoResponse completeProfile(
            @PathVariable Integer id,
            @RequestBody PhotographerProfileRequest request){
        return photographerService.completeProfile(id, request);

    }

    @DeleteMapping("/{id}")
    public void delete(
            @PathVariable Integer id){

        photographerService.deleteProfile(id);
    }
}
