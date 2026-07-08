package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.LoginDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.RegisterDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoRequests.UserRequestDto;
import raphel.test.sa_backend.model.dtos.dtoResponses.LoginDtoRespons;
import raphel.test.sa_backend.model.dtos.dtoResponses.RegisterDtoRespons;

public interface UserService {

    void creerUser(UserRequestDto userRequestDto);

    RegisterDtoRespons registerDtoRespons(RegisterDtoRequest registerDtoRequest);

    LoginDtoRespons loginDtoRespons(LoginDtoRequest loginDtoRequest);
}