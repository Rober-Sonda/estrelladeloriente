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
          <div className="timeline-date" style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>2737 a.C.</div>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>El Nacimiento Mítico y la Alquimia de Shen Nong</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            La historia del té no comienza en una cocina, sino en el reino de la medicina primitiva. Según la leyenda, el emperador chino Shen Nong, el mítico "Granjero Divino" y padre de la medicina tradicional, ordenaba hervir toda el agua antes de beberla para evitar enfermedades. Un día, mientras descansaba bajo un árbol de <em>Camellia sinensis</em> silvestre, una ráfaga de viento arrastró unas cuantas hojas hacia su caldero de agua hirviendo. Al notar el aroma y beber la infusión dorada, el emperador sintió cómo una energía pura y una claridad mental asombrosa recorrían su cuerpo. Durante siglos, el té fue consumido exclusivamente masticando la hoja o hirviéndola con cebolla, jengibre y especias como una potente medicina curativa.
          </p>
          <div className="tea-tip-box" style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h4 className="tea-tip-title" style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>El Secreto del Ritual: El Despertar de la Hoja</h4>
            <p className="tea-tip-text" style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-muted)' }}>
              Antes de añadir agua a tus hebras, <strong>siempre calienta tu tetera o taza vacía</strong> con un poco de agua caliente y luego deséchala. Coloca tus hebras secas en la tetera tibia, ponles la tapa unos segundos y luego destapa para olerlas. Este choque de calor "despierta" los aceites esenciales latentes en la hebra seca, revelando aromas a cacao, orquídeas o miel que pasarías por alto si solo arrojaras el agua directamente.
            </p>
          </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <div className="timeline-date" style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>Dinastía Tang (618-907 d.C.)</div>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>La Era Clásica y "El Clásico del Té"</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Bajo el reinado de la Dinastía Tang, el té se separó de la sopa medicinal y se elevó a la categoría de arte supremo. El erudito y poeta <strong>Lu Yu</strong>, un huérfano criado por monjes budistas, dedicó su vida a documentar cada detalle de esta planta y escribió el <em>"Cha Jing"</em> (El Clásico del Té). Lu Yu detestaba las mezclas con cebolla y especias; él enseñó a hervir ladrillos de té triturados únicamente con una pizca de sal. Además, codificó por primera vez qué tipo de leña usar, qué vasijas de porcelana realzaban el color de la bebida, y, lo más importante, definió la calidad del agua como el alma del té.
          </p>
          <div className="tea-tip-box" style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h4 className="tea-tip-title" style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>El Secreto del Alquimista: El Espíritu del Agua</h4>
            <p className="tea-tip-text" style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-muted)' }}>
              Lu Yu escribió que el agua que hierve demasiado tiempo es "agua muerta". <strong>Nunca vuelvas a hervir agua que ya se ha enfriado</strong>. Al sobre-hervir, eliminas todo el oxígeno disuelto en el agua. Las hebras de té necesitan oxígeno para que los compuestos aromáticos puedan adherirse y "florecer" en tu taza. Usa siempre agua fresca, fría y filtrada, y caliéntala solo hasta la temperatura que necesitas.
            </p>
          </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <div className="timeline-date" style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>Dinastía Song (960-1279 d.C.)</div>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>La Edad Romántica del Polvo y el Zen</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            La estética de los Song favoreció la delicadeza. El té hervido pasó de moda. En su lugar, las mejores hojas se molían meticulosamente con piedras de molino hasta obtener un polvo verde esmeralda. Este polvo se colocaba en un tazón de cerámica oscura y se batía con agua caliente utilizando un batidor de bambú, creando una espuma espesa que se asemejaba a las nubes. Los monjes budistas Zen adoptaron esta práctica para mantenerse despiertos durante largas horas de meditación profunda, y posteriormente la llevaron a Japón, donde evolucionó en la rígida y hermosa <strong>Ceremonia del Té Japonesa (Chanoyu)</strong> y el consumo moderno de Té Matcha.
          </p>
          <div className="tea-tip-box" style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h4 className="tea-tip-title" style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>El Secreto del Monje: La Química de la Calma</h4>
            <p className="tea-tip-text" style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-muted)' }}>
              A diferencia del café, el té verde y blanco no te dan "nerviosismo". Esto se debe a un aminoácido exclusivo del té llamado <strong>L-Teanina</strong>. Para extraer la máxima L-Teanina (que genera ondas Alfa cerebrales de calma y concentración) sin extraer taninos amargos, <strong>infusiona tu té verde a exactamente 75°C por no más de 2 minutos</strong>. Lograrás la misma calma enfocada que buscaban los monjes en sus templos.
            </p>
          </div>
        </div>

        {/* Timeline Item 4 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <div className="timeline-date" style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>Dinastía Ming (1368-1644 d.C.)</div>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>La Revolución de la Hebra y la Tetera de Yixing</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            El primer emperador Ming, de orígenes campesinos, abolió por decreto imperial la producción de té prensado y en polvo, por considerar que el proceso era agotador y opresivo para los agricultores. Ordenó que todos los tributos se pagaran en <strong>hojas sueltas</strong> enteras. Esta simple ley cambió el mundo: de pronto, ya no se podía batir el té. Hubo que inventar un nuevo recipiente para remojar las hojas en agua caliente y luego colarlas. Así nacieron las primeras <strong>teteras de arcilla porosa de Yixing</strong>, creando el método de infusión que usamos hasta el día de hoy.
          </p>
          <div className="tea-tip-box" style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h4 className="tea-tip-title" style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>El Secreto del Espacio: La Agonía de la Hoja</h4>
            <p className="tea-tip-text" style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-muted)' }}>
              Las hojas de té premium se enrollan a mano y pueden expandirse hasta 5 veces su tamaño en el agua. Este hermoso proceso visual se conoce poéticamente como "La Agonía de la Hoja". <strong>Jamás utilices infusores de bolita metálica pequeños.</strong> Al aprisionar la hebra, el agua no puede circular a través de ella, resultando en una taza aguada y plana. Dales espacio; usa infusores de canasta anchos o deja las hebras libres en la tetera.
            </p>
          </div>
        </div>

        {/* Timeline Item 5 */}
        <div className="timeline-item glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)', borderLeft: '5px solid var(--color-secondary)' }}>
          <div className="timeline-date" style={{ color: 'var(--color-secondary)', fontWeight: '700', fontSize: '1.4rem', marginBottom: '0.5rem', letterSpacing: '1px' }}>Siglo XVII en adelante</div>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem' }}>La Expansión a Occidente y los Océanos de Té</h2>
          <p className="tea-text" style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Cuando el té comenzó a cruzar los desiertos en la Ruta de la Seda y a navegar meses en las oscuras bodegas de los barcos de la Compañía Británica de las Indias Orientales, los chinos se encontraron con un problema: el delicado té verde se pudría durante el viaje. Para preservarlo, descubrieron que si dejaban que las hojas se magullaran y oxidaran completamente (volviéndose oscuras) antes de secarlas al fuego, soportaban el clima marítimo. Así nació el <strong>Té Negro</strong> y los tés fermentados (Pu-erh). Esta bebida oscura se volvió el motor financiero del Imperio Británico, desató las Guerras del Opio y provocó el célebre Motín del Té en Boston (1773).
          </p>
          <div className="tea-tip-box" style={{ background: 'rgba(197, 168, 128, 0.08)', border: '1px solid var(--color-secondary)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
            <h4 className="tea-tip-title" style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>El Secreto de la Conservación: Los 4 Enemigos</h4>
            <p className="tea-tip-text" style={{ fontSize: '1rem', margin: 0, color: 'var(--color-text-muted)' }}>
              Al igual que los marineros del siglo XVII, debes proteger tu inversión. El té es como una esponja; absorbe humedad y aromas ambientales. Sus cuatro peores enemigos son la <strong>Luz, el Calor, la Humedad y los Olores</strong>. Nunca guardes tu té en frascos de vidrio expuestos a la luz del sol, ni lo coloques en la despensa junto al café o las especias fuertes. Guárdalos siempre en latas opacas herméticas, en el lugar más fresco y seco de tu casa.
            </p>
          </div>
        </div>

        {/* Tabla de Temperaturas y Tiempos */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '4rem', borderRadius: 'var(--radius-lg)' }}>
          <h2 className="tea-chapter-title" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '2rem', textAlign: 'center' }}>
            La Alquimia del Tiempo y la Temperatura
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
