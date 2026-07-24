package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;
import raphel.test.sa_backend.service.FileStorageService;
import raphel.test.sa_backend.service.PhotographerService;

@RestController
@RequestMapping("/upload")
public class FileUploadController {

    private final FileStorageService fileStorageService;
    private final PhotographerService photographerService;

    public FileUploadController(
            FileStorageService fileStorageService,
            PhotographerService photographerService) {

        this.fileStorageService = fileStorageService;
        this.photographerService = photographerService;
    }

    @PostMapping("/profile")
    public String uploadProfile(
            @RequestParam("image") MultipartFile image) {

        return fileStorageService.saveProfileImage(image);
    }

    @PutMapping("/{id}/image")
    public PhotographerDtoResponse uploadImage(
            @PathVariable Integer id,
            @RequestParam("image") MultipartFile image) {

        return photographerService.uploadProfileImage(id, image);
    }
}
