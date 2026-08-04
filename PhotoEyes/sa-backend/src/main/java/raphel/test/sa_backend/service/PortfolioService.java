package raphel.test.sa_backend.service;

import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;

import java.io.IOException;
import java.util.List;

public interface PortfolioService {
    PortfolioDtoRespons createPhoto(MultipartFile file, Integer photographerId) throws IOException;
    List<PortfolioDtoRespons> getPortfolio(Integer photographerId);

    void deletePhoto(Integer id);
}
