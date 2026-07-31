package raphel.test.sa_backend.model.dtos.dtoRequests;

import raphel.test.sa_backend.model.enums.Specialite;

import java.util.List;

public class PhotographerProfileRequest {
    private String description;

    private String bio;

    private String ville;

    private List<Specialite> specialites;

    private Double prixPortrait;

    private Double prixDemiJournee;

    private Double prixJournee;

    private String imageUrl;

    private String photoCouverture;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
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

    public List<Specialite> getSpecialites() {
        return specialites;
    }

    public void setSpecialites(List<Specialite> specialites) {
        this.specialites = specialites;
    }


    public String getPhotoCouverture() {
        return photoCouverture;
    }

    public void setPhotoCouverture(String photoCouverture) {
        this.photoCouverture = photoCouverture;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
