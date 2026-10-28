package raphel.test.sa_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import raphel.test.sa_backend.model.dtos.dtoRequests.LoginDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.RegisterDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.UserRequestDto;
import raphel.test.sa_backend.model.dtos.dtoResponses.LoginDtoRespons;
import raphel.test.sa_backend.model.dtos.dtoResponses.RegisterDtoRespons;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.AccountStatut;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.enums.AuthProvider;
import raphel.test.sa_backend.model.repository.UserRepository;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.entities.Photographer;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private UserRepository userRepository;
    private final PhotographerRepository photographerRepository;

    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder, JwtService jwtService, PhotographerRepository photographerRepository ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.photographerRepository = photographerRepository;
    }
    @Override
    public void creerUser(UserRequestDto userRequestDto){

        if(userRepository.existsByEmail(userRequestDto.getEmail())){
            throw new RuntimeException("Cette adresse email est déjà utilisée.");
        }

        User user = new User();
        user.setNom(userRequestDto.getNom());
        user.setPrenom(userRequestDto.getPrenom());
        user.setEmail(userRequestDto.getEmail());
        user.setNumeroTelephone(userRequestDto.getNumeroTelephone());
        user.setMotDePasse(userRequestDto.getMotDePasse());
        user.setRole(userRequestDto.getRole());
        user.setAccountStatut(userRequestDto.getAccountStatut());

        userRepository.save(user);

    }
    public RegisterDtoRespons registerDtoRespons(RegisterDtoRequest registerDtoRequest){

        if(userRepository.existsByEmail(registerDtoRequest.getEmail())){
            throw new RuntimeException("Cette adresse email est déjà utilisée.");
        }


        User user = new User();
        System.out.println("ROLE RECU = " + registerDtoRequest.getRole());
        if(registerDtoRequest.getRole() == Role.ADMIN){
            throw new RuntimeException(
                    "Impossible de créer un administrateur");
        }

        if(registerDtoRequest.getRole() == Role.CLIENT){

            user.setRole(Role.CLIENT);
            user.setAccountStatut(AccountStatut.ACTIVE);
        }

        if(registerDtoRequest.getRole() == Role.PHOTOGRAPHE) {

            user.setRole(Role.PHOTOGRAPHE);
            user.setAccountStatut(AccountStatut.PENDING_VALIDATION);
        }

        user.setNom(registerDtoRequest.getNom());
        user.setPrenom(registerDtoRequest.getPrenom());
        user.setEmail(registerDtoRequest.getEmail());
        user.setNumeroTelephone(registerDtoRequest.getNumeroTelephone());
        user.setMotDePasse(passwordEncoder.encode(registerDtoRequest.getMotdepasse()));
        user.setAuthProvider(registerDtoRequest.getAuthProvider() == null ? AuthProvider.LOCAL : registerDtoRequest.getAuthProvider());
        userRepository.save(user);
        if (user.getRole() == Role.PHOTOGRAPHE) {
            Photographer profile = new Photographer();
            profile.setUser(user);
            profile.setVisible(false);
            profile.setProfilComplet(false);
            profile.setDescription("");
            profile.setVille("");
            profile.setSpecialites(new java.util.ArrayList<>());
            profile.setNoteMoyenne(0.0);
            profile.setCertifie(false);
            photographerRepository.save(profile);
        }

        RegisterDtoRespons registerDtoRespons = new RegisterDtoRespons();
        registerDtoRespons.setId(user.getIdUser());
        registerDtoRespons.setNom(user.getNom());
        registerDtoRespons.setEmail(user.getEmail());
        registerDtoRespons.setMessage("Compte créé avec succès.");

        return  registerDtoRespons;
    }
    public LoginDtoRespons loginDtoRespons(@RequestBody LoginDtoRequest loginDtoRequest){
        User user = userRepository.findByEmail(loginDtoRequest.getEmail()).orElseThrow( () -> new RuntimeException("utilisateur introuvable"));

        if(!passwordEncoder.matches(loginDtoRequest.getMotDePasse(), user.getMotDePasse()))
        {
            throw new RuntimeException(
                    "mot de passe incorrect");
        }

        if (user.getAccountStatut() == AccountStatut.SUSPENDED || user.getAccountStatut() == AccountStatut.DISABLED || user.getAccountStatut() == AccountStatut.REJECTED) {
            throw new RuntimeException("Ce compte n'est pas autorisé à se connecter");
        }

        LoginDtoRespons loginDtoRespons = new LoginDtoRespons();

        loginDtoRespons.setMessage("connexion reussie ");

        loginDtoRespons.setNom(user.getNom());

        loginDtoRespons.setEmail(user.getEmail());

        loginDtoRespons.setRole(user.getRole());
        loginDtoRespons.setUserId(user.getIdUser());
        if (user.getRole() == Role.PHOTOGRAPHE && user.getAccountStatut() == AccountStatut.PENDING_VALIDATION) {
            Photographer profile = photographerRepository.findByUser(user).orElseGet(() -> {
                Photographer pending = new Photographer();
                pending.setUser(user);
                pending.setVisible(false);
                pending.setProfilComplet(false);
                pending.setDescription("");
                pending.setVille("");
                pending.setSpecialites(new java.util.ArrayList<>());
                pending.setNoteMoyenne(0.0);
                pending.setCertifie(false);
                return photographerRepository.save(pending);
            });
            loginDtoRespons.setPhotographerId(profile.getId());
        } else {
            photographerRepository.findByUser(user).ifPresent(p -> loginDtoRespons.setPhotographerId(p.getId()));
        }
        loginDtoRespons.setAccountStatut(user.getAccountStatut());

        loginDtoRespons.setToken(jwtService.generateToken(user));

        return  loginDtoRespons;
    }

}

