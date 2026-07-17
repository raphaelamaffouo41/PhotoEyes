package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.AvailabilityDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvailabilityDtoRespons;

public interface AvailabilityService {
    AvailabilityDtoRespons createAvailability(AvailabilityDtoRequest request);
}
