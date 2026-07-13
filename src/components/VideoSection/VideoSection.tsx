import { useState } from "react";
import styles from "./hero-section.module.css";
import VideoSource from "@/assets/Video/gauswarn.mp4";

const VideoSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  return (
    <>
      <p className="sr-only">
        Watch how Gauswarn India prepares pure A2 Gir Cow Ghee using the
        traditional Bilona method in our Gaushala.
      </p>

      <section className={styles.hero}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={VideoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className={styles.overlay}></div>

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>Why Our Ghee is Truly Special</h2>

          <button
            className={styles.playButton}
            onClick={() => setIsVideoModalOpen(true)}
            aria-label="Play video about our ghee"
          >
            <svg
              viewBox="0 0 500 500"
              className={styles.circleSvg}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  id="textcircle"
                  d="M250,400 a150,150 0 0,1 0,-300 a150,150 0 0,1 0,300 Z"
                  transform="rotate(12,250,250)"
                />
              </defs>

              {/* Rotating text circle */}
              <g className={styles.textCircle}>
                <text textLength="940">
                  <textPath href="#textcircle">
                    Watch Now | Watch Now | Watch Now |
                  </textPath>
                </text>
              </g>

              {/* Play icon */}
              <circle cx="250" cy="250" r="60" fill="rgba(255,255,255,0.2)" />
              <polygon points="230,220 230,280 290,250" fill="white" />
            </svg>
          </button>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className={styles.modal}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video modal"
            >
              ✕
            </button>
            <video controls autoPlay className={styles.modalVideo}>
              <source src={VideoSource} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSection;
