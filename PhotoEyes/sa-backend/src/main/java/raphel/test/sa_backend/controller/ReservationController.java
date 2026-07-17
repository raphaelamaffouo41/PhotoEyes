package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.ReservationDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.ReservationDtoResponse;
import raphel.test.sa_backend.service.ReservationService;

@RestController
@RequestMapping("/reservation")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/create")
    public ReservationDtoResponse createReservation(@RequestBody ReservationDtoRequest request) {
        return reservationService.createReservation(request);
    }
}
