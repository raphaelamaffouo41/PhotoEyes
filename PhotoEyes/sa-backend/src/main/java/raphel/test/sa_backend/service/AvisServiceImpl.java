package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.AvisDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvisDtoRespons;
import raphel.test.sa_backend.model.entities.Avis;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.AvisRepository;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

@Service
public class AvisServiceImpl implements AvisService {
    private final AvisRepository avisRepository;
    private final UserRepository userRepository;
    private final PhotographerRepository photographerRepository;

    public AvisServiceImpl( AvisRepository avisRepository, UserRepository userRepository, PhotographerRepository photographerRepository) {
        this.avisRepository = avisRepository;
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
    }

    @Override
    public AvisDtoRespons createAvis(AvisDtoRequest request) {
        User client = userRepository.findById(request.getClientId()).orElseThrow(()-> new RuntimeException("Client introuvable"));
        Photographer photographer = photographerRepository.findById(request.getPhotographerId()).orElseThrow(()-> new RuntimeException("Photographer introuvable"));

        if(client.getRole() != Role.CLIENT){
            throw new RuntimeException("Seul un client peut laisser un avis");
        }
        if(request.getNote() < 1 || request.getNote() > 5){
            throw new RuntimeException("La note doit être comprise entre 1 et 5");
        }

        Avis avis = new Avis();

        avis.setClient(client);
        avis.setPhotographer(photographer);
        avis.setNote(request.getNote());
        avisRepository.save(avis);

        double moyenne = avisRepository.calculateAverage(photographer.getId());
        photographer.setNoteMoyenne(moyenne);
        photographerRepository.save(photographer);

        AvisDtoRespons response = new AvisDtoRespons();
        response.setId(avis.getId());
        response.setMessage("avis ajouter");

        return response;

    }
}
