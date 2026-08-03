package raphel.test.sa_backend.model.repository;

import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Reservation;

import java.time.LocalDate;
import java.time.LocalTime;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    boolean existsByPhotographerIdAndDateAndHeureDebutLessThanAndHeureFinGreaterThan(
            Integer photographerId,
            LocalDate date,
            LocalTime heureFin,
            LocalTime heureDebut
    );
}
