import type { FileUploadResponse } from "@/types/onboarding";
import axios from "axios";
import { baseUrl } from "@/lib/utils";

// /generic/file-upload

async function fileUpload(file: File): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("files", file);
  return await axios.post(`${baseUrl}/image-upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export { fileUpload };
