export interface UserProfile {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export interface UploadPhotoResponse {
  url: string;
  message: string;
}
