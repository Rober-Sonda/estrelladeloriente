import React from 'react';
import { Leaf, Sparkles, Heart, Zap, Flame, Globe, Coffee, BookOpen, FlaskConical, Thermometer, ShieldAlert } from 'lucide-react';

export const TeaRoute: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title" style={{ marginBottom: '1rem' }}>La Enciclopedia del Té</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
          Sumérgete en la historia, la ciencia y los secretos de una de las bebidas más antiguas de la humanidad. Desde el imperio chino hasta la química de tu taza.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Origen Milenario */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <BookOpen size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              El Origen: Un Accidente Divino
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            La historia nos remonta al año 2737 a.C. en <strong>China</strong>. Según cuenta la leyenda, el emperador Shen Nong, erudito y sanador, estaba descansando bajo un árbol silvestre mientras su sirviente hervía agua para purificarla. El viento sopló, y unas hojas de ese árbol —la <em>Camellia sinensis</em>— cayeron accidentalmente en la olla.
          </p>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            Atraído por el aroma increíble que emanaba, el emperador probó la infusión. No solo descubrió un sabor refrescante y revitalizante, sino también una claridad mental sin precedentes. Así, de la manera más fortuita, nació la bebida más consumida del mundo después del agua.
          </p>
        </div>

        {/* Expansión Mundial */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Globe size={40} style={{ color: 'var(--color-secondary)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Expansión: De Asia al Resto del Mundo
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Durante milenios, el té fue un secreto celosamente guardado por el imperio chino. Consumido inicialmente como medicina botánica, poco a poco se convirtió en la bebida diaria de la nobleza. No fue hasta el siglo IX d.C. que monjes budistas llevaron semillas a <strong>Japón</strong>, donde evolucionaría hacia formas únicas de arte y meditación (el Budismo Zen).
          </p>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            Gracias a la mítica Ruta de la Seda, el té cruzó desiertos hacia Oriente Medio y Rusia. En el siglo XVII, audaces mercaderes portugueses y holandeses lo introdujeron a <strong>Europa</strong>. Pronto, Inglaterra se enamoró perdidamente de la infusión, creando el imperio comercial más grande de la historia y cultivando masivas plantaciones en <strong>India</strong> y <strong>Sri Lanka</strong> para romper el monopolio chino.
          </p>
        </div>

        {/* Culturas y Rituales */}
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', textAlign: 'center', marginTop: '2rem' }}>
          Un Mundo en tu Taza: Rituales y Culturas
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary)' }}>🇯🇵 Japón: El Arte del Zen</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>La <em>Ceremonia del Té (Chanoyu)</em> elevó la preparación del té verde molido (<strong>Matcha</strong>) a una meditación en movimiento, representando Armonía, Respeto, Pureza y Tranquilidad.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary)' }}>🇬🇧 Inglaterra: Afternoon Tea</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Instaurado en el s. XIX por la Duquesa de Bedford, se convirtió en un ícono de la elegancia: Té negro potente servido en porcelana con leche, sándwiches y <em>scones</em> recién horneados.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary)' }}>🇮🇳 India: El Masala Chai</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>India combinó fuertes hojas de Assam con especias ayurvédicas (cardamomo, jengibre, clavo, canela y pimienta). Hervido con leche y azúcar, es el alma de las calles indias.</p>
          </div>

          <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-secondary)' }}>🇲🇦 Marruecos: Hospitalidad</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>Preparado con té verde <em>Gunpowder</em>, mucha hierbabuena fresca y azúcar. Se escancia desde lo alto para crear espuma. Rechazarlo cuando te lo ofrecen es una grave ofensa.</p>
          </div>
        </div>

        {/* La Química de la Calma */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', marginTop: '2rem', background: 'rgba(197, 168, 128, 0.05)', border: '1px solid var(--color-secondary)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <FlaskConical size={40} style={{ color: 'var(--color-secondary)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Química de la Calma: ¿Por qué el té relaja?
            </h2>
          </div>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            A diferencia del café, que te da un pico de energía rápido seguido de un fuerte "bajón" y posible ansiedad, el té contiene un aminoácido casi mágico llamado <strong>L-Teanina</strong>.
          </p>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            La L-Teanina interactúa con la cafeína natural del té (teína), ralentizando su absorción en el torrente sanguíneo. Esto genera un estado neurológico conocido como <em>"alerta relajada"</em>. Estimula las ondas cerebrales alfa, las mismas que se alcanzan durante la meditación profunda. Es por eso que los monjes budistas lo consumían para poder meditar durante horas sin dormirse, pero sin perder la paz interior.
          </p>
        </div>

        {/* Guía Definitiva de Preparación */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Thermometer size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              La Regla de Oro: Temperaturas y Tiempos
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
              El error más común es preparar todos los tés con agua hirviendo. El té verde quemado libera taninos que lo hacen insoportablemente amargo. Guarda esta guía:
            </p>
          </div>
          
          <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-secondary)', color: 'var(--color-primary)' }}>
                  <th style={{ padding: '1rem' }}>Variedad</th>
                  <th style={{ padding: '1rem' }}>Temperatura</th>
                  <th style={{ padding: '1rem' }}>Tiempo de Infusión</th>
                  <th style={{ padding: '1rem' }}>Sabor Resultante</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Blanco</td>
                  <td style={{ padding: '1rem' }}>75°C - 80°C</td>
                  <td style={{ padding: '1rem' }}>3 - 5 min</td>
                  <td style={{ padding: '1rem' }}>Dulce, sedoso, notas de melón y miel.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Verde</td>
                  <td style={{ padding: '1rem' }}>70°C - 80°C</td>
                  <td style={{ padding: '1rem' }}>1.5 - 3 min</td>
                  <td style={{ padding: '1rem' }}>Fresco, herbáceo, algas marinas, umami.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Oolong</td>
                  <td style={{ padding: '1rem' }}>85°C - 95°C</td>
                  <td style={{ padding: '1rem' }}>3 - 4 min</td>
                  <td style={{ padding: '1rem' }}>Floral (orquídeas), durazno, o tostado.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Té Negro</td>
                  <td style={{ padding: '1rem' }}>95°C - 100°C</td>
                  <td style={{ padding: '1rem' }}>3 - 5 min</td>
                  <td style={{ padding: '1rem' }}>Robusto, malta, maderoso, astringente.</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', fontWeight: 'bold' }}>Pu-erh (Rojo)</td>
                  <td style={{ padding: '1rem' }}>100°C</td>
                  <td style={{ padding: '1rem' }}>4 - 5 min</td>
                  <td style={{ padding: '1rem' }}>Terroso, denso, a bosque húmedo.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mitos y Verdades */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', marginTop: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ShieldAlert size={40} style={{ color: 'var(--color-primary)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)' }}>
              Mitos y Verdades del Té
            </h2>
          </div>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>❌ Mito: El té en saquitos es igual que el de hebras.</h4>
              <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}><strong>Verdad:</strong> El saquito comercial suele contener "polvo" o remanentes de la cosecha (llamado <em>Dust</em> o <em>Fannings</em>). Al estar triturado, pierde sus aceites esenciales rápidamente, resultando en un té amargo y plano. Las hebras enteras se expanden, liberando vitaminas, antioxidantes y sabores complejos.</p>
            </div>
            
            <div style={{ padding: '1.5rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>❌ Mito: Las infusiones frutales son "té".</h4>
              <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}><strong>Verdad:</strong> Técnicamente, solo es "té" si contiene hojas de la <em>Camellia sinensis</em>. La manzanilla, la menta, o los frutos rojos que no tienen base de té se llaman correctamente <strong>Tisanas</strong> o Infusiones botánicas (y no contienen cafeína natural).</p>
            </div>

            <div style={{ padding: '1.5rem', background: 'var(--color-bg-alt)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>❌ Mito: El té verde te ayuda a adelgazar por arte de magia.</h4>
              <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}><strong>Verdad:</strong> Aunque las catequinas del té verde aceleran ligeramente el metabolismo y la oxidación de grasas, no es una poción mágica. Su mayor beneficio para el peso viene de ser una bebida deliciosa sin calorías, que ayuda a la saciedad y a desintoxicar el cuerpo como parte de hábitos saludables.</p>
            </div>
          </div>
        </div>

        {/* Cierre */}
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginTop: '2rem' }}>
          <Heart size={40} style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }} />
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            Tu Propia Tradición Empieza Aquí
          </h2>
          <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            Ya sea en una elegante taza de porcelana, en un rústico bowl de arcilla, o mezclado con frutas en un mate frío para refrescar la tarde, el té evoluciona contigo. En <strong>Estrella del Oriente</strong> unimos este linaje milenario con toques botánicos locales (como nuestro exclusivo Blend Tereré). Descubre tu próxima mezcla favorita en nuestro Catálogo.
          </p>
        </div>

      </div>
    </div>
  );
};
