package raphel.test.sa_backend.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.ReservationDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.ReservationDtoResponse;
import raphel.test.sa_backend.model.entities.Availability;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.Reservation;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.enums.AvailabilityStatus;
import raphel.test.sa_backend.model.enums.ReservationStatus;
import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.repository.AvailabilityRepository;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.ReservationRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final PhotographerRepository  photographerRepository;
    private final AvailabilityRepository availabilityRepository;

    public ReservationServiceImpl( ReservationRepository reservationRepository,
                                   UserRepository userRepository,
                                   PhotographerRepository photographerRepository,
                                   AvailabilityRepository availabilityRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.availabilityRepository = availabilityRepository;
    }

    @Transactional
    @Override
    public ReservationDtoResponse createReservation(ReservationDtoRequest request) {

            User client = userRepository.findById(request.getClientId()).orElseThrow(()-> new RuntimeException("Client introuvable"));
            Photographer photographer = photographerRepository.findById(request.getPhotographerId()).orElseThrow(()-> new RuntimeException("Photographer introuvable"));
            Availability availability = availabilityRepository.findById(request.getAvailabilityId()).orElseThrow(()-> new RuntimeException("disponibilite introuvable"));

            if( availability.getStatut()!= AvailabilityStatus.DISPONIBLE){

                throw new RuntimeException("Ce créneau n'est plus disponible");
            }

            if(client.getRole() != Role.CLIENT){
                throw new RuntimeException("Seul un client peut réserver");
            }

            Reservation reservation = new Reservation();

            reservation.setClient(client);
            reservation.setPhotographer(photographer);
            reservation.setAvailability(availability);
            reservation.setMessage(request.getMessage());
            reservation.setDateReservation(LocalDateTime.now());
            reservation.setStatut(ReservationStatus.PENDING);

            reservationRepository.save(reservation);

            availability.setStatut(AvailabilityStatus.RESERVE);

            availabilityRepository.save(availability);

            ReservationDtoResponse response = new ReservationDtoResponse();
            response.setId(reservation.getId());
            response.setMessage("Réservation créée avec succès");
            response.setStatut(reservation.getStatut().name());

            return response;
    }
}
