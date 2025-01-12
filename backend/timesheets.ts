import { callTabidoo } from "./tabidoo";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { Timesheet } from "types/timesheet";

export class TimesheetsGetter {
  public static async getTimesheetsForUser(userId?: string) {
    const session = await getServerSession(authOptions);

    if (!userId) userId = session?.user?.id;

    const timesheets = await callTabidoo<Array<Timesheet>>(
      `/tables/vykazhodin/data/filter`,
      {
        body: {
          filter: [
            {
              field: "osoba.id",
              operator: "eq",
              value: userId,
            },
          ],
        },
        method: "POST",
      }
    );

    return timesheets;
  }
}
