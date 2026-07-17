package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.AvailabilityDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvailabilityDtoRespons;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.model.entities.Availability;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.enums.AvailabilityStatus;
import raphel.test.sa_backend.model.repository.AvailabilityRepository;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

import java.time.LocalDate;

@Service
public class AvailabilityServiceImpl implements AvailabilityService {

    private final AvailabilityRepository availabilityRepository;
    private final PhotographerRepository photographerRepository;
    public AvailabilityServiceImpl(AvailabilityRepository availabilityRepository, PhotographerRepository photographerRepository) {
        this.photographerRepository = photographerRepository;
        this.availabilityRepository = availabilityRepository;
    }

    @Override
    public AvailabilityDtoRespons createAvailability(AvailabilityDtoRequest request) {

        Photographer photographer = photographerRepository.findById(request.getPhotographerId()).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        if(!request.getHeureFin().isAfter(request.getHeureDebut())){
            throw new RuntimeException("Heure invalide");
        }

        if(request.getDate().isBefore(LocalDate.now())){
            throw new RuntimeException("Date déjà passée");
        }

        Availability availability = new Availability();

        availability.setDate(request.getDate());

        availability.setHeureDebut(request.getHeureDebut());

        availability.setHeureFin(request.getHeureFin());

        availability.setStatut(AvailabilityStatus.DISPONIBLE);

        availability.setPhotographer(photographer);

        availabilityRepository.save(availability);

        AvailabilityDtoRespons response = new AvailabilityDtoRespons();

        response.setId(availability.getId());

        response.setMessage("disponible");

        return response;
    }
}
