package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.User;

import java.util.Optional;
import java.util.List;
import raphel.test.sa_backend.model.enums.AccountStatut;
import raphel.test.sa_backend.model.enums.Role;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRoleAndAccountStatut(Role role, AccountStatut accountStatut);

}


