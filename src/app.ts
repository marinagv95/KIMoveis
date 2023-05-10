import "reflect-metadata";
import "express-async-errors";
import express from "express";
import loginRoutes from "./routes/login.routers";
import userRoutes from "./routes/user.routers";
import schedulesRoutes from "./routes/schedules.routers";
import realEstateRoutes from "./routes/realEstate.routes";
import categoriesRoutes from "./routes/categories.routers";
import { handleErros } from "./error";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/categories", categoriesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErros);

export default app;
