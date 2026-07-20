package raphel.test.sa_backend.service;

import org.springframework.stereotype.Service;
import raphel.test.sa_backend.model.dtos.dtoRequests.FavoriteDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.FavoriteDtoResponse;
import raphel.test.sa_backend.model.entities.Favorite;
import raphel.test.sa_backend.model.entities.Photographer;
import raphel.test.sa_backend.model.entities.User;
import raphel.test.sa_backend.model.repository.FavoriteRepository;
import raphel.test.sa_backend.model.repository.PhotographerRepository;
import raphel.test.sa_backend.model.repository.UserRepository;

@Service
public class FavoriteServiceImpl  implements FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final PhotographerRepository photographerRepository;

    public FavoriteServiceImpl(
            FavoriteRepository  favoriteRepository,
            UserRepository userRepository,
            PhotographerRepository photographerRepository) {

        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
    }

    @Override
    public FavoriteDtoResponse createFavorite(FavoriteDtoRequest request) {
        User client = userRepository.findById(request.getClientId()).orElseThrow(() -> new RuntimeException("Client introuvable"));

        Photographer photographer = photographerRepository.findById(request.getPhotographerId()).orElseThrow(() -> new RuntimeException("Photographe introuvable"));

        Favorite favorite = new Favorite();

        favorite.setClient(client);
        favorite.setPhotographer(photographer);

        favoriteRepository.save(favorite);

        FavoriteDtoResponse response =
                new FavoriteDtoResponse();

        response.setId(favorite.getId());
        response.setMessage("Favori ajouté");

        return response;
    }
}