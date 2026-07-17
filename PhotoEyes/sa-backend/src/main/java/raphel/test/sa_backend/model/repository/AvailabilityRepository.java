package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Availability;

public interface    AvailabilityRepository  extends JpaRepository<Availability,Integer> {
}