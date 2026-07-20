package raphel.test.sa_backend.model.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "avis")
public class Avis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer note;

    private String commentaire;

    private LocalDateTime dateAvis;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNote() {
        return note;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public LocalDateTime getDateAvis() {
        return dateAvis;
    }

    public void setDateAvis(LocalDateTime dateAvis) {
        this.dateAvis = dateAvis;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Photographer getPhotographer() {
        return photographer;
    }

    public void setPhotographer(Photographer photographer) {
        this.photographer = photographer;
    }

    @ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer photographer;
}
