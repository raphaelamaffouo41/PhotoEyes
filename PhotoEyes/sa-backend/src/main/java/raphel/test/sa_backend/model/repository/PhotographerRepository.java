package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Photographer;

public interface PhotographerRepository extends JpaRepository<Photographer, Integer> {
    boolean existsByUser_IdUser(Integer idUser);
}
