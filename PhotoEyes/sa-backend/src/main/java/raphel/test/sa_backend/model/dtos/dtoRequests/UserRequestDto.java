package raphel.test.sa_backend.model.dtos.dtoRequests;

import raphel.test.sa_backend.model.enums.AccountStatut;
import raphel.test.sa_backend.model.enums.AuthProvider;
import raphel.test.sa_backend.model.enums.Role;

public class UserRequestDto {
    private String nom;
    private String prenom;
    private String numeroTelephone;
    private String email;
    private String motDePasse;
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

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
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
