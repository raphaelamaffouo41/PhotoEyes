package raphel.test.sa_backend.model.entities;

import jakarta.persistence.*;
import raphel.test.sa_backend.model.enums.Specialite;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity

public class Photographer extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String description;

    private String ville;

    private Double noteMoyenne;

    private Double prixPortrait;

    private Double prixDemiJournee;

    private Double prixJournee;

    private String imageUrl;

    private String photoCouverture;

    private Boolean certifie;

    @Column(nullable = false)
    private Boolean visible = false;

    @Column(name = "date_validation")
    private LocalDateTime dateValidation;

    private Boolean profilComplet = false;

    private Boolean telephoneVerifie = false;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "photographer", cascade = CascadeType.ALL)
    private List<Portfolio> portfolio = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)

    @Enumerated(EnumType.STRING)

    @CollectionTable(name="photographer_specialites", joinColumns=@JoinColumn(name="photographer_id"))

    @Column(name="specialite")

    private List<Specialite> specialites;

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

    public Boolean getProfilComplet() {
        return profilComplet;
    }

    public void setProfilComplet(Boolean profilComplet) {
        this.profilComplet = profilComplet;
    }

    public Boolean getTelephoneVerifie() {
        return telephoneVerifie;
    }

    public void setTelephoneVerifie(Boolean telephoneVerifie) {
        this.telephoneVerifie = telephoneVerifie;
    }

    public Double getPrixPortrait() {
        return prixPortrait;
    }

    public void setPrixPortrait(Double prixPortrait) {
        this.prixPortrait = prixPortrait;
    }

    public Double getPrixDemiJournee() {
        return prixDemiJournee;
    }

    public void setPrixDemiJournee(Double prixDemiJournee) {
        this.prixDemiJournee = prixDemiJournee;
    }

    public Double getPrixJournee() {
        return prixJournee;
    }

    public void setPrixJournee(Double prixJournee) {
        this.prixJournee = prixJournee;
    }

    public List<Portfolio> getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(List<Portfolio> portfolio) {
        this.portfolio = portfolio;
    }

    public List<Specialite> getSpecialites() {
        return specialites;
    }

    public void setSpecialites(List<Specialite> specialites) {
        this.specialites = specialites;
    }
}

