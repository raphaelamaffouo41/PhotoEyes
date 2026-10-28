package raphel.test.sa_backend.service;

import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoResponses.AdminUserDtoResponse;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.AccountStatut;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {
    private final UserRepository users;
    private final PhotographerRepository photographers;

    public AdminServiceImpl(UserRepository users, PhotographerRepository photographers) {
        this.users = users;
        this.photographers = photographers;
    }

    @Override
    @Transactional
    public List<AdminUserDtoResponse> getPendingPhotographers() {
        return users.findByRoleAndAccountStatut(Role.PHOTOGRAPHE, AccountStatut.PENDING_VALIDATION)
                .stream().map(user -> photographers.findByUser(user).orElse(null))
                .filter(p -> p != null && Boolean.TRUE.equals(p.getProfilComplet()))
                .map(p -> response(p.getUser(), p, "Dossier complet, en attente de validation")).toList();
    }

    @Override
    @Transactional
    public AdminUserDtoResponse validatePhotographer(Integer userId) {
        User user = photographerUser(userId);
        if (user.getAccountStatut() == AccountStatut.ACTIVE) throw new IllegalStateException("Ce photographe est déjà validé");
        if (user.getAccountStatut() != AccountStatut.PENDING_VALIDATION) throw new IllegalStateException("Seul un photographe en attente peut être validé");
        Photographer photographer = photographers.findByUser(user)
                .orElseThrow(() -> new IllegalStateException("Le dossier photographe est introuvable"));
        if (!Boolean.TRUE.equals(photographer.getProfilComplet())) throw new IllegalStateException("Le dossier photographe doit être complet avant validation");
        photographer.setVisible(true);
        photographer.setCertifie(true);
        photographer.setDateValidation(LocalDateTime.now());
        user.setAccountStatut(AccountStatut.ACTIVE);
        photographers.save(photographer);
        users.save(user);
        return response(user, photographer, "Photographe validé et profil créé");
    }

    @Override
    @Transactional
    public AdminUserDtoResponse rejectPhotographer(Integer userId) {
        User user = photographerUser(userId);
        if (user.getAccountStatut() != AccountStatut.PENDING_VALIDATION) throw new IllegalStateException("Seul un photographe en attente peut être refusé");
        user.setAccountStatut(AccountStatut.REJECTED);
        users.save(user);
        return response(user, null, "Demande photographe refusée");
    }

    @Override
    @Transactional
    public AdminUserDtoResponse suspendUser(Integer userId) {
        User user = user(userId);
        user.setAccountStatut(AccountStatut.SUSPENDED);
        Photographer photographer = photographers.findByUser(user).orElse(null);
        if (photographer != null) { photographer.setVisible(false); photographers.save(photographer); }
        users.save(user);
        return response(user, photographer, "Utilisateur suspendu");
    }

    @Override
    @Transactional
    public AdminUserDtoResponse activateUser(Integer userId) {
        User user = user(userId);
        Photographer photographer = photographers.findByUser(user).orElse(null);
        if (user.getRole() == Role.PHOTOGRAPHE && photographer == null) throw new IllegalStateException("Ce photographe doit être validé avant d'être activé");
        user.setAccountStatut(AccountStatut.ACTIVE);
        if (photographer != null) { photographer.setVisible(true); photographers.save(photographer); }
        users.save(user);
        return response(user, photographer, "Utilisateur activé");
    }

    private User user(Integer id) { return users.findById(id).orElseThrow(() -> new RuntimeException("Utilisateur introuvable")); }
    private User photographerUser(Integer id) {
        User user = user(id);
        if (user.getRole() != Role.PHOTOGRAPHE) throw new IllegalStateException("Cet utilisateur n'est pas un photographe");
        return user;
    }
    private AdminUserDtoResponse response(User user, Photographer photographer, String message) {
        AdminUserDtoResponse dto = new AdminUserDtoResponse();
        dto.setUserId(user.getIdUser());
        dto.setPhotographerId(photographer == null ? null : photographer.getId());
        dto.setNom(user.getNom()); dto.setPrenom(user.getPrenom()); dto.setEmail(user.getEmail());
        dto.setAccountStatut(user.getAccountStatut()); dto.setMessage(message);
        if (photographer != null) {
            dto.setVille(photographer.getVille());
            dto.setImageUrl(photographer.getImageUrl());
            dto.setSpecialites(photographer.getSpecialites());
            dto.setNombrePhotos(photographer.getPortfolio() == null ? 0 : photographer.getPortfolio().size());
        }
        return dto;
    }
}
