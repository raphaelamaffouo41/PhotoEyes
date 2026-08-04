package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.Portfolio;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.PortfolioRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PortfolioServiceImpl implements PortfolioService{

    private final PortfolioRepository portfolioRepository;
    private final PhotographerRepository photographerRepository;
    private final String uploadDir="uploads/portfolio/";

    public PortfolioServiceImpl(PortfolioRepository portfolioRepository, PhotographerRepository photographerRepository){
        this.portfolioRepository = portfolioRepository;
        this.photographerRepository = photographerRepository;
    }

    @Override
    public PortfolioDtoRespons createPhoto(MultipartFile file, Integer photographerId)throws IOException {

        Photographer photographer = photographerRepository.findById(photographerId).orElseThrow();
        String fileName = System.currentTimeMillis() +"_"+file.getOriginalFilename();
        Path path = Paths.get(uploadDir+fileName);
        Files.createDirectories(path.getParent());
        Files.write(
                path,
                file.getBytes()
        );

        Portfolio photo = new Portfolio();
        photo.setImageUrl(
                "/uploads/portfolio/"+fileName
        );

        photo.setPhotographer(photographer);

        portfolioRepository.save(photo);

        PortfolioDtoRespons response = new PortfolioDtoRespons();

        response.setId(photo.getId());

        response.setImageUrl(photo.getImageUrl());

        response.setMessage("Photo ajoutée");

        return response;


    }

    @Override
    public List<PortfolioDtoRespons> getPortfolio(Integer photographerId) {
        return portfolioRepository
                .findByPhotographerId(photographerId)
                .stream()
                .map(photo -> {

                    PortfolioDtoRespons dto = new PortfolioDtoRespons();

                    dto.setId(photo.getId());

                    dto.setImageUrl(photo.getImageUrl());

                    return dto;

                }).toList();
    }

    @Override
    public void deletePhoto(Integer id) {
        Portfolio photo = portfolioRepository.findById(id).orElseThrow(() -> new RuntimeException("Photo introuvable"));
        portfolioRepository.delete(photo);
    }
}
