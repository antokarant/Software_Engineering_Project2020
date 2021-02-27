package gr.ntua.ece.softeng.team6.backend.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, SessionId> {}
