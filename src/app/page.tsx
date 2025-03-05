import Wizard from "@/components/wizard";
import { WizardProvider } from "@/components/wizard/provider/wizard-provider";

export default function Home() {
  return (
    <div className="h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="h-full flex flex-col items-center justify-center">
        <WizardProvider>
          <Wizard />
        </WizardProvider>
      </main>
    </div>
  );
}
