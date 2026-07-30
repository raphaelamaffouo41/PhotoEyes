package raphel.test.sa_backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.AccountStatut;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public DataInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) {


        if(!userRepository.existsByEmail("admin@studiolink.com")){


            User admin = new User();


            admin.setNom("Admin");
            admin.setPrenom("StudioLink");
            admin.setEmail("admin@studiolink.com");

            admin.setMotDePasse(
                    passwordEncoder.encode("admin12345")
            );


            admin.setRole(Role.ADMIN);

            admin.setAccountStatut(AccountStatut.ACTIVE);


            userRepository.save(admin);


            System.out.println("==============================");
            System.out.println("ADMIN CREE");
            System.out.println("Email : admin@studiolink.com");
            System.out.println("Mot de passe : admin12345");
            System.out.println("==============================");

        }

    }
}