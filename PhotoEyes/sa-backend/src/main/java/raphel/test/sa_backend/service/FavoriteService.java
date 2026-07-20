package raphel.test.sa_backend.service;

import raphel.test.sa_backend.model.dtos.dtoRequests.FavoriteDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.FavoriteDtoResponse;

public interface FavoriteService {
    FavoriteDtoResponse createFavorite(FavoriteDtoRequest request);
}
