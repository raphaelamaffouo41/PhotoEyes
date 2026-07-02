package raphel.test.sa_backend.model.dtos.dtoRequests;

import raphel.test.sa_backend.model.enums.AccountStatut;
import raphel.test.sa_backend.model.enums.AuthProvider;
import raphel.test.sa_backend.model.enums.Role;

public class RegisterDtoRequest {
    private String nom;
    private String prenom;
    private String email;
    private String numeroTelephone;
    private  String motdepasse;
    private Role role;
    private AuthProvider authProvider;
    private AccountStatut accountStatut;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumeroTelephone() {
        return numeroTelephone;
    }

    public void setNumeroTelephone(String numeroTelephone) {
        this.numeroTelephone = numeroTelephone;
    }

    public String getMotdepasse() {
        return motdepasse;
    }

    public void setMotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public AuthProvider getAuthProvider() {
        return authProvider;
    }

    public void setAuthProvider(AuthProvider authProvider) {
        this.authProvider = authProvider;
    }

    public AccountStatut getAccountStatut() {
        return accountStatut;
    }

    public void setAccountStatut(AccountStatut accountStatut) {
        this.accountStatut = accountStatut;
    }
}
