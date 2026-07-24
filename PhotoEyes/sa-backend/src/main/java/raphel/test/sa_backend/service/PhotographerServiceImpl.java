package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

import java.util.List;

@Service
public class PhotographerServiceImpl implements PhotographerService {

        private final PhotographerRepository photographerRepository;
        private final UserRepository userRepository;
        private final FileStorageService fileStorageService;

    public PhotographerServiceImpl(PhotographerRepository photographerRepository, UserRepository userRepository) {
            this.photographerRepository = photographerRepository;
            this.userRepository = userRepository;
            this.fileStorageService = new FileStorageService();
        }

        @Override
        public PhotographerDtoResponse createProfile ( PhotographerDtoRequest request){

            User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            if (photographerRepository.existsByUser_IdUser(user.getIdUser())) {throw new RuntimeException("Ce profil existe déjà");}

            if (user.getRole() != Role.PHOTOGRAPHE) {

                throw new RuntimeException(
                        "Cet utilisateur n'est pas photographe");
            }

            Photographer photographer = new Photographer();

            photographer.setSpecialite(request.getSpecialite());

            photographer.setPrixDepart(0.0);

            photographer.setImageUrl(request.getImageUrl());

            photographer.setPhotoCouverture(request.getPhotoCouverture());

            photographer.setDescription(request.getDescription());

            photographer.setVille(request.getVille());

            photographer.setUser(user);

            photographer.setCertifie(false);

            photographer.setNoteMoyenne(0.0);

            photographerRepository.save(photographer);

            PhotographerDtoResponse response = new PhotographerDtoResponse();

            response.setId(photographer.getId());

            response.setNom(user.getNom());

            response.setPrenom(user.getPrenom());

            response.setVille(photographer.getVille());

            response.setMessage("Profil photographe créé");

            response.setCertifie(photographer.getCertifie());

            response.setDescription(request.getDescription());

            response.setNoteMoyenne(photographer.getNoteMoyenne());

            return response;
        }

    @Override
    public List<PhotographerDtoResponse> getAll() {
        List<Photographer> photographers = photographerRepository.findAll();

        return photographers.stream().map(photographer -> {

            PhotographerDtoResponse response = new PhotographerDtoResponse();

            response.setId(photographer.getId());

            response.setNom(photographer.getUser().getNom());

            response.setPrenom(photographer.getUser().getPrenom());

            response.setVille(photographer.getVille());

            response.setDescription(photographer.getDescription());

            response.setCertifie(photographer.getCertifie());

            response.setNoteMoyenne(photographer.getNoteMoyenne());

            response.setImageUrl(photographer.getImageUrl());

            response.setPhotoCouverture(photographer.getPhotoCouverture());

            response.setDescription(photographer.getDescription());

            response.setPrixDepart(photographer.getPrixDepart());

            return response;

        }).toList();
    }

    @Override
    public PhotographerDtoResponse getById(Integer id) {

        Photographer photographer = photographerRepository.findById(id).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        PhotographerDtoResponse response = new PhotographerDtoResponse();

        response.setId(photographer.getId());

        response.setNom(photographer.getUser().getNom());

        response.setPrenom(photographer.getUser().getPrenom());

        response.setVille(photographer.getVille());

        response.setDescription(photographer.getDescription());

        response.setCertifie(photographer.getCertifie());

        response.setNoteMoyenne(photographer.getNoteMoyenne());

        response.setImageUrl(photographer.getImageUrl());

        response.setPhotoCouverture(photographer.getPhotoCouverture());

        response.setPrixDepart(photographer.getPrixDepart());

        response.setDescription(photographer.getDescription());

        return response;
    }

    @Override
    public PhotographerDtoResponse updateProfile(Integer id, PhotographerDtoRequest request) {

        Photographer photographer = photographerRepository.findById(id).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        photographer.setDescription(request.getDescription());

        photographer.setVille(request.getVille());

        photographer.setSpecialite(request.getSpecialite());

        photographer.setPrixDepart(request.getPrixDepart());

        photographer.setImageUrl(request.getImageUrl());

        photographer.setDescription(request.getDescription());

        photographer.setPhotoCouverture(request.getPhotoCouverture());

        photographerRepository.save(photographer);

        return convertToDto(photographer);
    }

    @Override
    public void deleteProfile(Integer id) {
        Photographer photographer = photographerRepository.findById(id).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        photographerRepository.delete(photographer);

    }

    private PhotographerDtoResponse convertToDto(
            Photographer photographer){

        PhotographerDtoResponse response = new PhotographerDtoResponse();

        response.setId(photographer.getId());

        response.setNom(photographer.getUser().getNom());

        response.setPrenom(photographer.getUser().getPrenom());

        response.setVille(photographer.getVille());

        response.setDescription(photographer.getDescription());

        response.setSpecialite(photographer.getSpecialite());

        response.setPrixDepart(photographer.getPrixDepart());

        response.setImageUrl(photographer.getImageUrl());

        response.setPhotoCouverture(photographer.getPhotoCouverture());

        response.setCertifie(photographer.getCertifie());

        response.setNoteMoyenne(photographer.getNoteMoyenne());

        return response;

    }

    @Override
    public PhotographerDtoResponse uploadProfileImage(Integer id, MultipartFile image) {

        Photographer photographer = photographerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        String url = fileStorageService.saveProfileImage(image);

        photographer.setImageUrl(url);

        photographerRepository.save(photographer);

        PhotographerDtoResponse dto = new PhotographerDtoResponse();

        dto.setId(photographer.getId());
        dto.setImageUrl(url);

        return dto;
    }
}