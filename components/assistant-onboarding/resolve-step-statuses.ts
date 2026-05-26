import { AdminFlagsV2 } from "types/assistant";
import { StepDescriptor } from "./types";

export function resolveStepStatuses(flags: AdminFlagsV2): StepDescriptor[] {
  const postCall = flags.callCompleted;
  return [
    {
      id: "call",
      title: "Úvodní call",
      description: "Vyberte si termín úvodního představení projektu.",
      status: flags.callCompleted
        ? "done"
        : flags.callSlotReserved
        ? "waiting"
        : "active",
      statusLabel: flags.callCompleted
        ? "Dokončeno"
        : flags.callSlotReserved
        ? "Čeká na konání"
        : "Vyberte termín",
    },
    {
      id: "contractInfo",
      title: "Informace ke smlouvě",
      description: "Doplňte identifikační a kontaktní údaje pro smlouvu.",
      status: !postCall
        ? "locked"
        : flags.contractInfoProvided
        ? "done"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.contractInfoProvided
        ? "Dokončeno"
        : "Vyplňte údaje",
    },
    {
      id: "contractSign",
      title: "Podpis smlouvy",
      description:
        "Po přípravě smlouvy přejděte k jejímu elektronickému podpisu.",
      status: !flags.contractCreated
        ? "locked"
        : flags.contractSigned
        ? "done"
        : "waiting",
      statusLabel: !flags.contractCreated
        ? "Čeká na vytvoření koordinátorem"
        : flags.contractSigned
        ? "Dokončeno"
        : "Podepište smlouvu",
    },
    {
      id: "criminalRecord",
      title: "Výpis z rejstříku trestů",
      description: "Nahrajte soubor s výpisem ke kontrole.",
      status: !postCall
        ? "locked"
        : flags.criminalRecordApproved
        ? "done"
        : flags.criminalRecordUploaded
        ? "waiting"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.criminalRecordApproved
        ? "Dokončeno"
        : flags.criminalRecordUploaded
        ? "Čeká na kontrolu"
        : "Nahrajte výpis",
    },
    {
      id: "kodo",
      title: "Registrace v KoDo",
      description: "Dokončete registraci v externím formuláři KoDo.",
      status: !postCall
        ? "locked"
        : flags.kodoConfirmed
        ? "done"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.kodoConfirmed
        ? "Dokončeno"
        : "Vyplňte registraci",
    },
    {
      id: "training",
      title: "Proškolení",
      description:
        "Projděte si školicí materiály a potvrďte jejich prostudování.",
      status: !postCall
        ? "locked"
        : flags.trainingConfirmed
        ? "done"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.trainingConfirmed
        ? "Dokončeno"
        : "K potvrzení",
    },
    {
      id: "discord",
      title: "Discord",
      description:
        "Zadejte své Discord uživatelské jméno nebo zvolte, že Discord nepoužíváte.",
      status: !postCall
        ? "locked"
        : flags.discordInfoProvided && flags.discordAccessGranted
        ? "done"
        : flags.discordInfoProvided
        ? "waiting"
        : "active",
      statusLabel: !postCall
        ? "Uzamčeno"
        : flags.discordInfoProvided && flags.discordAccessGranted
        ? "Dokončeno"
        : flags.discordInfoProvided
        ? "Čeká na přidělení přístupu"
        : "Zadejte údaje",
    },
  ];
}
