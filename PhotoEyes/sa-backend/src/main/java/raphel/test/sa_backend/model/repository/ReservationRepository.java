package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

}
