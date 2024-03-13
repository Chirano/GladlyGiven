package pt.gladlyGivenApi.GladlyGiven.Repositories.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import pt.gladlyGivenApi.GladlyGiven.Models.Email;
import pt.gladlyGivenApi.GladlyGiven.Models.Users.SessionContext;

import java.util.Optional;

public interface SessionContextRepository extends JpaRepository<SessionContext, Long> {
    Optional<SessionContext> findByUserId(Long userId);
    Optional<SessionContext> findByEmail(String email);
}
