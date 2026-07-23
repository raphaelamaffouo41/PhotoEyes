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
import raphel.test.sa_backend.model.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void creerUser(UserRequestDto userRequestDto){
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
        userRepository.save(user);

        RegisterDtoRespons registerDtoRespons = new RegisterDtoRespons();
        registerDtoRespons.setId(user.getIdUser());
        registerDtoRespons.setNom(user.getNom());
        registerDtoRespons.setEmail(user.getEmail());

        return  registerDtoRespons;
    }
    public LoginDtoRespons loginDtoRespons(@RequestBody LoginDtoRequest loginDtoRequest){
        User user = userRepository.findByEmail(loginDtoRequest.getEmail()).orElseThrow( () -> new RuntimeException("utilisateur introuvable"));

        if(!passwordEncoder.matches(loginDtoRequest.getMotDePasse(), user.getMotDePasse()))
        {
            throw new RuntimeException(
                    "mot de passe incorrect");
        }

        LoginDtoRespons loginDtoRespons = new LoginDtoRespons();

        loginDtoRespons.setMessage("connexion reussie ");

        loginDtoRespons.setNom(user.getNom());

        loginDtoRespons.setEmail(user.getEmail());

        loginDtoRespons.setRole(user.getRole());

        return  loginDtoRespons;
    }

}

