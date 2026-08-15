import styles from "./RulesPage.module.scss";

const RulesPage = () => {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span>GAME RULES</span>
        <h1>Rules & Scoring</h1>
        <p>
          Everything you need to know about scoring in Season Predictor and
          Match Predictor.
        </p>
      </header>

      {/* SEASON PREDICTOR */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>01</span>
          <div>
            <h2>Season Predictor</h2>
            <p>
              Make your prediction before the start of the season and predict
              the final Premier League standings.
            </p>
          </div>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Basic Points</h3>

          <p>
            Points are awarded based on how close your predicted position is to
            the team's actual final position.
          </p>

          <ul>
            <li>
              Exact position — <strong>10 points</strong>
            </li>
            <li>
              One position away — <strong>5 points</strong>
            </li>
            <li>
              Two positions away — <strong>3 points</strong>
            </li>
            <li>
              Three positions away — <strong>1 point</strong>
            </li>
            <li>
              More than three positions away — <strong>0 points</strong>
            </li>
          </ul>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Bonus Points</h3>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Condition</th>
                  <th>Bonus</th>
                  <th>Maximum</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1st Place</td>
                  <td>Correct league champion</td>
                  <td>+20</td>
                  <td>20</td>
                </tr>

                <tr>
                  <td>Top 4</td>
                  <td>Team correctly predicted inside the Top 4</td>
                  <td>+8</td>
                  <td>32</td>
                </tr>

                <tr>
                  <td>Positions 5–7</td>
                  <td>Team correctly predicted inside positions 5–7</td>
                  <td>+7</td>
                  <td>21</td>
                </tr>

                <tr>
                  <td>Bottom 3</td>
                  <td>Team correctly predicted in the relegation zone</td>
                  <td>+6</td>
                  <td>18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Example</h3>

          <p>A player gets the following results:</p>

          <ul>
            <li>Correct champion — +20</li>
            <li>3 correct teams in the Top 4 — +24</li>
            <li>2 correct teams in positions 5–7 — +14</li>
            <li>1 correct relegated team — +6</li>
            <li>Basic points — 50</li>
          </ul>

          <p>
            <strong>Total: 50 + 20 + 24 + 14 + 6 = 114 points</strong>
          </p>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Important Notes</h3>

          <ul>
            <li>
              Bonus categories do not overlap. A team can only receive the bonus
              belonging to its actual category.
            </li>
            <li>
              Predictions must be completed before the start of the season.
            </li>
            <li>
              A prediction cannot be created after the prediction deadline.
            </li>
            <li>
              Teams that finish more than three positions away from the
              prediction receive 0 basic points.
            </li>
          </ul>
        </div>
      </section>

      {/* MATCH PREDICTOR */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>02</span>
          <div>
            <h2>Match Predictor</h2>
            <p>
              Predict the exact score of Premier League matches throughout the
              entire season.
            </p>
          </div>
        </div>

        <div className={styles.rulesBlock}>
          <h3>How Scoring Works</h3>

          <p>
            Match Predictor is played throughout all{" "}
            <strong>38 gameweeks</strong>. Each gameweek contains the matches
            available for prediction.
          </p>

          <p>
            You can submit or change your prediction until the match kickoff
            time. Once the match starts, the prediction is locked.
          </p>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Points</h3>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Points</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Correct home goals</td>
                  <td>+5</td>
                </tr>

                <tr>
                  <td>Correct away goals</td>
                  <td>+5</td>
                </tr>

                <tr>
                  <td>Correct goal difference</td>
                  <td>+5</td>
                </tr>

                <tr>
                  <td>Correct match outcome</td>
                  <td>+10</td>
                </tr>

                <tr>
                  <td>Correct total goals</td>
                  <td>+5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The maximum base score for a single match is therefore{" "}
            <strong>30 points</strong>.
          </p>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Boost</h3>

          <p>
            Every gameweek gives you one opportunity to use a{" "}
            <strong>Boost</strong>.
          </p>

          <p>
            Choose one match before kickoff and all points earned from that
            match will be <strong>doubled</strong>.
          </p>

          <ul>
            <li>You can use only one Boost per gameweek.</li>
            <li>The Boost must be selected before kickoff.</li>
            <li>You cannot move the Boost to another match after kickoff.</li>
          </ul>
        </div>

        <div className={styles.rulesBlock}>
          <h3>Postponed Matches</h3>

          <p>
            Postponed matches do not count as part of the original gameweek
            prediction. They are excluded from scoring until they are played
            according to the game's rules.
          </p>
        </div>
      </section>

      {/* GENERAL */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>03</span>
          <div>
            <h2>General Rules</h2>
            <p>Rules that apply across the platform.</p>
          </div>
        </div>

        <div className={styles.rulesBlock}>
          <ul>
            <li>
              Predictions are personal and cannot be changed by another player.
            </li>
            <li>
              Match predictions are locked automatically when the match starts.
            </li>
            <li>
              League rankings are calculated using the points earned by each
              player.
            </li>
            <li>
              The platform may update game data after official match results are
              confirmed.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default RulesPage;
