package raphel.test.sa_backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.entities.User;

@Service
public class JwtService {

    private final SecretKey key;

    public JwtService(@Value("${security.jwt.secret}") String secret) {

        this.key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8));

    }

    public String generateToken(User user) {

        Date now = new Date();

        return Jwts.builder()

                .subject(user.getEmail())

                .claim("role", user.getRole().name())

                .claim("id", user.getIdUser())

                .issuedAt(now)

                .expiration(
                        new Date(now.getTime() + 86400000L)
                )

                .signWith(key)

                .compact();

    }

    public String extractEmail(String token) {

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .getSubject();

    }

    public String extractRole(String token){

        return Jwts.parser()

                .verifyWith(key)

                .build()

                .parseSignedClaims(token)

                .getPayload()

                .get("role", String.class);

    }

}
