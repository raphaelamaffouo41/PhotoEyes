package raphel.test.sa_backend.model.dtos.dtoResponses;

import raphel.test.sa_backend.model.enums.Specialite;

import java.util.List;

public class PhotographerDtoResponse {
    private Integer id;
    private String nom;
    private String prenom;
    private String ville;
    private String description;
    private Double noteMoyenne;
    private Boolean certifie;
    private List<Specialite> specialites;
    private Double prixPortrait;
    private Double prixDemiJournee;
    private Double prixJournee;
    private String imageUrl;
    private String photoCouverture;
    private Boolean profilComplet;
    private String message;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getCertifie() {
        return certifie;
    }

    public void setCertifie(Boolean certifie) {
        this.certifie = certifie;
    }

    public Double getNoteMoyenne() {
        return noteMoyenne;
    }

    public void setNoteMoyenne(Double noteMoyenne) {
        this.noteMoyenne = noteMoyenne;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public List<Specialite> getSpecialites() {
        return specialites;
    }

    public void setSpecialites(List<Specialite> specialites) {
        this.specialites = specialites;
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

    public Boolean getProfilComplet() {
        return profilComplet;
    }

    public void setProfilComplet(Boolean profilComplet) {
        this.profilComplet = profilComplet;
    }
}
