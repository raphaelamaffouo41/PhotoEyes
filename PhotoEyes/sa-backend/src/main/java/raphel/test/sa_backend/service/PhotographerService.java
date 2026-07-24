package raphel.test.sa_backend.service;

import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;

import java.util.List;

public interface PhotographerService {
    PhotographerDtoResponse createProfile(PhotographerDtoRequest request);
    List<PhotographerDtoResponse> getAll();
    PhotographerDtoResponse getById(Integer id);
    PhotographerDtoResponse updateProfile(Integer id, PhotographerDtoRequest request);
    PhotographerDtoResponse uploadProfileImage(Integer id, MultipartFile image);

    void deleteProfile(Integer id);

}
