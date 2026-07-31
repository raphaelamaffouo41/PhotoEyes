package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;

import java.util.List;

public interface PortfolioService {
    PortfolioDtoRespons createPhoto(PortfolioDtoRequest request);
    List<PortfolioDtoRespons> getPortfolio(Integer photographerId);

    void deletePhoto(Integer id);
}
