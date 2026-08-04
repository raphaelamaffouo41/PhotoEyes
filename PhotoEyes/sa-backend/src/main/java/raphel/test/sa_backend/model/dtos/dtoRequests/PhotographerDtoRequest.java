package raphel.test.sa_backend.model.dtos.dtoRequests;

import raphel.test.sa_backend.model.enums.Specialite;

import java.util.List;

public class PhotographerDtoRequest {
    private Integer userId;

    private String description;

    private String ville;

    private Double noteMoyenne;

    private Boolean certifie;

    private List<Specialite> specialites;

    private Double prixPortrait;
    private Double prixDemiJournee;
    private Double prixJournee;

    private String imageUrl;

    private String photoCouverture;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public List<Specialite> getSpecialites() {
        return specialites;
    }

    public void setSpecialites(List<Specialite> specialites) {
        this.specialites = specialites;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    private Boolean profilComplet;

    public String getPhotoCouverture() {
        return photoCouverture;
    }

    public void setPhotoCouverture(String photoCouverture) {
        this.photoCouverture = photoCouverture;
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
