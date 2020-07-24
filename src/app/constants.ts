import {environment} from "../environments/environment";

export class Constants{
  static getRemoteUrl(){
    return environment.remoteUrl;
  }
  static getVideoUrl(code: string){
    //return environment.remoteVideoUrl+"/v1/mp4/"+code+".mp4";
    return environment.remoteVideoUrl+"/media/video/"+code;
  }

  static getImageUrl(code: string){
    //return environment.remoteVideoUrl+"/v1/mp4/"+code+".mp4";
    return environment.remoteImageUrl+"/media/image/"+code;
  }
  static getApiUrl(){
    return environment.apiUrl;
  }
}
