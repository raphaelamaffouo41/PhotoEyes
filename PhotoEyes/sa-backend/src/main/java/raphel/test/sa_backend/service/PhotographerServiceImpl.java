package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerProfileRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.SearchDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDashboardResponse;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PhotographerServiceImpl implements PhotographerService {

        private final PhotographerRepository photographerRepository;
        private final FileStorageService fileStorageService;
        private final PortfolioService portfolioService;

    public PhotographerServiceImpl(PhotographerRepository photographerRepository, FileStorageService fileStorageService,PortfolioService portfolioService) {
            this.photographerRepository = photographerRepository;
            this.fileStorageService = fileStorageService;
            this.portfolioService = portfolioService;

        }

        @Override
        public PhotographerDtoResponse createProfile ( PhotographerDtoRequest request){

            /* Legacy public creation flow disabled: profiles are created by AdminService only.

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

            photographer.setSpecialite(request.getSpecialite());

            photographer.setNoteMoyenne(0.0);

            photographerRepository.save(photographer);

            PhotographerDtoResponse response = new PhotographerDtoResponse();

            response.setId(photographer.getId());

            response.setNom(user.getNom());

            response.setPrenom(user.getPrenom());

            response.setVille(photographer.getVille());

            response.setMessage("Profil photographe créé");

            response.setCertifie(photographer.getCertifie());

            response.setSpecialite(request.getSpecialite());

            response.setDescription(request.getDescription());

            response.setNoteMoyenne(photographer.getNoteMoyenne());

            return response; */

            throw new IllegalStateException("Le profil photographe est créé uniquement lors de la validation par un administrateur");
        }

    @Override
    public List<PhotographerDtoResponse> getAll() {
        return photographerRepository
                .findByVisibleTrue()
                .stream()
                .map(this::convertToDto)
                .toList();
    }

    @Override
    public PhotographerDtoResponse getById(Integer id) {

        Photographer photographer = photographerRepository.findById(id).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        if (!Boolean.TRUE.equals(photographer.getVisible())) {
            throw new RuntimeException("Photographe introuvable");
        }

        if (!Boolean.TRUE.equals(photographer.getVisible())) {
            throw new RuntimeException("Photographe introuvable");
        }

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

        response.setSpecialites(photographer.getSpecialites());

        response.setPrixPortrait(photographer.getPrixPortrait());

        response.setPrixDemiJournee(photographer.getPrixDemiJournee());

        response.setPrixJournee(photographer.getPrixJournee());

        response.setImageUrl(photographer.getImageUrl());

        response.setPhotoCouverture(photographer.getPhotoCouverture());

        response.setCertifie(photographer.getCertifie());

        response.setNoteMoyenne(photographer.getNoteMoyenne());

        response.setBio(photographer.getBio());

        response.setProfilComplet(photographer.getProfilComplet());

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

    @Override
    public List<PhotographerDtoResponse> search(SearchDtoRequest request) {
        List<Photographer> photographers =
                photographerRepository.search(
                        request.getKeyword(),
                        request.getVille(),
                        request.getSpecialite()
                );

        List<PhotographerDtoResponse> responses = new ArrayList<>();

        for (Photographer photographer : photographers) {

            PhotographerDtoResponse response = convertToDto(photographer);

            responses.add(response);
        }
        return responses;
    }

    @Override
    public PhotographerDtoResponse completeProfile(Integer photographerId, PhotographerProfileRequest request) {

        Photographer photographer = photographerRepository.findById(photographerId).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        photographer.setDescription(request.getDescription());

        photographer.setBio(request.getBio());

        photographer.setVille(request.getVille());

        photographer.setImageUrl(request.getImageUrl());

        photographer.setPhotoCouverture(request.getPhotoCouverture());

        photographer.setPrixPortrait(request.getPrixPortrait());

        photographer.setPrixDemiJournee(request.getPrixDemiJournee());

        photographer.setPrixJournee(request.getPrixJournee());

        photographer.setSpecialites(request.getSpecialites());

        boolean complet =
                request.getDescription()!=null &&
                        !request.getDescription().isBlank()

                        &&

                        request.getBio()!=null &&
                        !request.getBio().isBlank()

                        &&

                        request.getVille()!=null &&
                        !request.getVille().isBlank()

                        &&

                        request.getImageUrl()!=null &&
                        !request.getImageUrl().isBlank()

                        &&

                        request.getPhotoCouverture()!=null &&
                        !request.getPhotoCouverture().isBlank()

                        &&

                        request.getSpecialites()!=null &&
                        !request.getSpecialites().isEmpty()

                        &&

                        request.getPrixPortrait()!=null

                        &&

                        request.getPrixDemiJournee()!=null

                        &&

                        request.getPrixJournee()!=null;

        photographer.setProfilComplet(complet);

        photographerRepository.save(photographer);

        return convertToDto(photographer);

    }

    @Override
    public PhotographerDashboardResponse getDashboard(Integer photographerId) {
        Photographer photographer = photographerRepository.findById(photographerId).orElseThrow(() -> new RuntimeException("Photographe introuvable"));
        PhotographerDashboardResponse dto = new PhotographerDashboardResponse();

        dto.setId(photographer.getId());

        dto.setNom(photographer.getUser().getNom());

        dto.setPrenom(photographer.getUser().getPrenom());

        dto.setVille(photographer.getVille());

        dto.setDescription(photographer.getDescription());

        dto.setBio(photographer.getBio());

        dto.setImageUrl(photographer.getImageUrl());

        dto.setPhotoCouverture(photographer.getPhotoCouverture());

        dto.setPrixPortrait(photographer.getPrixPortrait());

        dto.setPrixDemiJournee(photographer.getPrixDemiJournee());

        dto.setPrixJournee(photographer.getPrixJournee());

        dto.setProfilComplet(photographer.getProfilComplet());

        dto.setSpecialites(photographer.getSpecialites());

        dto.setPortfolio(portfolioService.getPortfolio(photographerId));

        return dto;

    }

}
