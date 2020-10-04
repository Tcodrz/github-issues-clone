import { Injectable } from '@angular/core';
import {
  faExclamationCircle,
  faMapSigns,
  faTag,
  faSearch,
  faCommentAlt,
  faCheck,
  faCircle,
  faTimes,
  faCog,
  faEllipsisH,
  faPen,
  faDotCircle,
  faBan,
  faBars,
  faLaptop
} from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  faExclamationCircle = faExclamationCircle;
  faMapSigns = faMapSigns;
  faTag = faTag;
  faSearch = faSearch;
  faCommentAlt = faCommentAlt;
  faCheck = faCheck;
  faCircle = faCircle;
  faTimes = faTimes;
  faCog = faCog;
  faEllipsisH = faEllipsisH;
  faPen = faPen;
  faDotCircle = faDotCircle;
  faBan = faBan;
  faBars = faBars;
  faLaptop = faLaptop;
}
