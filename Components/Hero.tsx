import  styles from"./Hero.module.css";
export default function Hero(){
    return(
        <section className={styles.hero}>
            <div className={styles.inner}>
                <h2>Aprendiendo componentes</h2>
                <p>Primero aprederemos plano y luego construiremos con componentes</p>
                <a className={styles.cta}>¡vamos!</a>
            </div>
        </section>
    )
}