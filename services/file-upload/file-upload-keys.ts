import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "file-upload";

const fileUploadKeys = {
  ...getQueryKeys(namespace),
};

export default fileUploadKeys;
