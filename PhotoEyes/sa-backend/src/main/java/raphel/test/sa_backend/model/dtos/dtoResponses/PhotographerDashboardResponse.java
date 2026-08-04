package raphel.test.sa_backend.model.dtos.dtoResponses;

import raphel.test.sa_backend.model.enums.Specialite;

import java.util.List;

public class PhotographerDashboardResponse {
    private Integer id;
    private String nom;
    private String prenom;
    private String ville;
    private String description;
    private String imageUrl;
    private String photoCouverture;
    private Boolean profilComplet;
    private Double prixPortrait;
    private Double prixDemiJournee;
    private Double prixJournee;
    private List<Specialite> specialites;
    private List<PortfolioDtoRespons> portfolio;

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

    public Boolean getProfilComplet() {
        return profilComplet;
    }

    public void setProfilComplet(Boolean profilComplet) {
        this.profilComplet = profilComplet;
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

    public List<PortfolioDtoRespons> getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(List<PortfolioDtoRespons> portfolio) {
        this.portfolio = portfolio;
    }
}
