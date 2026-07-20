package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Favorite;
import raphel.test.sa_backend.model.entities.Photographer;

public interface FavoriteRepository extends JpaRepository<Favorite , Integer> {
}
