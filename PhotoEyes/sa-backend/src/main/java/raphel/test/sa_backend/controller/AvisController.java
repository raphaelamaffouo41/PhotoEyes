package raphel.test.sa_backend.controller;

import org.springframework.web.bind.annotation.*;
import raphel.test.sa_backend.model.dtos.dtoRequests.AvisDtoRequest;
import raphel.test.sa_backend.model.dtos.dtoResponses.AvisDtoRespons;
import raphel.test.sa_backend.service.AvisService;

@RestController
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:4200")
public class AvisController {
    private final AvisService avisService;

    public AvisController(AvisService avisService) {
        this.avisService = avisService;
    }

    @PostMapping("/create")
    public AvisDtoRespons createAvis(
            @RequestBody AvisDtoRequest request
    ) {
        return avisService.createAvis(request);
    }


}
