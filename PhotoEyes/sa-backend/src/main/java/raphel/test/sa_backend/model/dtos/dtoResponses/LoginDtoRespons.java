package raphel.test.sa_backend.model.dtos.dtoResponses;

import raphel.test.sa_backend.model.enums.Role;

public class LoginDtoRespons {
    private String token;

    private String nom;

    private String email;

    private Role role;

    public String getMessage() {
        return token;
    }

    public void setMessage(String token) {
        this.token = token ;
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
