package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Availability;
import raphel.test.sa_backend.model.enums.AvailabilityStatus;

public interface    AvailabilityRepository  extends JpaRepository<Availability,Integer> {
    boolean existsByIdAndStatut(Integer id, AvailabilityStatus statut);
}