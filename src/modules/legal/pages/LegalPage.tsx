import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Seo from "@/components/seo/Seo";
import { legalSeo } from "@/modules/legal/seo";
import { ROUTES } from "@/config/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ShieldCheck, Cookie } from "lucide-react";

const LAST_UPDATED = "8 de febrero de 2026";

const SUMMARY_ITEMS = [
  {
    id: "terminos",
    title: "Términos y Condiciones",
    description: "Reglas de uso del sitio y responsabilidad de la información publicada.",
    Icon: FileText,
  },
  {
    id: "privacidad",
    title: "Política de Privacidad",
    description: "Cómo tratamos tus datos personales y cómo ejercer tus derechos.",
    Icon: ShieldCheck,
  },
  {
    id: "cookies",
    title: "Política de Cookies",
    description: "Uso de cookies técnicas y gestión de preferencias.",
    Icon: Cookie,
  },
];

const LegalPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo {...legalSeo} />
      <Header />
      <main className="flex-1">
        <section className="bg-muted/30 border-b border-border/60">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Legal
              </p>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Términos, Privacidad y Cookies
              </h1>
              <p className="text-muted-foreground text-base md:text-lg">
                Este documento reúne la información legal esencial de O&amp;P INGENIERIA SAS sobre el
                uso del sitio web, el tratamiento de datos personales y el manejo de cookies.
              </p>
              <p className="text-sm text-muted-foreground">Última actualización: {LAST_UPDATED}</p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">Índice</p>
                  <nav aria-label="Índice legal" className="mt-4 space-y-3">
                    {SUMMARY_ITEMS.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <item.Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
                  <p className="text-sm font-semibold text-foreground">Contacto legal</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    O&amp;P INGENIERIA SAS · NIT 900.716.210-9 · Bogotá, Colombia
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">Email: info@opingenieria.com</p>
                  <p className="text-sm text-muted-foreground">Tel: +57 (601) 4732039</p>
                </div>
              </aside>

              <article className="space-y-12">
                <div className="grid gap-4 md:grid-cols-3">
                  {SUMMARY_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <item.Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                    </a>
                  ))}
                </div>

                <section id="terminos" className="scroll-mt-24 space-y-4">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Términos y Condiciones
                  </h2>
                  <p className="text-muted-foreground">
                    Bienvenido(a) al sitio web de O&amp;P INGENIERIA SAS. Al acceder o utilizar este
                    sitio, aceptas estos términos. Si no estás de acuerdo, por favor abstente de usarlo.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">1. Uso del sitio</h3>
                    <p className="text-muted-foreground">
                      El sitio tiene fines informativos sobre nuestros servicios, productos y proyectos.
                      No está destinado a comercio electrónico. Te comprometes a usarlo de manera lícita,
                      sin afectar su seguridad ni disponibilidad.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">2. Propiedad intelectual</h3>
                    <p className="text-muted-foreground">
                      Los contenidos, marcas, diseños y materiales son propiedad de O&amp;P INGENIERIA SAS
                      o de sus titulares autorizados. Queda prohibida su reproducción o uso no autorizado.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">3. Información técnica</h3>
                    <p className="text-muted-foreground">
                      La información publicada es de carácter general y puede cambiar sin previo aviso.
                      Para propuestas formales o asesoría técnica, contáctanos directamente.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">4. Enlaces externos</h3>
                    <p className="text-muted-foreground">
                      El sitio puede incluir enlaces a terceros. O&amp;P INGENIERIA SAS no controla ni se
                      responsabiliza por su contenido o políticas.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">5. Limitación de responsabilidad</h3>
                    <p className="text-muted-foreground">
                      No garantizamos la ausencia de errores ni interrupciones. En ningún caso seremos
                      responsables por daños derivados del uso del sitio.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">6. Cambios a los términos</h3>
                    <p className="text-muted-foreground">
                      Podemos actualizar estos términos en cualquier momento. Las modificaciones rigen
                      desde su publicación en esta página.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">7. Ley aplicable</h3>
                    <p className="text-muted-foreground">
                      Estos términos se rigen por las leyes de la República de Colombia.
                    </p>
                  </div>
                </section>

                <section id="privacidad" className="scroll-mt-24 space-y-4">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Política de Privacidad
                  </h2>
                  <p className="text-muted-foreground">
                    O&amp;P INGENIERIA SAS (NIT 900.716.210-9) es responsable del tratamiento de los datos
                    personales conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">1. Datos que recopilamos</h3>
                    <p className="text-muted-foreground">
                      Podemos recopilar información que nos compartes en formularios de contacto o
                      comunicación directa, como nombre, email, asunto, mensaje, empresa y teléfono.
                      También podemos registrar datos técnicos básicos del dispositivo y navegación
                      (por ejemplo, tipo de navegador o dirección IP) para fines de seguridad.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">2. Finalidades</h3>
                    <p className="text-muted-foreground">
                      Usamos los datos para responder solicitudes, preparar cotizaciones, agendar visitas,
                      brindar soporte, cumplir obligaciones legales y mejorar la experiencia del sitio.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">3. Base legal</h3>
                    <p className="text-muted-foreground">
                      El tratamiento se realiza con tu consentimiento, para la ejecución de medidas
                      precontractuales o contractuales y para el cumplimiento de obligaciones legales.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">4. Derechos del titular</h3>
                    <p className="text-muted-foreground">
                      Puedes solicitar acceso, actualización, rectificación, supresión o revocatoria de
                      tu autorización. Para ello escribe a info@opingenieria.com con el asunto “Habeas Data”.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">5. Terceros y encargados</h3>
                    <p className="text-muted-foreground">
                      Podemos usar proveedores de hosting y correo para operar el sitio. No compartimos
                      datos con terceros para fines comerciales distintos a los aquí descritos.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">6. Transferencias internacionales</h3>
                    <p className="text-muted-foreground">
                      Si nuestros proveedores están fuera de Colombia, podrían existir transferencias
                      internacionales. En ese caso, aplicaremos las garantías legales correspondientes.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">7. Conservación y seguridad</h3>
                    <p className="text-muted-foreground">
                      Conservamos la información solo durante el tiempo necesario para cumplir su finalidad
                      o las obligaciones legales. Implementamos medidas técnicas y organizativas para
                      proteger la información.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">8. Herramientas de terceros</h3>
                    <p className="text-muted-foreground">
                      Tras la revisión técnica del sitio, no se identificaron herramientas de analítica,
                      publicidad o seguimiento de terceros activas. Si se integran en el futuro, esta
                      política será actualizada.
                    </p>
                  </div>
                </section>

                <section id="cookies" className="scroll-mt-24 space-y-4">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Política de Cookies
                  </h2>
                  <p className="text-muted-foreground">
                    Las cookies son pequeños archivos que un sitio puede almacenar en tu dispositivo
                    para recordar preferencias y mejorar la navegación.
                  </p>

                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">1. Cookies utilizadas</h3>
                    <p className="text-muted-foreground">
                      Este sitio puede usar cookies técnicas necesarias para su funcionamiento. No se
                      utilizan cookies de analítica o marketing de terceros en la versión actual del sitio.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">2. Gestión de cookies</h3>
                    <p className="text-muted-foreground">
                      Puedes bloquear o eliminar cookies desde la configuración de tu navegador. Ten en
                      cuenta que algunas funciones podrían verse afectadas si las deshabilitas.
                    </p>

                    <h3 className="text-lg font-semibold text-foreground">3. Cambios en la política</h3>
                    <p className="text-muted-foreground">
                      Si incorporamos nuevas cookies o herramientas de terceros, actualizaremos esta
                      política y la fecha de última actualización.
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl border border-border/60 bg-secondary/40 p-6">
                  <h2 className="text-xl font-heading font-bold text-foreground">
                    ¿Necesitas asesoría legal o de privacidad?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Escríbenos para atender tus solicitudes legales y de protección de datos.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild>
                      <Link to={ROUTES.CONTACT}>Contactar ahora</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:info@opingenieria.com">info@opingenieria.com</a>
                    </Button>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalPage;
