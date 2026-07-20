package raphel.test.sa_backend.service;


import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.NotificationDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.NotificationDtoResponse;
import raphel.test.sa_backend.model.entities.Notification;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.repository.NotificationRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository){
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public NotificationDtoResponse createNotification(NotificationDtoRequest request) {

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        Notification notification = new Notification();

        notification.setTitre(request.getTitre());
        notification.setMessage(request.getMessage());
        notification.setLu(false);
        notification.setDateCreation(LocalDateTime.now());
        notification.setUser(user);

        notificationRepository.save(notification);

        NotificationDtoResponse response = new NotificationDtoResponse();

        response.setId(notification.getId());
        response.setMessage("Notification créée");

        return response;
    }
}
