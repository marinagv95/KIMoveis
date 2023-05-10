import { Response, Request } from "express";
import {
  TRealEstateRequest,
  TRealEstateResponse,
} from "../interfaces/realEstate.interface";
import { RealEstate } from "../entities";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import listAllRealEstateService from "../services/realEstate/listAllRealEstates.service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);
  const realEstateData: TRealEstateRequest = req.body;

  const newrealEstate: RealEstate = await createRealEstateService(
    realEstateData,
    categoryId
  );

  return res.status(201).json(newrealEstate);
};

const listAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate: Array<TRealEstateResponse> =
    await listAllRealEstateService();
  return res.status(200).json(realEstate);
};

export { createRealEstateController, listAllRealEstateController };
