package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.FavoriteDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvisDtoRespons;
import raphel.test.sa_backend.model.dtos.dtoResponses.FavoriteDtoResponse;
import raphel.test.sa_backend.service.FavoriteService;

@RestController
@RequestMapping("/favoriter")
@CrossOrigin(origins = "http://localhost:4200")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/create")
    public FavoriteDtoResponse createFavorite(@RequestBody FavoriteDtoRequest request){

        return favoriteService.createFavorite(request);
    }
}
