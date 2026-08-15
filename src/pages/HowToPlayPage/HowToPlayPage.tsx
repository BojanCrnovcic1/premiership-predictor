import styles from "./HowToPlayPage.module.scss";

const HowToPlayPage = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span>GET STARTED</span>
        <h1>How to Play</h1>
        <p>
          A simple guide to getting started with the platform and making your
          first predictions.
        </p>
      </header>

      {/* GETTING STARTED */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>01</span>
          <div>
            <h2>Get Started</h2>
            <p>Everything begins with your account.</p>
          </div>
        </div>

        <div className={styles.steps}>
          <article>
            <span>01</span>
            <h3>Create an account</h3>
            <p>
              Register your account and complete the required account
              information.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Choose your game</h3>
            <p>
              From your dashboard, choose between Season Predictor and Match
              Predictor.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Start predicting</h3>
            <p>
              Make your predictions and compete with other players through
              leagues and rankings.
            </p>
          </article>
        </div>
      </section>

      {/* SEASON */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>02</span>
          <div>
            <h2>Season Predictor</h2>
            <p>
              Predict the final Premier League table before the season starts.
            </p>
          </div>
        </div>

        <div className={styles.steps}>
          <article>
            <span>01</span>
            <h3>Open Season Predictor</h3>
            <p>
              Open the Season Predictor from the main navigation or your
              dashboard.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Arrange the teams</h3>
            <p>
              Drag and drop the teams into the position where you think they
              will finish.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Review your prediction</h3>
            <p>
              Check the complete 1–20 order before submitting your prediction.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Submit</h3>
            <p>
              Save your prediction before the season deadline. Once submitted,
              it becomes your official Season Predictor entry.
            </p>
          </article>
        </div>
      </section>

      {/* MATCH */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>03</span>
          <div>
            <h2>Match Predictor</h2>
            <p>Predict individual Premier League matches every gameweek.</p>
          </div>
        </div>

        <div className={styles.steps}>
          <article>
            <span>01</span>
            <h3>Select a gameweek</h3>
            <p>
              Choose the gameweek you want to play. You can navigate through the
              available rounds.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Predict the scores</h3>
            <p>
              Enter the number of goals you expect for the home and away team in
              every available match.
            </p>
          </article>

          <article>
            <span>03</span>
            <h3>Use your Boost</h3>
            <p>
              Select one match in the gameweek and activate your Boost to double
              the points you earn from that match.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Submit or update</h3>
            <p>
              You can change your prediction as many times as necessary until
              the match starts.
            </p>
          </article>
        </div>
      </section>

      {/* LEAGUES */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>04</span>
          <div>
            <h2>Play With Others</h2>
            <p>Compete privately or join the wider community.</p>
          </div>
        </div>

        <div className={styles.steps}>
          <article>
            <span>01</span>
            <h3>Create a league</h3>
            <p>
              Create your own league and invite friends to compete against each
              other.
            </p>
          </article>

          <article>
            <span>02</span>
            <h3>Join a league</h3>
            <p>Use a league code to join an existing private league.</p>
          </article>

          <article>
            <span>03</span>
            <h3>Join public leagues</h3>
            <p>
              Explore available public leagues and compete with other players.
            </p>
          </article>

          <article>
            <span>04</span>
            <h3>Climb the rankings</h3>
            <p>
              Earn points from your predictions and try to finish at the top of
              your league.
            </p>
          </article>
        </div>
      </section>

      {/* TIPS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>05</span>
          <div>
            <h2>Useful Tips</h2>
            <p>Make the most of your predictions.</p>
          </div>
        </div>

        <div className={styles.tips}>
          <div>
            <h3>Think before you submit</h3>
            <p>
              Review your Season Predictor carefully before submitting your
              final order.
            </p>
          </div>

          <div>
            <h3>Don't forget your Boost</h3>
            <p>Every gameweek gives you one Boost, so use it strategically.</p>
          </div>

          <div>
            <h3>Check your gameweeks</h3>
            <p>
              Match predictions can change until kickoff, so keep an eye on
              upcoming matches.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowToPlayPage;
