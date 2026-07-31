package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;

import java.util.List;
import java.util.Optional;

public interface PhotographerRepository extends JpaRepository<Photographer, Integer> {
    boolean existsByUser_IdUser(Integer idUser);
    boolean existsByUser(User user);
    Optional<Photographer> findByUser(User user);
    List<Photographer> findByVisibleTrue();
    @Query("""
SELECT DISTINCT p
FROM Photographer p
LEFT JOIN p.specialites s
WHERE p.visible = true
AND (:keyword IS NULL OR :keyword='' OR
LOWER(p.user.nom) LIKE LOWER(CONCAT('%',:keyword,'%')))
AND (:ville IS NULL OR :ville='' OR
LOWER(p.ville)=LOWER(:ville))
AND (:specialite IS NULL OR s = :specialite)
""")
    List<Photographer> search(
            @Param("keyword") String keyword,
            @Param("ville") String ville,
            @Param("specialite") String specialite
    );
}
