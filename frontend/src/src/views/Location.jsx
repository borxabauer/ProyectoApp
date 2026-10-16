import styles from "./Location.module.css";

const address = "Calle Falperra, 6, 4.º D, A Coruña, España";
const encodedAddress = encodeURIComponent(address);

const Location = () => (
  <section className={styles.location}>
    <div className={styles.details}>
      <p className={styles.eyebrow}>Estamos aquí</p>
      <h1>Visítanos</h1>
      <p className={styles.address}>{address}</p>
      <a
        className={styles.directions}
        href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Cómo llegar
      </a>
    </div>
    <iframe
      className={styles.map}
      title={`Mapa de ubicación: ${address}`}
      src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </section>
);

export default Location;
