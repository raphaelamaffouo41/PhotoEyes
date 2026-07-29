package raphel.test.sa_backend.model.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
@Entity

public class Photographer extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;

    private String ville;

    private Double noteMoyenne;

    private String specialite;

    private Double prixDepart;

    private String imageUrl;

    private String photoCouverture;

    private Boolean certifie;

    @Column(nullable = false)
    private Boolean visible = false;

    @Column(name = "date_validation")
    private LocalDateTime dateValidation;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Double getNoteMoyenne() {
        return noteMoyenne;
    }

    public void setNoteMoyenne(Double noteMoyenne) {
        this.noteMoyenne = noteMoyenne;
    }

    public Boolean getCertifie() {
        return certifie;
    }

    public void setCertifie(Boolean certifie) {
        this.certifie = certifie;
    }

    public Boolean getVisible() { return visible; }

    public void setVisible(Boolean visible) { this.visible = visible; }

    public LocalDateTime getDateValidation() { return dateValidation; }

    public void setDateValidation(LocalDateTime dateValidation) { this.dateValidation = dateValidation; }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }

    public Double getPrixDepart() {
        return prixDepart;
    }

    public void setPrixDepart(Double prixDepart) {
        this.prixDepart = prixDepart;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getPhotoCouverture() {
        return photoCouverture;
    }

    public void setPhotoCouverture(String photoCouverture) {
        this.photoCouverture = photoCouverture;
    }
}

