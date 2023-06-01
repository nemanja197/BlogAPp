import { Component } from '@angular/core';
import {faFileEdit} from '@fortawesome/free-solid-svg-icons'
import {faClipboardList} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  faFileEdit=faFileEdit;
  faClipboardList=faClipboardList;
  faUser=faUser;
}
