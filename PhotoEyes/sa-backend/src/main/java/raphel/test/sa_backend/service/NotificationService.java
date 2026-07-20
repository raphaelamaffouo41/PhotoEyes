package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.NotificationDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.NotificationDtoResponse;

public interface NotificationService {
    NotificationDtoResponse createNotification(NotificationDtoRequest request);
}
