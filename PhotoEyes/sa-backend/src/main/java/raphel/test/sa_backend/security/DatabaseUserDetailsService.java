package raphel.test.sa_backend.security;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.repository.UserRepository;

@Service
public class DatabaseUserDetailsService implements UserDetailsService {
    private final UserRepository users;
    public DatabaseUserDetailsService(UserRepository users) { this.users = users; }
    @Override public UserDetails loadUserByUsername(String email) {
        User user = users.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getMotDePasse(), AuthorityUtils.createAuthorityList("ROLE_" + user.getRole().name()));
    }
}
