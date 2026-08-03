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

import java.time.LocalDate;
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
            if (!Boolean.TRUE.equals(photographer.getVisible())) {
                throw new RuntimeException("Ce photographe n'est pas disponible sur la plateforme");
            }
            if(request.getMessage() == null || request.getMessage().trim().isEmpty()){
                throw new RuntimeException("Veuillez écrire un message pour votre réservation");
            }
            if(request.getDate()== null){throw new RuntimeException("Veuillez choisir une date");}

            if(request.getHeureDebut()==null){
                throw new RuntimeException("veuillez choisir une heure de debut ");
            }
            if(request.getDate().isBefore(LocalDate.now())){
                throw new RuntimeException("Impossible de réserver une date passée");
            }
            if(request.getHeureFin()==null){
                throw new RuntimeException("veuillez choisire une heure de fin");
            }

            if(client.getRole() != Role.CLIENT){
                throw new RuntimeException("Seul un client peut réserver");
            }

            if(request.getHeureFin().isBefore(request.getHeureDebut())||request.getHeureFin().equals(request.getHeureDebut())){
                throw new RuntimeException("l heur de fin dit etre apres l heure de debut");
            }
            LocalDateTime maintenant = LocalDateTime.now();

            LocalDateTime debutReservation =
                    LocalDateTime.of(
                            request.getDate(),
                            request.getHeureDebut()
                    );


            if(debutReservation.isBefore(maintenant)){
                throw new RuntimeException("Impossible de réserver une heure déjà passée");
            }
            boolean occupe = reservationRepository
                    .existsByPhotographerIdAndDateAndHeureDebutLessThanAndHeureFinGreaterThan(
                            photographer.getId(),
                            request.getDate(),
                            request.getHeureFin(),
                            request.getHeureDebut()
                    );

            if(occupe){
                throw new RuntimeException("Ce créneau est déjà réservé");
            }

            Reservation reservation = new Reservation();

            reservation.setClient(client);
            reservation.setPhotographer(photographer);
            reservation.setMessage(request.getMessage());
            reservation.setDateReservation(LocalDateTime.now());
            reservation.setDate(request.getDate());
            reservation.setHeureDebut(request.getHeureDebut());
            reservation.setHeureFin(request.getHeureFin());
            reservation.setStatut(ReservationStatus.PENDING);

            reservationRepository.save(reservation);
        System.out.println("DATE = " + request.getDate());
        System.out.println("DEBUT = " + request.getHeureDebut());
        System.out.println("FIN = " + request.getHeureFin());
        System.out.println("CLIENT = " + request.getClientId());
        System.out.println("PHOTO = " + request.getPhotographerId());
            ReservationDtoResponse response = new ReservationDtoResponse();
            response.setId(reservation.getId());
            response.setMessage("Réservation créée avec succès");
            response.setStatut(reservation.getStatut().name());

            return response;
    }
}
