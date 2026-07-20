package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.AvisDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvisDtoRespons;

public interface AvisService {
    AvisDtoRespons createAvis(AvisDtoRequest request);
}
