import {environment} from "../environments/environment";

export class Constants{
  static getRemoteUrl(){
    return environment.remoteUrl;
  }
  static getVideoUrl(context: string,code: string){
    //return environment.remoteVideoUrl+"/v1/mp4/"+code+".mp4";
    console.log(environment.remoteVideoUrl+"/media/video"+"/"+context+"/"+code);
    return environment.remoteVideoUrl+"/media/video"+"/"+context+"/"+code;
  }

  static getImageUrl(context: string,code: string){
    //return environment.remoteVideoUrl+"/v1/mp4/"+code+".mp4";
    return environment.remoteImageUrl+"/media/image/"+context+"/"+code;
  }
  static getApiUrl(){
    return environment.apiUrl;
  }
}
