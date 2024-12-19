import axiosInstance from "./apiHelpers";

const getBlob = async (fileUri: string): Promise<Blob> => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const s3Upload = async (imgUri: string): Promise<string | null> => {
  try {
    const response = await axiosInstance.get("/common/s3-signed-url");
    const blobData = await getBlob(imgUri);

    await fetch(response.data.data.url, {
      method: "PUT",
      body: blobData,
      headers: {
        "Content-Type": blobData.type || "image/jpeg",
        "x-amz-acl": "public-read",
      },
    });

    return response.data.data.key;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    return null;
  }
};
