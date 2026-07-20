package raphel.test.sa_backend.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "favorite")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;

    @ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer photographer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}
