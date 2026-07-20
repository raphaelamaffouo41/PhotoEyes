package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;
import raphel.test.sa_backend.service.PortfolioService;

@RestController
@RequestMapping("/gallery")
@CrossOrigin(origins = "http://localhost:4200")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping("/create")
    public PortfolioDtoRespons createPhoto(@RequestBody PortfolioDtoRequest request) {

        return portfolioService.createPhoto(request);
    }
}
