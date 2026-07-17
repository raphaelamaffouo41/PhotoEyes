package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import raphel.test.sa_backend.model.dtos.dtoRequests.AvailabilityDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvailabilityDtoRespons;
import raphel.test.sa_backend.service.AvailabilityService;

@RestController
@RequestMapping("/availability")

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
