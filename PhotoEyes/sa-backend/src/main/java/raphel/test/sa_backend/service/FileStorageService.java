package raphel.test.sa_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.model.entities.Photographer;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${upload.path}")
    private String uploadPath;

    public String saveProfileImage(MultipartFile file) {

        try {

            Path folder = Paths.get(uploadPath, "profiles");

            if (!Files.exists(folder)) {
                Files.createDirectories(folder);
            }

            String filename = UUID.randomUUID()
                    + "_"
                    + file.getOriginalFilename();

            Path destination = folder.resolve(filename);

            Files.copy(file.getInputStream(), destination);

            return "/uploads/profiles/" + filename;

        } catch (IOException e) {

            throw new RuntimeException("Erreur upload image");

        }

    }

}
