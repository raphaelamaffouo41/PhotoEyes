package raphel.test.sa_backend.model.dtos.dtoRequests;

import java.time.LocalDate;
import java.time.LocalTime;

public class AvailabilityDtoRequest {

    private Integer photographerId;

    private LocalDate date;

    private LocalTime heureDebut;

    private LocalTime heureFin;

    public Integer getPhotographerId() {
        return photographerId;
    }

    public void setPhotographerId(Integer photographerId) {
        this.photographerId = photographerId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(LocalTime heureDebut) {
        this.heureDebut = heureDebut;
    }

    public LocalTime getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(LocalTime heureFin) {
        this.heureFin = heureFin;
    }
}
