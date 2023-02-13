import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Event} from '../../model/event.model';

@Component({
  selector: 'app-detail-poi',
  templateUrl: './detail-poi.page.html',
  styleUrls: ['./detail-poi.page.scss'],
})
export class DetailPoiPage implements OnInit {
  event= [];
  user=[];
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.dataService.getEventByID(id).subscribe( res => {
      this.event = res;
      this.dataService.getUserByEmail(this.event['user']).subscribe(res2 => {
        this.user = res2.pop();
      });
    });
  }

}
