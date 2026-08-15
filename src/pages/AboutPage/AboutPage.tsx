import styles from "./AboutPage.module.scss";

const AboutPage = () => {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>ABOUT THE PROJECT</span>

        <h1>
          Built by football fans,
          <br />
          <span>for football fans.</span>
        </h1>

        <p className={styles.intro}>
          This project was created out of a genuine passion for football,
          competition, and the simple joy of trying to predict what will happen
          over the course of a Premier League season.
        </p>
      </section>

      <section className={styles.content}>
        <div className={styles.textBlock}>
          <span className={styles.label}>THE INSPIRATION</span>

          <h2>
            It started with a love for
            <br />
            fantasy football.
          </h2>

          <p>
            The main inspiration behind the app came from the communities built
            around fantasy football and the Premier League. There is something
            special about creating your own team, making your predictions,
            comparing your choices with friends, and coming back every week to
            see who got it right.
          </p>

          <p>
            We wanted to take that feeling and build something focused entirely
            on prediction. Instead of managing fantasy players, you predict the
            season itself — and then compete with everyone else to see whose
            football knowledge comes out on top.
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src="/assets/images/about/arsenal.webp"
            alt="Premier League champions celebrating with the trophy"
          />
        </div>
      </section>

      <section className={styles.contentReverse}>
        <div className={styles.textBlock}>
          <span className={styles.label}>MORE THAN A PREDICTION</span>

          <h2>
            Predict.
            <br />
            Compete.
            <br />
            Follow the season.
          </h2>

          <p>
            The idea grew into a platform where you can make your prediction
            before the season begins, compete in leagues with friends, and
            follow your performance as the real Premier League season unfolds.
          </p>

          <p>
            The Match Predictor takes that competition even further. Across all
            38 gameweeks, you can predict the exact scores of upcoming matches
            and compete for points week after week.
          </p>

          <p>
            The goal is simple: make football predictions more fun, more
            competitive, and something you can share with the people you watch
            the game with.
          </p>
        </div>
      </section>

      <section className={styles.support}>
        <span className={styles.label}>SUPPORT THE PROJECT</span>

        <h2>Help us keep building.</h2>

        <p>
          This app started as a passion project and continues to grow thanks to
          the people who use it. If you enjoy the experience and would like to
          support its further development, donations are always appreciated.
        </p>

        <span className={styles.thanks}>
          Every bit of support helps us build something better.
        </span>
      </section>
    </main>
  );
};

export default AboutPage;
