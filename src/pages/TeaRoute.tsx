import React from 'react';

export const TeaRoute: React.FC = () => {
  return (
    <div className="container tea-route-container" style={{ paddingBottom: '5rem' }}>
      <div className="tea-route-header" style={{ textAlign: 'center', marginBottom: '5rem', marginTop: '3rem' }}>
        <h1 className="tea-hero-title" style={{ fontSize: '3.5rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
          La Ruta Histórica del Té
        </h1>
        <p className="tea-hero-subtitle" style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '850px', margin: '0 auto', lineHeight: '1.8' }}>
          Un viaje inmersivo a través de cinco milenios. Descubre cómo unas humildes hojas silvestres arrastradas por el viento transformaron la medicina antigua, impulsaron la filosofía Zen, moldearon imperios y se convirtieron en la segunda bebida más consumida de la humanidad.
        </p>
      </div>

      <div className="timeline" style={{ position: 'relative', maxWidth: '950px', margin: '0 auto' }}>
        
        {/* Timeline Item 1 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>1. El Nacimiento del Té: Entre la Historia y la Leyenda</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            La historia del té comienza en China hace más de 4.000 años. Según una antigua leyenda china, en el año 2737 a.C. el emperador Shen Nong —conocido por sus conocimientos sobre plantas medicinales— descansaba mientras hervía agua bajo un árbol silvestre. Algunas hojas cayeron accidentalmente en el recipiente, dando origen a una bebida aromática y reconfortante: el primer té.
          </p>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Aunque se trata de un relato legendario, los registros históricos muestran que el té comenzó utilizándose principalmente con fines medicinales. Durante siglos, las hojas de Camellia sinensis eran valoradas por sus propiedades digestivas, revitalizantes y purificadoras. Se consumía para aliviar el cansancio, mejorar la concentración y acompañar prácticas espirituales.
          </p>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '0' }}>
            Hacia la dinastía Tang (618–907 d.C.), el té dejó de ser exclusivo de médicos y monjes para convertirse en una bebida popular en toda China. En esta época se escribió el primer gran tratado sobre el té, el Cha Jing o “El Clásico del Té”, creado por Lu Yu en el siglo VIII. Allí se describían técnicas de cultivo, preparación y consumo, consolidando al té como parte fundamental de la cultura china.
          </p>
        </div>

        {/* Timeline Item 2 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>2. La Ruta del Té: Viajes, Comercio y Tradiciones</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Con el paso de los siglos, el té comenzó a recorrer el mundo a través de rutas comerciales terrestres y marítimas. Los monjes budistas llevaron semillas y conocimientos a Japón alrededor del siglo IX, donde el té adquirió un profundo valor espiritual y ceremonial. Con el tiempo nació la famosa ceremonia japonesa del té, basada en la armonía, el respeto y la contemplación.
          </p>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Durante los siglos XVI y XVII, comerciantes portugueses y holandeses introdujeron el té en Europa. Su llegada causó fascinación entre la nobleza, especialmente en Inglaterra, donde rápidamente se convirtió en símbolo de elegancia y reunión social. En el siglo XVII surgió la costumbre del “afternoon tea”, una tradición británica que continúa hasta la actualidad.
          </p>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '0' }}>
            El crecimiento del comercio del té transformó economías enteras. Inglaterra impulsó enormes plantaciones en India y Sri Lanka para reducir su dependencia de China, dando origen a variedades mundialmente famosas como el té Assam y el Darjeeling. Incluso algunos acontecimientos históricos estuvieron ligados al té, como el “Boston Tea Party” de 1773 en Estados Unidos, una protesta contra los impuestos británicos que se convirtió en uno de los hechos que precedieron la independencia estadounidense.
          </p>
        </div>

        {/* Timeline Item 3 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>3. El Té en la Actualidad: Tradición, Bienestar y Nuevas Experiencias</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Hoy el té es una de las bebidas más consumidas del planeta, solo superada por el agua. Su historia milenaria continúa viva en cada taza, combinando tradición, cultura y bienestar. Existen múltiples variedades —verde, negro, blanco, oolong, pu-erh— además de incontables blends con flores, frutas, especias y hierbas naturales.
          </p>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Muchas personas siguen disfrutando el té por sus propiedades naturales. Dependiendo de su variedad, puede aportar antioxidantes, acompañar la digestión, brindar energía suave o generar momentos de relajación. También se ha convertido en parte de estilos de vida ligados al bienestar, la pausa consciente y los rituales cotidianos.
          </p>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '0' }}>
            En la actualidad, el mundo del té sigue reinventándose: infusiones frías, mezclas artesanales, ceremonias modernas y nuevas formas de disfrutarlo mantienen vigente una tradición que atravesó siglos y continentes. Más que una bebida, el té continúa siendo una experiencia compartida, una pausa en medio del día y un puente entre culturas e historias.
          </p>
        </div>

        {/* Tabla de Temperaturas y Tiempos */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem', textAlign: 'center' }}>
            Preparación Perfecta: Tiempo y Temperatura
          </h2>
          <p className="tea-text" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Toda la historia anterior pierde sentido si arruinas la hoja con agua hirviendo. Aquí tienes la guía definitiva de preparación.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-secondary)' }}>
                  <th style={{ padding: '1rem', color: 'var(--color-secondary)' }}>Variedad</th>
                  <th style={{ padding: '1rem', color: 'var(--color-secondary)' }}>Nivel de Oxidación</th>
                  <th style={{ padding: '1rem', color: 'var(--color-secondary)' }}>Temperatura Ideal</th>
                  <th style={{ padding: '1rem', color: 'var(--color-secondary)' }}>Tiempo de Infusión</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Blanco</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>10% - 15% (Secado al sol)</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>75°C - 80°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Verde</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>0% (Tostado o vaporizado)</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>70°C - 80°C</td>
                  <td style={{ padding: '1rem' }}>1.5 a 3 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Oolong (Azul)</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>20% - 80% (Semi-oxidado)</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>85°C - 90°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Negro</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>100% (Oxidación completa)</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>95°C - 100°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Pu-erh (Rojo)</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Post-Fermentado</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>95°C - 100°C</td>
                  <td style={{ padding: '1rem' }}>3 a 5 min</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Tisanas / Blends Florales</td>
                  <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>Sin Camellia sinensis</td>
                  <td style={{ padding: '1rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>100°C</td>
                  <td style={{ padding: '1rem' }}>5 a 8 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Conclusion */}
        <div className="glass-panel chapter-panel chapter-panel-final" style={{ textAlign: 'center', marginTop: '4rem', padding: '4rem', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, rgba(30,30,30,0.8), rgba(20,20,20,0.9))' }}>
          <h2 className="tea-closing-title" style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', fontSize: '2.5rem' }}>
            El Viaje Continúa en tu Taza
          </h2>
          <p className="tea-closing-text" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
            Cada vez que preparas una taza con paciencia, respetando los tiempos y prestando atención a los aromas, te conviertes en parte de una tradición ininterrumpida de cinco mil años. En <strong>Estrella del Oriente</strong>, te proporcionamos las hebras de mayor pureza; pero la magia, la química y la calma, las creas tú con el agua de tu hogar.
          </p>
        </div>

      </div>
    </div>
  );
};
