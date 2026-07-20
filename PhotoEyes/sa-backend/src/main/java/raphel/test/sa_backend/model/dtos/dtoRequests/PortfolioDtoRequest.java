package raphel.test.sa_backend.model.dtos.dtoRequests;

public class PortfolioDtoRequest {
    private Integer photographerId;

    private String imageUrl;

    private String titre;

    private String description;

    public Integer getPhotographerId() {
        return photographerId;
    }

    public void setPhotographerId(Integer photographerId) {
        this.photographerId = photographerId;
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
}
