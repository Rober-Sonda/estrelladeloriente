import React from 'react';

export const TeaRoute: React.FC = () => {
  return (
    <div className="container tea-route-container">
      <div className="tea-route-header">
        <h1 className="tea-hero-title">El Camino de la Hebra</h1>
        <p className="tea-hero-subtitle">
          Bienvenido a la guía definitiva para amantes del té. Un viaje donde la historia de las dinastías antiguas se entrelaza con la ciencia moderna, y donde las leyendas milenarias se convierten en consejos prácticos para que prepares la taza perfecta en la comodidad de tu hogar.
        </p>
      </div>

      <div className="tea-route-grid">
        
        {/* Capítulo 1: El Origen */}
        <div className="glass-panel chapter-panel">
          <div className="chapter-header">
            <span className="chapter-number">CAPÍTULO I</span>
            <h2 className="tea-chapter-title">
              El Accidente que Cambió el Mundo
            </h2>
          </div>
          <p className="tea-text">
            Año 2737 a.C. El emperador chino Shen Nong, un erudito obsesionado con la higiene, ordenaba hervir el agua antes de beberla. Mientras descansaba bajo un árbol silvestre, una brisa arrastró unas hojas hacia su olla hirviendo. Al beber el agua dorada, experimentó una claridad mental asombrosa. Acababa de nacer el té (proveniente de la planta <em>Camellia sinensis</em>).
          </p>
          <div className="tea-tip-box">
            <h4 className="tea-tip-title">Tip Práctico: Despierta tus Sentidos</h4>
            <p className="tea-tip-text">
              Tal como hizo el emperador, el primer paso antes de tomar té es <strong>observar y oler</strong>. Antes de infundir las hebras, huélelas en seco. Luego, calienta tu taza vacía con agua caliente, vacíala, coloca las hebras dentro y vuelve a oler. Verás cómo el calor de la taza "despierta" los aceites esenciales de la hebra seca, revelando aromas a cacao, flores o bosque húmedo que antes estaban ocultos.
            </p>
          </div>
        </div>

        {/* Capítulo 2: El Agua */}
        <div className="glass-panel chapter-panel">
          <div className="chapter-header">
            <span className="chapter-number">CAPÍTULO II</span>
            <h2 className="tea-chapter-title">
              La Madre del Té (El Agua)
            </h2>
          </div>
          <p className="tea-text">
            El famoso maestro chino Lu Yu, autor del primer libro sobre el té en el siglo VIII ("El Clásico del Té"), decía que <em>"el agua de manantial de montaña es la mejor, el agua de río es mediocre, y el agua de pozo es la peor"</em>. En la antigüedad, los maestros viajaban semanas enteras solo para recolectar agua del deshielo para sus ceremonias.
          </p>
          <p className="tea-text">
            La química nos da la razón: una taza de té es 99% agua. Si el agua tiene demasiado cloro o minerales pesados (agua dura), los componentes del té no pueden disolverse correctamente y la infusión queda "opaca" y plana.
          </p>
          <div className="tea-tip-box">
            <h4 className="tea-tip-title">Tip Práctico: Nunca hiervas el agua dos veces</h4>
            <p className="tea-tip-text">
              Usa siempre agua filtrada o mineral de mineralización débil. Y un secreto milenario: <strong>no sobre-hiervas el agua ni la hiervas dos veces</strong>. Al hervir demasiado, el agua pierde el oxígeno disuelto. Las hebras de té necesitan ese oxígeno para "respirar" y expandir sus aromas en la taza. Calienta el agua solo hasta la temperatura que necesites.
            </p>
          </div>
        </div>

        {/* Capítulo 3: Almacenamiento */}
        <div className="glass-panel chapter-panel">
          <div className="chapter-header">
            <span className="chapter-number">CAPÍTULO III</span>
            <h2 className="tea-chapter-title">
              La Ruta de la Seda y la Conservación
            </h2>
          </div>
          <p className="tea-text">
            Cuando el té comenzó a exportarse a través de la Ruta de la Seda y en los largos viajes en barco de la Compañía de las Indias Orientales, la frescura era un problema. Para sobrevivir meses a lomo de camello o en bodegas marinas, los chinos desarrollaron técnicas como oxidar completamente el té (Té Negro) o comprimirlo en discos duros como rocas (Té Pu-erh) para protegerlo de la humedad.
          </p>
          <div className="tea-tip-box">
            <h4 className="tea-tip-title">Tip Práctico: Los 4 Enemigos del Té en tu Cocina</h4>
            <p className="tea-tip-text">
              El té es como una esponja; absorbe todo lo que lo rodea. Sus 4 grandes enemigos son: <strong>Luz, Oxígeno, Humedad y Olores</strong>.
              <br/><br/>
              <em>¿Qué debes hacer?</em> Nunca guardes tu té en frascos de cristal transparente si van a estar expuestos al sol, ni lo pongas en el mismo estante que tus especias, café o ajos. Guárdalo en latas herméticas u oscuras, en un lugar fresco y seco.
            </p>
          </div>
        </div>

        {/* Capítulo 4: Las Teteras */}
        <div className="glass-panel chapter-panel">
          <div className="chapter-header">
            <span className="chapter-number">CAPÍTULO IV</span>
            <h2 className="tea-chapter-title">
              Las Herramientas del Alquimista
            </h2>
          </div>
          <p className="tea-text">
            A lo largo de los siglos, el recipiente donde se preparaba el té fue evolucionando. En China, los eruditos descubrieron la arcilla porosa de <em>Yixing</em>, cuyas teteras absorbían los aceites del té con el tiempo, haciendo que cada preparación fuera mejor que la anterior. Al llegar a Europa, la realeza comenzó a usar fina porcelana para demostrar su estatus, ya que la porcelana no retenía olores y permitía probar diferentes blends.
          </p>
          <div className="tea-tools-grid">
            <div className="tea-tool-card">
              <h4 className="tea-tool-title">Teteras de Vidrio</h4>
              <p className="tea-tool-text">Son espectaculares para Tés Verdes, Blancos o Blends con flores. El vidrio no guarda olores y te permite disfrutar del "espectáculo visual" de ver cómo las hebras bailan y se despliegan ("La Agonía de la Hoja").</p>
            </div>
            <div className="tea-tool-card">
              <h4 className="tea-tool-title">Teteras de Hierro Fundido</h4>
              <p className="tea-tool-text">Originarias de Japón (<em>Tetsubin</em>). Retienen el calor de forma impresionante. Son ideales para Tés Negros, Rojos u Oolongs muy oxidados que necesitan mantener una temperatura alta durante toda la infusión.</p>
            </div>
            <div className="tea-tool-card">
              <h4 className="tea-tool-title">Infusores de Metal/Silicona</h4>
              <p className="tea-tool-text">La solución moderna. <strong>Tip clave:</strong> Asegúrate de que el infusor sea lo suficientemente grande. Si aprisionas el té en una bolita muy pequeña, el agua no podrá circular entre las hojas y tu infusión quedará aguada.</p>
            </div>
          </div>
        </div>

        {/* Capítulo 5: Guía Definitiva de Preparación */}
        <div className="glass-panel chapter-panel">
          <div className="chapter-header">
            <span className="chapter-number">CAPÍTULO V</span>
            <h2 className="tea-chapter-title">
              La Regla de Oro (Tiempos y Temperaturas)
            </h2>
            <p className="tea-subtitle">
              De una misma planta (Camellia sinensis) logramos colores y sabores radicalmente diferentes solo alterando su proceso de secado y oxidación. Pero <strong>todo este trabajo del agricultor se arruina si preparas el té mal en casa.</strong>
            </p>
          </div>
          
          <div className="tea-table-wrapper">
            <table className="tea-table">
              <thead>
                <tr>
                  <th>Variedad</th>
                  <th>Historia / Proceso</th>
                  <th className="tea-color-secondary">Temperatura</th>
                  <th className="tea-color-secondary">Tiempo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tea-table-strong">Té Blanco</td>
                  <td className="tea-table-desc">El tesoro imperial chino. Cosechan los brotes tiernos y solo los dejan secar al sol. Delicado, dulce y sutil.</td>
                  <td className="tea-table-temp">75°C - 80°C</td>
                  <td>3 a 5 min</td>
                </tr>
                <tr>
                  <td className="tea-table-strong">Té Verde</td>
                  <td className="tea-table-desc">Las hojas se tuestan inmediatamente tras la cosecha para evitar que se oxiden. Rico en antioxidantes.</td>
                  <td className="tea-table-temp">70°C - 80°C</td>
                  <td>1.5 a 3 min</td>
                </tr>
                <tr>
                  <td className="tea-table-strong">Oolong (Azul)</td>
                  <td className="tea-table-desc">El té de los grandes maestros. Semioxidado. Complejidad aromática a flores o tostados.</td>
                  <td className="tea-table-temp">85°C - 90°C</td>
                  <td>3 a 5 min</td>
                </tr>
                <tr>
                  <td className="tea-table-strong">Té Negro</td>
                  <td className="tea-table-desc">Las hojas se rompen a propósito para que el oxígeno las oxide por completo. Robusto y astringente.</td>
                  <td className="tea-table-temp">95°C - 100°C</td>
                  <td>3 a 5 min</td>
                </tr>
                <tr>
                  <td className="tea-table-strong">Pu-erh (Rojo)</td>
                  <td className="tea-table-desc">Fermentado bajo tierra durante años. Su sabor es terroso y es un excelente digestivo.</td>
                  <td className="tea-table-temp">95°C - 100°C</td>
                  <td>3 a 5 min</td>
                </tr>
                <tr>
                  <td className="tea-table-strong">Tisanas / Hierbas</td>
                  <td className="tea-table-desc">Menta, manzanilla, florales. No provienen de la planta del té, por lo que NO tienen cafeína/teína.</td>
                  <td className="tea-table-temp">100°C</td>
                  <td>5 a 8 min</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tea-tip-box tea-tip-box-special">
            <strong className="tea-color-secondary">Tip de Oro:</strong> ¿Tu té verde siempre sabe amargo y astringente? Es porque usaste agua demasiado caliente (hirviendo) o lo dejaste más de 3 minutos. El exceso de calor "quema" la hoja liberando taninos que destruyen el sabor sutil y dulce del té. Para enfriar tu agua hervida rápido, pásala por 2 tazas frías antes de servirla en la tetera.
          </div>
        </div>

        {/* Capítulo 6: La Química y el Mindfulness */}
        <div className="glass-panel chapter-panel">
          <div className="chapter-header">
            <span className="chapter-number">CAPÍTULO VI</span>
            <h2 className="tea-chapter-title">
              La Química de la Calma
            </h2>
          </div>
          <p className="tea-text">
            Una de las mayores diferencias entre el café y el té es cómo te hacen sentir. El café te empuja a un pico de adrenalina rápida que a menudo termina en nerviosismo y un "bajón" repentino. 
          </p>
          <p className="tea-text">
            El té posee un secreto químico maravilloso: un aminoácido llamado <strong>L-Teanina</strong>. Esta molécula natural se adhiere a la cafeína del té (teína) y ralentiza su paso a la sangre. Al mismo tiempo, la L-Teanina estimula la producción de ondas cerebrales Alfa (asociadas a la meditación y la creatividad).
          </p>
          <div className="tea-tip-box">
            <h4 className="tea-tip-title">Tip Práctico: Tu Ritual de Mindfulness</h4>
            <p className="tea-tip-text">
              Aprovecha esta química para crear tu propio ritual diario. Aléjate de las pantallas por 10 minutos. Escucha el sonido del agua al caer, observa cómo el vapor sube y dibuja formas en el aire, y mira cómo las hojas se desenrollan lentamente en el agua, devolviendo la vida que tenían en la montaña. Beber té no es hidratarse; es meditar en movimiento.
            </p>
          </div>
        </div>

        {/* Cierre */}
        <div className="glass-panel chapter-panel chapter-panel-final">
          <h2 className="tea-closing-title">
            Tu Próxima Taza te Espera
          </h2>
          <p className="tea-closing-text">
            Ahora que conoces los secretos, el origen, las temperaturas y la alquimia de esta bebida legendaria, estás listo para llevar tu experiencia al siguiente nivel. Visita nuestro catálogo o diseña tu propio blend personalizado aplicando todo lo que has aprendido. En <strong>Estrella del Oriente</strong> te damos las hebras, pero la magia la creas tú.
          </p>
        </div>

      </div>
    </div>
  );
};
