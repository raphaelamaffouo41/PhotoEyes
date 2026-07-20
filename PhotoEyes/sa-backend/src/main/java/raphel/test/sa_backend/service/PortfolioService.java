package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;

public interface PortfolioService {
    PortfolioDtoRespons createPhoto(PortfolioDtoRequest request);
}
