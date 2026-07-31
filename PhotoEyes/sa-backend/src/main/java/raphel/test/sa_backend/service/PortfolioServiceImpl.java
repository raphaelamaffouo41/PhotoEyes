package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.Portfolio;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.PortfolioRepository;

import java.util.List;

@Service
public class PortfolioServiceImpl implements PortfolioService{

    private final PortfolioRepository portfolioRepository;
    private final PhotographerRepository photographerRepository;

    public PortfolioServiceImpl(PortfolioRepository portfolioRepository, PhotographerRepository photographerRepository){
        this.portfolioRepository = portfolioRepository;
        this.photographerRepository = photographerRepository;
    }

    @Override
    public PortfolioDtoRespons createPhoto(PortfolioDtoRequest request) {

        Photographer photographer = photographerRepository.findById(request.getPhotographerId()).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        Portfolio photo = new Portfolio();

        photo.setImageUrl(request.getImageUrl());
        photo.setTitre(request.getTitre());
        photo.setDescription(request.getDescription());
        photo.setPhotographer(photographer);

        portfolioRepository.save(photo);

        PortfolioDtoRespons response = new PortfolioDtoRespons ();

        response.setId(photo.getId());
        response.setMessage("Photo ajoutée au portfolio");
        response.setImageUrl(photo.getImageUrl());
        response.setTitre(photo.getTitre());
        response.setDescription(photo.getDescription());

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

                    dto.setTitre(photo.getTitre());

                    dto.setDescription(photo.getDescription());

                    return dto;

                }).toList();
    }

    @Override
    public void deletePhoto(Integer id) {
        Portfolio photo = portfolioRepository.findById(id).orElseThrow(() -> new RuntimeException("Photo introuvable"));
        portfolioRepository.delete(photo);
    }
}
