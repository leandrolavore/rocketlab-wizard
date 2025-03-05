import Wizard from "@/components/wizard";
import { ItemsCartProvider } from "@/components/wizard/provider/items-cart-provider";
import { WizardProvider } from "@/components/wizard/provider/wizard-provider";

export default function Home() {
  return (
    <div className="h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="h-full w-full flex flex-col items-center justify-center">
        <ItemsCartProvider>
          <WizardProvider>
            <Wizard />
          </WizardProvider>
        </ItemsCartProvider>
      </main>
    </div>
  );
}
