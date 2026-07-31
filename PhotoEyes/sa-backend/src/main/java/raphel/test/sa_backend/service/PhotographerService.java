package raphel.test.sa_backend.service;

import org.springframework.web.multipart.MultipartFile;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.PhotographerProfileRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.SearchDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDashboardResponse;
import raphel.test.sa_backend.model.dtos.dtoResponses.PhotographerDtoResponse;

import java.util.List;

public interface PhotographerService {
    PhotographerDtoResponse createProfile(PhotographerDtoRequest request);
    List<PhotographerDtoResponse> getAll();
    PhotographerDtoResponse getById(Integer id);
    PhotographerDtoResponse uploadProfileImage(Integer id, MultipartFile image);
    List<PhotographerDtoResponse> search(SearchDtoRequest request);
    PhotographerDtoResponse completeProfile(Integer photographerId, PhotographerProfileRequest request);
    PhotographerDashboardResponse getDashboard(Integer photographerId);
    void deleteProfile(Integer id);

}
