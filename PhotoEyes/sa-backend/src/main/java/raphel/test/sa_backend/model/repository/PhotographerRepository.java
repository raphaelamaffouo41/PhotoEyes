package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import raphel.test.sa_backend.model.entities.Photographer;

import java.util.List;

public interface PhotographerRepository extends JpaRepository<Photographer, Integer> {
    boolean existsByUser_IdUser(Integer idUser);
    @Query("""
SELECT p
FROM Photographer p
WHERE
(:keyword IS NULL OR :keyword='' OR
LOWER(p.user.nom) LIKE LOWER(CONCAT('%',:keyword,'%')))
AND
(:ville IS NULL OR :ville='' OR
LOWER(p.ville)=LOWER(:ville))
AND
(:specialite IS NULL OR :specialite='' OR
LOWER(p.specialite)=LOWER(:specialite))
""")
    List<Photographer> search(
            @Param("keyword") String keyword,
            @Param("ville") String ville,
            @Param("specialite") String specialite
    );
}
