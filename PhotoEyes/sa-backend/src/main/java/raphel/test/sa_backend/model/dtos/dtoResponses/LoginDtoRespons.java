package raphel.test.sa_backend.model.dtos.dtoResponses;

import raphel.test.sa_backend.model.enums.Role;
import raphel.test.sa_backend.model.enums.AccountStatut;

public class LoginDtoRespons {
    private String token;

    private String nom;

    private String email;

    private Role role;

    private String message;
    private Integer userId;
    private Integer photographerId;
    private AccountStatut accountStatut;
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public Integer getPhotographerId() { return photographerId; }
    public void setPhotographerId(Integer photographerId) { this.photographerId = photographerId; }
    public AccountStatut getAccountStatut() { return accountStatut; }
    public void setAccountStatut(AccountStatut accountStatut) { this.accountStatut = accountStatut; }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
