package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import raphel.test.sa_backend.model.entities.Avis;
import raphel.test.sa_backend.model.entities.Reservation;

public interface AvisRepository extends JpaRepository< Avis, Integer> {

    @Query("SELECT AVG(r.note) FROM Avis r WHERE r.photographer.id = :photographerId")
    Double calculateAverage(Integer photographerId);
}