package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.PortfolioDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PortfolioDtoRespons;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.Portfolio;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.PortfolioRepository;

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

        return response;
    }
}
