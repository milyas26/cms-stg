import { FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";
import { FileApiRepository } from "@/features/files/domain/repositories/FileApiRepository";
import { notifications } from "@mantine/notifications";

class CustomUploadAdapter {
  loader: FileLoader;
  postId: string;
  controller?: AbortController;

  constructor(loader: FileLoader, postId: string) {
    this.loader = loader;
    this.postId = postId;
  }

  upload(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.controller = new AbortController();
      try {
        const file: any = await this.loader.file;
        const response = await new FileApiRepository().uploadPostImage(
          file,
          this.postId,
          this.controller.signal,
          (progressEvent: ProgressEvent) => {
            if (progressEvent.lengthComputable) {
              this.loader.uploadTotal = progressEvent.total;
              this.loader.uploaded = progressEvent.loaded;
            }
          }
        );

        resolve({
          default: response.result,
        });
      } catch (error: any) {
        notifications.show({
          title: "Gagal mengunggah gambar",
          message: `${error.response?.data?.message || error.message}`,
          color: "red",
        });
        reject();
      }
    });
  }

  abort() {
    if (this.controller) {
      this.controller.abort();
    }
  }
}

export default CustomUploadAdapter;
