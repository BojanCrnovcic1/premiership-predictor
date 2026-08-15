import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.scss";

import Card from "../../../../components/ui/Card/Card";
import Button from "../../../../components/ui/Button";
import Modal from "../../../../components/ui/Modal/Modal";

import { useAuth } from "../../../../features/auth/hooks/useAuth";

type PredictorType = "season" | "match";

const Hero = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const leftTableImg = "/assets/images/hero/left-side-table1.webp";
  const rightTableImg = "/assets/images/hero/left-side-table2.webp";
  const matchTableImg = "/assets/images/hero/right-side-table.webp";
  const playersImg = "/assets/images/hero/player.webp";
  const ticketImg = "/assets/images/hero/ticket.webp";
  const cardBgImg = "/assets/backgrounds/hero-card-bg.webp";

  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePredictorClick = (type: PredictorType) => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (type === "season") {
      navigate("/season-predictor");
      return;
    }

    navigate("/match-predictor");
  };

  const handleLogin = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* Naslov */}
          <div className={styles.heading}>
            <h1>
              PREMIERSHIP
              <span>PREDICTOR</span>
            </h1>
          </div>

          <div className={styles.cards}>
            {/* ================= 1. LEFT CARD (SEASON PREDICTOR) ================= */}
            <Card
              className={styles.predictCard}
              style={{ backgroundImage: `url(${cardBgImg})` }}
            >
              <div className={styles.cardMain}>
                {/* LIJEVA STRANA */}
                <div className={styles.leftColumn}>
                  <div className={styles.textContent}>
                    <span className={styles.label}>SEASON PREDICTOR</span>

                    <h2>
                      PREDICT THE <br /> FINAL TABLE
                    </h2>

                    <p>Rank all 20 teams for the 2024/25 Season</p>
                  </div>

                  <img
                    src={leftTableImg}
                    alt="Top teams"
                    className={styles.leftTable}
                  />
                </div>

                {/* DESNA STRANA */}
                <div className={styles.rightColumn}>
                  <img
                    src={rightTableImg}
                    alt="Bottom teams"
                    className={styles.rightTable}
                  />
                </div>
              </div>

              <div className={styles.cardBottom}>
                <Button
                  className={styles.cardButton}
                  fullWidth
                  onClick={() => handlePredictorClick("season")}
                >
                  START PREDICTING
                </Button>
              </div>
            </Card>

            {/* ================= 2. RIGHT CARD (MATCHDAY PREDICTOR) ================= */}
            <Card
              className={styles.matchCard}
              style={{ backgroundImage: `url(${cardBgImg})` }}
            >
              {/* Grafike */}
              <div className={styles.floatingGraphics}>
                <img src={playersImg} alt="Players" className={styles.player} />

                <img src={ticketImg} alt="Ticket" className={styles.ticket} />
              </div>

              <div className={styles.cardHeader}>
                <span className={styles.label}>MATCHDAY PREDICTOR</span>

                <h2>
                  GUESS THE <br /> SCORES
                </h2>

                <p>Predict Matchday 3 results for points</p>
              </div>

              <div className={styles.matchTableWrapper}>
                <img
                  src={matchTableImg}
                  alt="Match Predictions"
                  className={styles.matchTable}
                />
              </div>

              <div className={styles.cardBottom}>
                <Button
                  className={styles.cardButton}
                  fullWidth
                  onClick={() => handlePredictorClick("match")}
                >
                  PREDICT NOW
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= LOGIN REQUIRED MODAL ================= */}

      <Modal open={isLoginModalOpen} onClose={handleCloseModal}>
        <div className={styles.loginModal}>
          <div className={styles.loginModalContent}>
            <span className={styles.loginModalLabel}>ACCESS REQUIRED</span>

            <h2 className={styles.loginModalTitle}>LOGIN TO CONTINUE</h2>

            <p className={styles.loginModalText}>
              You need to be logged in to use the predictor. Please log in to
              your account to start making predictions and earn points.
            </p>
          </div>

          <div className={styles.loginModalActions}>
            <Button variant="outline" size="md" onClick={handleCloseModal}>
              CLOSE
            </Button>

            <Button variant="primary" size="md" onClick={handleLogin}>
              LOGIN
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Hero;
