package raphel.test.sa_backend.model.dtos.dtoResponses;

import raphel.test.sa_backend.model.enums.AccountStatut;

public class AdminUserDtoResponse {
    private Integer userId;
    private Integer photographerId;
    private String nom;
    private String prenom;
    private String email;
    private AccountStatut accountStatut;
    private String message;

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public Integer getPhotographerId() { return photographerId; }
    public void setPhotographerId(Integer photographerId) { this.photographerId = photographerId; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public AccountStatut getAccountStatut() { return accountStatut; }
    public void setAccountStatut(AccountStatut accountStatut) { this.accountStatut = accountStatut; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
