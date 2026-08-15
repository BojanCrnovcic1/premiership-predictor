import { useState, useEffect } from "react";
import styles from "./PwaInstallCard.module.scss";
import Button from "../../../../components/ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallCard() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSSteps, setShowIOSSteps] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  useEffect(() => {
    // 1. If already running as standalone PWA, hide the component
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    // 2. iOS Detection (Safari on iOS doesn't support beforeinstallprompt event)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);

    if (isIosDevice) {
      setIsIOS(true);
      setIsInstallable(true);
      return;
    }

    // 3. Listener for Android, Chrome, Edge, and Desktop browsers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Hide component after successful installation
    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    // Toggle instructions step for iOS
    if (isIOS) {
      setShowIOSSteps((prev) => !prev);
      return;
    }

    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        setIsInstallable(false);
      }
    } catch (error) {
      console.error("Error during PWA installation:", error);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  if (!isInstallable) return null;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
            />
          </svg>
        </div>

        <div className={styles.textContent}>
          <h3>Install App on Your Device</h3>
          <p>
            Get quick access and a better experience by installing the app on
            your phone, tablet, or desktop.
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="md"
          fullWidth
          loading={isInstalling}
          onClick={handleInstallClick}
        >
          {isIOS
            ? showIOSSteps
              ? "Hide instructions"
              : "How to install on iOS"
            : "Install App"}
        </Button>
      </div>

      {isIOS && showIOSSteps && (
        <div className={styles.iosInstructions}>
          <p>How to install on iOS (Safari):</p>
          <ol>
            <li>
              Tap the <strong>Share</strong> button at the bottom of the screen.
            </li>
            <li>
              Scroll down and tap <strong>Add to Home Screen</strong>.
            </li>
            <li>
              Confirm by tapping <strong>Add</strong> in the top right corner.
            </li>
          </ol>
        </div>
      )}
    </section>
  );
}
