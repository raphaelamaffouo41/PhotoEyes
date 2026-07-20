package raphel.test.sa_backend.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import raphel.test.sa_backend.model.entities.Notification;

public interface NotificationRepository  extends JpaRepository<Notification, Integer> {
}
