package raphel.test.sa_backend.service;

import java.util.List;
import raphel.test.sa_backend.model.dtos.dtoResponses.AdminUserDtoResponse;

public interface AdminService {
    List<AdminUserDtoResponse> getPendingPhotographers();
    AdminUserDtoResponse validatePhotographer(Integer userId);
    AdminUserDtoResponse rejectPhotographer(Integer userId);
    AdminUserDtoResponse suspendUser(Integer userId);
    AdminUserDtoResponse activateUser(Integer userId);
}
