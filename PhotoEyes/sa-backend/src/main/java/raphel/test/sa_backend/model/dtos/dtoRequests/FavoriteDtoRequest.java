package raphel.test.sa_backend.model.dtos.dtoRequests;

public class FavoriteDtoRequest {

    private Integer clientId;

    private Integer photographerId;

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Integer getPhotographerId() {
        return photographerId;
    }

    public void setPhotographerId(Integer photographerId) {
        this.photographerId = photographerId;
    }
}
