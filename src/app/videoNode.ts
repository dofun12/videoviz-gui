import {File} from "./file";

export interface VideoNode {
  code:          string;
  idVideo:       number;
  md5sum:        null;
  favorite:      number;
  title:         string;
  rating:        number;
  pageUrl:       string;
  tags:          string;
  totalWatched:  number;
  original_tags: null;
  idLocation:    number;
  dateAdded:     number;
  image_link:    string;
  video_link:    string;
  basePath:      string;
  fileexists:    boolean;
  file:          File;
}
