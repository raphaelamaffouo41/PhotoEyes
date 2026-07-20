package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.NotificationDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.NotificationDtoResponse;
import raphel.test.sa_backend.service.NotificationService;

@RestController
@RequestMapping("/notification")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {
    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @PostMapping("/create")
    public NotificationDtoResponse createNotification(@RequestBody NotificationDtoRequest request){

        return notificationService.createNotification(request);
    }
}
