import { Banner } from "@/components/home/Banner";
import { Whatssap } from "@/components/shared/Whatssap";

export default function HomePage() {
  return (
    <div>
      <Banner />
      {/* Aqui iran los demas componentes de la Landing que se guardaran en la carpeta home */}

      <Whatssap />
    </div>
  );
}
