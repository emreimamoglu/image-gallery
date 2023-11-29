import axios from "axios";
import { ImageQueryResponse } from "../types";

const BASE_URL = "https://pixabay.com/api";
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

class ImageService {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new ImageService();
    }

    return this.instance;
  }

  private static instance: ImageService;

  public async getImages(params: Record<string, unknown>) {
    return axios.get<ImageQueryResponse>(BASE_URL, {
      params: {
        ...params,
        key: API_KEY,
      },
    });
  }
}

export default ImageService;
