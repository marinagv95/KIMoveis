import { NextFunction, Request, Response } from "express";

const ensureCheckTimeSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { date, hour } = req.body;

  const dateArray = date.split("/");
  const year = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1;
  const day = parseInt(dateArray[2]);

  const hourArray = hour.split(":");
  const hourOfDay = parseInt(hourArray[0]);
  const minute = parseInt(hourArray[1]);

  const visitDate = new Date(year, month, day, hourOfDay, minute);

  const weekday = visitDate.getDay();
  if (weekday === 0 || weekday === 6) {
    return res
      .status(400)
      .json({ message: "Invalid date, work days are monday to friday" });
  }

  if (hourOfDay < 8 || hourOfDay >= 18 || (hourOfDay === 18 && minute !== 0)) {
    return res.status(400).json({
      message: "Invalid hour, available times are 8AM to 18PM",
    });
  }

  return next();
};

export default ensureCheckTimeSchedule;
