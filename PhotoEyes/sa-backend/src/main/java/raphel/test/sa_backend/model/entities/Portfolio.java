package raphel.test.sa_backend.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "gallery_photo")
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String imageUrl;

    private String titre;

    private String description;

    @ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer photographer;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Photographer getPhotographer() {
        return photographer;
    }

    public void setPhotographer(Photographer photographer) {
        this.photographer = photographer;
    }
}
