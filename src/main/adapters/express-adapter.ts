import { type IController, type IHttpRequest, type IHttpResponse } from '@/presentation/interfaces';
import { type Request, type Response } from 'express';

export const AdaptRoutes = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params,
    };
    const httpResponse: IHttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
