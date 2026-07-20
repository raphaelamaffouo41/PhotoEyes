package raphel.test.sa_backend.model.dtos.dtoRequests;

public class NotificationDtoRequest {

    private Integer userId;

    private String titre;

    private String message;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
