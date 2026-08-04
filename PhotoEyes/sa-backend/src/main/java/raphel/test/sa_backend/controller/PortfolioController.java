package raphel.test.sa_backend.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;
import raphel.test.sa_backend.service.PortfolioService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/gallery")
@CrossOrigin(origins = "http://localhost:4200")
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping(value="/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public PortfolioDtoRespons createPhoto(
            @RequestParam("file") MultipartFile file,

            @RequestParam("photographerId") Integer photographerId

    )throws IOException {
        return portfolioService.createPhoto(file, photographerId);
    }
    @GetMapping("/photographer/{id}")
    public List<PortfolioDtoRespons> getPortfolio(@PathVariable Integer id){

        return portfolioService.getPortfolio(id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id){

        portfolioService.deletePhoto(id);

    }
}
