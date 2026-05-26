import { callTabidoo } from "./tabidoo";

export interface ReservationRecord {
  id: string;
  fields: {
    jmeno?: string;
    prijmeni?: string;
    email?: string;
    ucast?: string;
    vyberteTermin?: { id: string };
  };
}

export interface CreateReservationInput {
  terminId: string;
  jmeno: string;
  prijmeni: string;
  email: string;
}

export class OnboardingReservationAPI {
  public static async findActiveByEmail(
    email: string
  ): Promise<ReservationRecord | null> {
    const data = await callTabidoo<ReservationRecord[]>(
      `/tables/rezervace/data/filter`,
      {
        method: "POST",
        body: {
          filter: [
            { field: "email", operator: "eq", value: email },
            { field: "ucast", operator: "neq", value: "Zrušeno" },
          ],
        },
      }
    );
    return data[0] ?? null;
  }

  public static async create(
    input: CreateReservationInput
  ): Promise<ReservationRecord> {
    return callTabidoo<ReservationRecord>(`/tables/rezervace/data`, {
      method: "POST",
      body: {
        fields: {
          jmeno: input.jmeno,
          prijmeni: input.prijmeni,
          email: input.email,
          vyberteTermin: { id: input.terminId },
        },
      },
    });
  }

  public static async cancel(reservationId: string): Promise<void> {
    await callTabidoo(`/tables/rezervace/data/${reservationId}`, {
      method: "PATCH",
      body: {
        fields: { ucast: "Zrušeno" },
      },
    });
  }
}
