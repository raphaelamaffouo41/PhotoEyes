package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.AvailabilityDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvailabilityDtoRespons;
import raphel.test.sa_backend.service.AvailabilityService;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:4200")
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    public AvailabilityController(AvailabilityService availabilityService) {

        this.availabilityService = availabilityService;
    }

    @PostMapping
    public AvailabilityDtoRespons createAvailability(
            @RequestBody AvailabilityDtoRequest request) {

        return availabilityService
                .createAvailability(request);
    }
}
