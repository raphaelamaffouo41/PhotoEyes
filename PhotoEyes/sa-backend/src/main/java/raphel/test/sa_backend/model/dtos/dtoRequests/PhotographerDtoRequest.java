package raphel.test.sa_backend.model.dtos.dtoRequests;

public class PhotographerDtoRequest {
    private Integer userId;

    private String description;

    private String ville;

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
}
