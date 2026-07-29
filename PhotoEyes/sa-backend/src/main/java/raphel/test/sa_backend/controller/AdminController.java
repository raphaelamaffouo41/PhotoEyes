package raphel.test.sa_backend.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import raphel.test.sa_backend.model.dtos.dtoResponses.AdminUserDtoResponse;
import raphel.test.sa_backend.service.AdminService;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService admin;
    public AdminController(AdminService admin) { this.admin = admin; }
    @GetMapping("/photographers/pending") public List<AdminUserDtoResponse> pending() { return admin.getPendingPhotographers(); }
    @PutMapping("/photographers/{id}/validate") public AdminUserDtoResponse validate(@PathVariable Integer id) { return admin.validatePhotographer(id); }
    @PutMapping("/photographers/{id}/reject") public AdminUserDtoResponse reject(@PathVariable Integer id) { return admin.rejectPhotographer(id); }
    @PutMapping("/users/{id}/suspend") public AdminUserDtoResponse suspend(@PathVariable Integer id) { return admin.suspendUser(id); }
    @PutMapping("/users/{id}/activate") public AdminUserDtoResponse activate(@PathVariable Integer id) { return admin.activateUser(id); }
}
