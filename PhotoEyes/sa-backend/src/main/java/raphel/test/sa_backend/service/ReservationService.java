package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.ReservationDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.ReservationDtoResponse;

public interface ReservationService {

    ReservationDtoResponse createReservation(ReservationDtoRequest request);
}
