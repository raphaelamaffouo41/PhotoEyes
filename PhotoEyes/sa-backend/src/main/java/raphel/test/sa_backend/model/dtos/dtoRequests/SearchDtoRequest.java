package raphel.test.sa_backend.model.dtos.dtoRequests;

public class SearchDtoRequest {
    private String keyword;

    private String ville;

    private String specialite;

    public SearchDtoRequest(){}

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getSpecialite() {
        return specialite;
    }

    public void setSpecialite(String specialite) {
        this.specialite = specialite;
    }
}
