package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Portfolio;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Integer> {
    List<Portfolio> findByPhotographerId(Integer photographerId);

}
