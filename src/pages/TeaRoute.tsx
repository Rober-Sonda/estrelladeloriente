import React from 'react';

export const TeaRoute: React.FC = () => {
  return (
    <div className="container tea-route-container">
      <div className="tea-route-header">
        <h1 className="section-title" style={{ marginBottom: '1rem', fontSize: '3rem' }}>El Camino de la Hebra</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
          Bienvenido a la guía definitiva para amantes del té. Un viaje donde la historia de las dinastías antiguas se entrelaza con la ciencia moderna, y donde las leyendas milenarias se convierten en consejos prácticos para que prepares la taza perfecta en la comodidad de tu hogar.
        </p>
      </div>

      <div className="tea-route-grid">
        
        {/* Capítulo 1: El Origen */}
        <div className="glass-panel chapter-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.5rem', letterSpacing: '2px' }}>CAPÍTULO I</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              El Accidente que Cambió el Mundo
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Año 2737 a.C. El emperador chino Shen Nong, un erudito obsesionado con la higiene, ordenaba hervir el agua antes de beberla. Mientras descansaba bajo un árbol silvestre, una brisa arrastró unas hojas hacia su olla hirviendo. Al beber el agua dorada, experimentó una claridad mental asombrosa. Acababa de nacer el té (proveniente de la planta <em>Camellia sinensis</em>).
          </p>
          <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '2px solid var(--color-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-secondary)' }}>Tip Práctico: Despierta tus Sentidos</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
              Tal como hizo el emperador, el primer paso antes de tomar té es <strong>observar y oler</strong>. Antes de infundir las hebras, huélelas en seco. Luego, calienta tu taza vacía con agua caliente, vacíala, coloca las hebras dentro y vuelve a oler. Verás cómo el calor de la taza "despierta" los aceites esenciales de la hebra seca, revelando aromas a cacao, flores o bosque húmedo que antes estaban ocultos.
            </p>
          </div>
        </div>

        {/* Capítulo 2: El Agua */}
        <div className="glass-panel chapter-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.5rem', letterSpacing: '2px' }}>CAPÍTULO II</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Madre del Té (El Agua)
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            El famoso maestro chino Lu Yu, autor del primer libro sobre el té en el siglo VIII ("El Clásico del Té"), decía que <em>"el agua de manantial de montaña es la mejor, el agua de río es mediocre, y el agua de pozo es la peor"</em>. En la antigüedad, los maestros viajaban semanas enteras solo para recolectar agua del deshielo para sus ceremonias.
          </p>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            La química nos da la razón: una taza de té es 99% agua. Si el agua tiene demasiado cloro o minerales pesados (agua dura), los componentes del té no pueden disolverse correctamente y la infusión queda "opaca" y plana.
          </p>
          <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '2px solid var(--color-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-secondary)' }}>Tip Práctico: Nunca hiervas el agua dos veces</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
              Usa siempre agua filtrada o mineral de mineralización débil. Y un secreto milenario: <strong>no sobre-hiervas el agua ni la hiervas dos veces</strong>. Al hervir demasiado, el agua pierde el oxígeno disuelto. Las hebras de té necesitan ese oxígeno para "respirar" y expandir sus aromas en la taza. Calienta el agua solo hasta la temperatura que necesites.
            </p>
          </div>
        </div>

        {/* Capítulo 3: Almacenamiento */}
        <div className="glass-panel chapter-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.5rem', letterSpacing: '2px' }}>CAPÍTULO III</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Ruta de la Seda y la Conservación
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Cuando el té comenzó a exportarse a través de la Ruta de la Seda y en los largos viajes en barco de la Compañía de las Indias Orientales, la frescura era un problema. Para sobrevivir meses a lomo de camello o en bodegas marinas, los chinos desarrollaron técnicas como oxidar completamente el té (Té Negro) o comprimirlo en discos duros como rocas (Té Pu-erh) para protegerlo de la humedad.
          </p>
          <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '2px solid var(--color-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-secondary)' }}>Tip Práctico: Los 4 Enemigos del Té en tu Cocina</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
              El té es como una esponja; absorbe todo lo que lo rodea. Sus 4 grandes enemigos son: <strong>Luz, Oxígeno, Humedad y Olores</strong>.
              <br/><br/>
              <em>¿Qué debes hacer?</em> Nunca guardes tu té en frascos de cristal transparente si van a estar expuestos al sol, ni lo pongas en el mismo estante que tus especias, café o ajos. Guárdalo en latas herméticas u oscuras, en un lugar fresco y seco.
            </p>
          </div>
        </div>

        {/* Capítulo 4: Las Teteras */}
        <div className="glass-panel chapter-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.5rem', letterSpacing: '2px' }}>CAPÍTULO IV</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Las Herramientas del Alquimista
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            A lo largo de los siglos, el recipiente donde se preparaba el té fue evolucionando. En China, los eruditos descubrieron la arcilla porosa de <em>Yixing</em>, cuyas teteras absorbían los aceites del té con el tiempo, haciendo que cada preparación fuera mejor que la anterior. Al llegar a Europa, la realeza comenzó a usar fina porcelana para demostrar su estatus, ya que la porcelana no retenía olores y permitía probar diferentes blends.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', borderTop: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Teteras de Vidrio</h4>
              <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>Son espectaculares para Tés Verdes, Blancos o Blends con flores. El vidrio no guarda olores y te permite disfrutar del "espectáculo visual" de ver cómo las hebras bailan y se despliegan ("La Agonía de la Hoja").</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', borderTop: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Teteras de Hierro Fundido</h4>
              <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>Originarias de Japón (<em>Tetsubin</em>). Retienen el calor de forma impresionante. Son ideales para Tés Negros, Rojos u Oolongs muy oxidados que necesitan mantener una temperatura alta durante toda la infusión.</p>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', borderTop: '1px solid var(--color-border)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Infusores de Metal/Silicona</h4>
              <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.6, color: 'var(--color-text-muted)' }}>La solución moderna. <strong>Tip clave:</strong> Asegúrate de que el infusor sea lo suficientemente grande. Si aprisionas el té en una bolita muy pequeña, el agua no podrá circular entre las hojas y tu infusión quedará aguada.</p>
            </div>
          </div>
        </div>

        {/* Capítulo 5: Guía Definitiva de Preparación */}
        <div className="glass-panel chapter-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.5rem', letterSpacing: '2px' }}>CAPÍTULO V</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Regla de Oro (Tiempos y Temperaturas)
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
              De una misma planta (Camellia sinensis) logramos colores y sabores radicalmente diferentes solo alterando su proceso de secado y oxidación. Pero <strong>todo este trabajo del agricultor se arruina si preparas el té mal en casa.</strong>
            </p>
          </div>
          
          <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-secondary)', color: 'var(--color-primary)' }}>
                  <th style={{ padding: '1rem' }}>Variedad</th>
                  <th style={{ padding: '1rem' }}>Historia / Proceso</th>
                  <th style={{ padding: '1rem', color: 'var(--color-secondary)' }}>Temperatura</th>
                  <th style={{ padding: '1rem', color: 'var(--color-secondary)' }}>Tiempo</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Blanco</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>El tesoro imperial chino. Cosechan los brotes tiernos y solo los dejan secar al sol. Delicado, dulce y sutil.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>75°C - 80°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Verde</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Las hojas se tuestan inmediatamente tras la cosecha para evitar que se oxiden. Rico en antioxidantes.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>70°C - 80°C</td>
                  <td style={{ padding: '1rem' }}>1.5 a 3 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Oolong (Azul)</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>El té de los grandes maestros. Semioxidado. Complejidad aromática a flores o tostados.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>85°C - 90°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Negro</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Las hojas se rompen a propósito para que el oxígeno las oxide por completo. Robusto y astringente.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>95°C - 100°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Pu-erh (Rojo)</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Fermentado bajo tierra durante años. Su sabor es terroso y es un excelente digestivo.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>95°C - 100°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Tisanas / Hierbas</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Menta, manzanilla, florales. No provienen de la planta del té, por lo que NO tienen cafeína/teína.</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-secondary)' }}>100°C</td>
                  <td style={{ padding: '1rem' }}>5 a 8 min</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '2rem', padding: '1.5rem', borderLeft: '2px solid var(--color-secondary)', background: 'var(--color-surface)' }}>
            <strong style={{ color: 'var(--color-secondary)' }}>Tip de Oro:</strong> ¿Tu té verde siempre sabe amargo y astringente? Es porque usaste agua demasiado caliente (hirviendo) o lo dejaste más de 3 minutos. El exceso de calor "quema" la hoja liberando taninos que destruyen el sabor sutil y dulce del té. Para enfriar tu agua hervida rápido, pásala por 2 tazas frías antes de servirla en la tetera.
          </div>
        </div>

        {/* Capítulo 6: La Química y el Mindfulness */}
        <div className="glass-panel chapter-panel" style={{ borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-secondary)', marginBottom: '0.5rem', letterSpacing: '2px' }}>CAPÍTULO VI</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Química de la Calma
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Una de las mayores diferencias entre el café y el té es cómo te hacen sentir. El café te empuja a un pico de adrenalina rápida que a menudo termina en nerviosismo y un "bajón" repentino. 
          </p>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            El té posee un secreto químico maravilloso: un aminoácido llamado <strong>L-Teanina</strong>. Esta molécula natural se adhiere a la cafeína del té (teína) y ralentiza su paso a la sangre. Al mismo tiempo, la L-Teanina estimula la producción de ondas cerebrales Alfa (asociadas a la meditación y la creatividad).
          </p>
          <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '2px solid var(--color-secondary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-secondary)' }}>Tip Práctico: Tu Ritual de Mindfulness</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-muted)' }}>
              Aprovecha esta química para crear tu propio ritual diario. Aléjate de las pantallas por 10 minutos. Escucha el sonido del agua al caer, observa cómo el vapor sube y dibuja formas en el aire, y mira cómo las hojas se desenrollan lentamente en el agua, devolviendo la vida que tenían en la montaña. Beber té no es hidratarse; es meditar en movimiento.
            </p>
          </div>
        </div>

        {/* Cierre */}
        <div className="glass-panel chapter-panel chapter-panel-final" style={{ borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            Tu Próxima Taza te Espera
          </h2>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>
            Ahora que conoces los secretos, el origen, las temperaturas y la alquimia de esta bebida legendaria, estás listo para llevar tu experiencia al siguiente nivel. Visita nuestro catálogo o diseña tu propio blend personalizado aplicando todo lo que has aprendido. En <strong>Estrella del Oriente</strong> te damos las hebras, pero la magia la creas tú.
          </p>
        </div>

      </div>
    </div>
  );
};
