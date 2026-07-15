package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;

public interface PhotographerService {
    PhotographerDtoResponse createProfile(PhotographerDtoRequest request);
}
