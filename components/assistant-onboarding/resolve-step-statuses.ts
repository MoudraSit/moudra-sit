import { AdminFlagsV2 } from "types/assistant";
import { StepDescriptor } from "./types";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import DescriptionIcon from "@mui/icons-material/Description";
import DrawIcon from "@mui/icons-material/Draw";
import GavelIcon from "@mui/icons-material/Gavel";
import SchoolIcon from "@mui/icons-material/School";

export function resolveStepStatuses(flags: AdminFlagsV2): StepDescriptor[] {
  const postCall = flags.callCompleted;
  return [
    {
      id: "call",
      title: "Úvodní call",
      description: "Vyberte si termín úvodního představení projektu.",
      Icon: VideoCallIcon,
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
      Icon: DescriptionIcon,
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
      Icon: DrawIcon,
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
      Icon: GavelIcon,
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
      id: "training",
      title: "Proškolení",
      description:
        "Projděte si školicí materiály a potvrďte jejich prostudování.",
      Icon: SchoolIcon,
      status: !flags.contractSigned
        ? "locked"
        : flags.trainingConfirmed
        ? "done"
        : "active",
      statusLabel: !flags.contractSigned
        ? "Uzamčeno"
        : flags.trainingConfirmed
        ? "Dokončeno"
        : "K potvrzení",
    },
  ];
}
