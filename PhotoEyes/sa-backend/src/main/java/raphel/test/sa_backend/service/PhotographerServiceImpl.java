package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

@Service
public class PhotographerServiceImpl implements PhotographerService {

        private final PhotographerRepository photographerRepository;
        private final UserRepository userRepository;

    public PhotographerServiceImpl(PhotographerRepository photographerRepository, UserRepository userRepository) {
            this.photographerRepository = photographerRepository;
            this.userRepository = userRepository;
        }

        @Override
        public PhotographerDtoResponse createProfile ( PhotographerDtoRequest request){

            User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            if (user.getRole() != Role.PHOTOGRAPHE) {

                throw new RuntimeException(
                        "Cet utilisateur n'est pas photographe");
            }

            Photographer photographer = new Photographer();

            photographer.setDescription(request.getDescription());

            photographer.setVille(request.getVille());

            photographer.setUser(user);

            photographerRepository.save(photographer);

            PhotographerDtoResponse response = new PhotographerDtoResponse();

            response.setId(photographer.getId());

            response.setNom(user.getNom());

            response.setPrenom(user.getPrenom());

            response.setVille(photographer.getVille());

            response.setMessage("Profil photographe créé");

            System.out.println("USER ID RECU = " + request.getUserId());
            System.out.println("USER ID RECU = " + request.getUserId());

            return response;
        }
    }

